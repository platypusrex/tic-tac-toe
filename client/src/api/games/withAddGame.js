import { graphql } from 'react-apollo';
import { apolloClient } from "../apiGraphqlUtil";
import AddGameMutation from './addGameMutation.graphql';
import AllGamesQuery from './allGamesQuery.graphql';

export async function addGame (variables) {
	const options = {
		variables,
		mutation: AddGameMutation,
		refetchQueries: [
			{query: AllGamesQuery}
		]
	};

	return apolloClient.mutate(options);
}

export const withAddGame = graphql(AddGameMutation, {
	props: ({ownProps, mutate}) => ({
		addGame: async (variables) => {
			const options = {
				mutation: AddGameMutation,
				variables,
				refetchQueries: [
					{query: AllGamesQuery}
				],
			};

			if (!mutate) {
				throw new Error('withAddGame: missing mutate')
			}

			return mutate(options)
				.then(response => {
					const game =
						response &&
						response.data &&
						response.data.addGame;

					if (!game) {
						throw new Error('withAddGame: game not returned');
					}

					return game;
				});
		}
	})
});