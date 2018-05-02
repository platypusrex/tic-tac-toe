import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const loginMutation = gql`
	mutation ($email: String!, $password: String!) {
		login (email: $email, password: $password) 
	}
`;

export const withLogin = graphql(loginMutation, {
	props: ({ownProps, mutate}) => ({
		loginUser: async (variables) => {
			const options = {
				mutation: loginMutation,
				variables,
			};

			if (!mutate) {
				throw new Error('withLogin: missing mutate!');
			}

			return mutate(options);
		}
	})
});