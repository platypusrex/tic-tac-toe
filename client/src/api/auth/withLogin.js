import { graphql } from 'react-apollo';
import LoginMutation from './loginMutation.graphql';

export const withLogin = graphql(LoginMutation, {
	props: ({ownProps, mutate}) => ({
		loginUser: async (variables) => {
			const options = {
				mutation: LoginMutation,
				variables,
			};

			if (!mutate) {
				throw new Error('withLogin: missing mutate!');
			}

			return mutate(options);
		}
	})
});