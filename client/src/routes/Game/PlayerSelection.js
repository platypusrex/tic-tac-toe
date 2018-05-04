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
	player1: PropTypes.string.isRequired,
	player2: PropTypes.string.isRequired,
	handleSelectFirstPlayer: PropTypes.func.isRequired
};

function getFirstPlayerSelectionModel (props) {
	const { player1, player2 } = props;

	return swal({
		title: `Who's gonna go first?`,
		buttons: {
			player1: {
				text: player1,
				value: 1,
			},
			player2: {
				text: player2,
				value: 2
			},
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
