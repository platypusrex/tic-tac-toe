import gql from "graphql-tag";
import { graphql } from 'react-apollo';
import { allGamesQuery } from "./withAllGames";

const addGameMutation = gql`
  mutation ($players: [String!]!, $winner: String!) {
    addGame (players: $players, winner: $winner) {
			players
			winner
		}
  }
`;

export const withAddGame = graphql(addGameMutation, {
	props: ({ownProps, mutate}) => ({
		addGame: async (variables) => {
			const options = {
				mutation: addGameMutation,
				variables,
				refetchQueries: [
					{query: allGamesQuery}
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