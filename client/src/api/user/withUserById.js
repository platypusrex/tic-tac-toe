import { graphql } from 'react-apollo';
import UserByIdQuery from './userByIdQuery.graphql';

export const withUserById = graphql(UserByIdQuery, {
	options: ({userId}) => ({
		variables: {
			userId
		},
		skip: !userId,
	})
});