import React from 'react';
import PropTypes from 'prop-types';
import { compose, withProps } from 'recompose';
import { Player } from "./Player";
import { withAllGames } from "../../api/games/withAllGames";
import '../../styles/routes/ScoreBoard.css';

export const ScoreBoardComponent = (props) => {
	const { currentPlayer, winner, player1, player2, player1Wins, player2Wins } = props;

	return (
		<div className="score-board">
			<Player
				name={player1}
				current={currentPlayer === 1 && !winner}
				wins={player1Wins}
			/>

			<Player
				name={player2}
				current={currentPlayer === 2 && !winner}
				wins={player2Wins}
			/>
		</div>
	);
};

ScoreBoardComponent.propTypes = {
	currentPlayer: PropTypes.number,
	winner: PropTypes.string
};

function getNumPlayerWins (props, player) {
	return props.data &&
		props.data.allGames &&
		props.data.allGames &&
		props.data.allGames.filter(game => game.winner === player) || [];
}

export const ScoreBoard = compose(
	withAllGames,
	withProps(props => {
		const player1Wins = getNumPlayerWins(props, props.player1);
		let player2Wins = getNumPlayerWins(props, props.player2);

		return {
			player1Wins: player1Wins.length,
			player2Wins: player2Wins.length,
		}
	}),
)(ScoreBoardComponent);