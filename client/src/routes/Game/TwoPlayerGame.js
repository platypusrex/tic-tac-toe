import React from 'react';
import { compose, withHandlers, withProps, branch, renderComponent } from 'recompose';
import { withState } from '../../shared/containers/withState';
import { Game } from "./Game";
import { Loading } from "../../shared/components/Loading";
import { calculateWinner, handleAddNewGame, handleTwoPlayerSquareClick } from "./GameHandlers";
import { withUserId } from "../../shared/utils/localStorageUtil";
import { withUserById } from "../../api/user/withUserById";
import { twoPlayerGame } from "../../shared/constants/gameConstants";

const initialState = {
	history: [{squares: Array(9).fill(null)}],
	stepNumber: 0,
	xIsNext: true,
	firstPlayer: null,
	currentPlayer: null,
	canCurrentPlayerUndo: false,
	isBoardReady: false
};

const TwoPlayerGameComponent = (props) => {
	const { state, player1, player2 } = props;
	const history = state.history;
	const current = history[state.stepNumber];
	const currentSquares = current.squares;
	const winner = calculateWinner(currentSquares);
	const gameEnd = currentSquares.every(square => !!(square));

	if (gameEnd || winner) {
		props.handleSubmitGame(winner);
	}

	return (
		<Game
			player1={player1}
			player2={player2}
			currentPlayer={state.currentPlayer}
			winner={winner}
			squares={currentSquares}
			handleSelectFirstPlayer={i => props.handleSelectFirstPlayer(i)}
			handleClickSquare={i => props.handleClickSquare(i)}
			handleUndoMove={props.handleUndoMove}
		/>
	);
};

export const TwoPlayerGame = compose(
	withUserId,
	withUserById,
	withState(initialState),
	withProps(props => {
		const player1 =
			props.data &&
			props.data.getUserById &&
			props.data.getUserById.username;

		return {
			player1: player1,
			player2: twoPlayerGame.player2,
		}
	}),
	branch(props => props.data.loading,
		renderComponent(() => <Loading/>)
	),
	withHandlers({
		handleSelectFirstPlayer: (props) => (player) => {
			const { setState } = props;

			setState(ss => ({
				...ss,
				isBoardReady: true,
				firstPlayer: player,
				currentPlayer: player
			}))
		},
		handleClickSquare: (props) => (i) => {
			const { state } = props;

			if (!state.isBoardReady) {
				return;
			}

			handleTwoPlayerSquareClick(props, i);
		},
		handleUndoMove: (props) => () => {
			const { state, setState } = props;

			if (!state.canCurrentPlayerUndo) {
				return;
			}

			const stepNumber = state.stepNumber - 1;

			setState({
				...state,
				stepNumber,
				xIsNext: (stepNumber % 2) === 0,
				currentPlayer: state.currentPlayer === 1 ? 2 : 1,
				canCurrentPlayerUndo: false
			});
		},
		handleSubmitGame: (props) => (winner) => {
			handleAddNewGame(props, initialState, winner);
		}
	})
)(TwoPlayerGameComponent);
