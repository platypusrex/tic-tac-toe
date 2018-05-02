import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";
import { PlayerSelection } from "./PlayerSelection";
import { ScoreBoard } from "./ScoreBoard";
import { Board } from "./Board";
import { Button } from "../../shared/components/Button";
import '../../styles/routes/Game.css';
import {BackButton} from "../../shared/components/BackButton";

export const GameComponent = (props) => {
	const { gameType, currentPlayer, winner, squares } = props;

	return (
		<div className="game">
			<BackButton title="Change Game"/>
			<ScoreBoard
				gameType={gameType}
				currentPlayer={currentPlayer}
				winner={winner}
			/>

			<div className="game__board">
				<Board
					squares={squares}
					onClick={i => props.handleClickSquare(i)}
				>
					{!currentPlayer &&
					<PlayerSelection
						gameType={gameType}
						currentPlayer={currentPlayer}
						handleSelectFirstPlayer={i => props.handleSelectFirstPlayer(i)}
					/>}
				</Board>
			</div>

			<div className="game__controls">
				<Button type="grey" onClick={() => props.history.push('/game-scores')}>
					View Scores
				</Button>

				<Button type="grey" onClick={props.handleUndoMove}>
					Undo Move
				</Button>
			</div>
		</div>
	)
};

GameComponent.propTypes = {
	gameType: PropTypes.string,
	currentPlayer: PropTypes.number,
	winner: PropTypes.string,
	squares: PropTypes.array
};

export const Game = withRouter(GameComponent);