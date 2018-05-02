import React from 'react';
import PropTypes from 'prop-types';
import { GamePiece } from "./GamePiece";
import '../../styles/routes/Square.css';

export const Square = (props) => {
	const gamePiece = getGamePiece(props.value);

	return (
		<div className="square" onClick={props.onClick}>
			{gamePiece}
		</div>
	);
};

Square.propTypes = {
	value: PropTypes.string,
	onClick: PropTypes.func.isRequired
};

function getGamePiece (value) {
	if (!value) return null;
	return value === 'X' ? <GamePiece type="cross"/> : <GamePiece type="circle"/>;
}