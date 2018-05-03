import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const userByIdQuery = gql`
	query ($userId: Int!) {
  	userById (userId: $userId) {
			username
			email
			id
		}
	}
`;

export const withUserById = graphql(userByIdQuery, {
	options: () => ({fetchPolicy: 'cache-and-network'})
});