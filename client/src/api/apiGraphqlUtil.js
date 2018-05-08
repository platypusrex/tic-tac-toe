// import ApolloClient from "apollo-boost/lib/index";
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { onError } from 'apollo-link-error';
import { ApolloLink, split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';

const httpLink = new HttpLink({
	uri: 'http://localhost:4000/graphql',
});

const wsLink = new WebSocketLink({
	uri: 'ws://localhost:4000/',
	options: {
		reconnect: true
	}
});

export const apolloClient = new ApolloClient({
	link: ApolloLink.from([
		onError(({graphQLErrors, networkError}) => {
			if (graphQLErrors) {
				graphQLErrors.map(({message, locations, path}) =>
					console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`));
			}

			if (networkError) {
				console.log(`[Network error]: ${networkError}`);
			}
		}),
		split(
			({query}) => {
				const { kind, operation } = getMainDefinition(query);
				return kind === 'OperationDefinition' && operation === 'subscription';
			},
			wsLink,
			httpLink,
		)
		// new HttpLink({
		// 	uri: 'http://localhost:4000/graphql',
		// 	credentials: 'same-origin'
		// })
	]),
	cache: new InMemoryCache()
});


// export const apolloClient = new ApolloClient({
// 	ssrMode: false,
// 	uri: 'http://localhost:4000/graphql',
// });