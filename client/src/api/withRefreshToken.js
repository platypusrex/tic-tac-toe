import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const refreshTokenMutation = gql`
	mutation ($userId: Int) {
		refreshToken (userId: $userId)
	}
`;

export const withRefreshToken = graphql(refreshTokenMutation, {
	props: ({ownProps, mutate}) => ({
		refreshToken: async (variables) => {
			const options = {
				mutation: refreshTokenMutation,
				variables
			};

			if (!mutate) {
				throw new Error('withRefreshToken: missing mutate!');
			}

			return mutate(options);
		}
	})
});