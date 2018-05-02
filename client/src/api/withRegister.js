import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const registerMutation = gql`
	mutation ($username: String!, $email: String!, $password: String!) {
		register (username: $username, email: $email, password: $password)
	}	
`;

export const withRegister = graphql(registerMutation, {
	props: ({ownProps, mutate}) => ({
		registerUser: async (variables) => {
			const options = {
				mutation: registerMutation,
				variables,
			};

			if (!mutate) {
				throw new Error('withRegister: missing mutate!');
			}

			return mutate(options);
		}
	})
});