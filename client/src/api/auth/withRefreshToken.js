import { graphql } from 'react-apollo';
import RefreshTokenMutation from './refreshTokenMutation.graphql';

export const withRefreshToken = graphql(RefreshTokenMutation, {
	props: ({ownProps, mutate}) => ({
		refreshToken: async (variables) => {
			const options = {
				mutation: RefreshTokenMutation,
				variables
			};

			if (!mutate) {
				throw new Error('withRefreshToken: missing mutate!');
			}

			return mutate(options);
		}
	})
});