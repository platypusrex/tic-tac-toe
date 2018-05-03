import React from 'react';
import { compose, withHandlers, withProps } from 'recompose';
import { withState } from '../../shared/containers/withState';
import { Game } from "./Game";
import { calculateWinner, handleAddNewGame, handleTwoPlayerSquareClick } from "./GameHandlers";

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
	const { state, gameType } = props;
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
			gameType={gameType}
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
	withState(initialState),
	withProps(() => ({
		player1: 'Player 1',
		player2: 'Player 2',
		gameType: 'two-player'
	})),
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
