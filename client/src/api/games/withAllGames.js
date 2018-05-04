import { graphql } from 'react-apollo';
import AllGamesQuery from './allGamesQuery.graphql';

export const withAllGames = graphql(AllGamesQuery, {
	options: () =>  ({fetchPolicy: 'cache-and-network'})
});