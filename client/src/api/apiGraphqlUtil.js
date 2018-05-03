import ApolloClient from "apollo-boost/lib/index";

export const apolloClient = new ApolloClient({
	ssrMode: false,
	uri: 'http://localhost:4000/graphql',
});