import React from 'react';
import { branch, compose, renderComponent, withHandlers, withProps } from 'recompose';
import { withState } from '../../shared/containers/withState';
import { calculateWinner, handleAddNewGame, handleOnePlayerSquareClick } from "./GameHandlers";
import { Game } from "./Game";
import { Loading } from "../../shared/components/Loading";
import { withUserById } from "../../api/user/withUserById";
import { withUserId } from "../../shared/utils/localStorageUtil";
import { onePlayerGame } from "../../shared/constants/gameConstants";

const initialState = {
	history: [{squares: Array(9).fill(null)}],
	stepNumber: 0,
	firstPlayer: null,
	currentPlayer: null,
	canCurrentPlayerUndo: false,
	isBoardReady: false
};

const OnePlayerGameComponent = (props) => {
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

export const OnePlayerGame = compose(
	withState(initialState),
	withUserId,
	withUserById,
	withProps(props => {

		const player1 =
			props.data &&
			props.data.getUserById &&
			props.data.getUserById.username;

		return {
			player1: player1,
			player2: onePlayerGame.player2,
		}
	}),
	branch(props => props.data.loading,
		renderComponent(() => <Loading/>)
	),
	withHandlers({
		handleSelectFirstPlayer: (props) => (player) => {
			const { setState } = props;

			if (player === 2) {
				handleOnePlayerSquareClick(props);
			}

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

			handleOnePlayerSquareClick(props, i);
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
				canCurrentPlayerUndo: false
			});
		},
		handleSubmitGame: (props) => (winner) => {
			handleAddNewGame(props, initialState, winner);
		}
	})
)(OnePlayerGameComponent);
