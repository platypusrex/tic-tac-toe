import React from 'react';
import PropTypes from 'prop-types';
import { Button } from "../../shared/components/Button";
import swal from "sweetalert";
import '../../styles/routes/PlayerSelection.css';

export const PlayerSelection = (props) => {
	return (
		<div className="game__player-selection">
			<Button
				className="game__player-selection__btn"
				onClick={() => getFirstPlayerSelectionModel(props)}
			>
				Start game!
			</Button>
		</div>
	);
};

PlayerSelection.propTypes = {
	gameType: PropTypes.string.isRequired
};

function getFirstPlayerSelectionModel (props) {
	const { gameType } = props;
	const secondPlayerButton = {
		text: gameType === 'one-player' ? 'Computer' : 'Player 2',
		value: 2
	};

	return swal({
		title: `Who's gonna go first?`,
		buttons: {
			player1: {
				text: 'Player 1',
				value: 1,
			},
			player2: secondPlayerButton
		},
	}).then(player => {
		switch (player) {
			case 1:
				props.handleSelectFirstPlayer(1);
				return;
			case 2:
				props.handleSelectFirstPlayer(2);
				return;
			default:
				return;
		}
	})
}
