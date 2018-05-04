import { graphql } from 'react-apollo';
import UserByIdQuery from './userByIdQuery.graphql';

export const withUserById = graphql(UserByIdQuery, {
	options: () => ({fetchPolicy: 'cache-and-network'})
});