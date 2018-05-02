import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

export const allGamesQuery = gql`
  query {
    allGames {
      id
      createdAt
      updatedAt
      players
			winner
    }
  }
`;

export const withAllGames =
	graphql(allGamesQuery, {
		options: () =>  ({fetchPolicy: 'cache-and-network'})
	});