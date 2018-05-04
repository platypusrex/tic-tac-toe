import { graphql } from 'react-apollo';
import RegisterMutation from 'registerMutation.graphql';

export const withRegister = graphql(RegisterMutation, {
	props: ({ownProps, mutate}) => ({
		registerUser: async (variables) => {
			const options = {
				mutation: RegisterMutation,
				variables,
			};

			if (!mutate) {
				throw new Error('withRegister: missing mutate!');
			}

			return mutate(options);
		}
	})
});