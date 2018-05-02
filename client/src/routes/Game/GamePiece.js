import React from 'react';
import PropTypes from 'prop-types';
import circle from '../../assets/tic_tac_toe_circle.svg';
import cross from '../../assets/tic_tac_toe_x.svg';

export const GamePiece = (props) => {
	const { type } = props;
	const src = type === 'circle' ? circle : cross;

	return (
		<img src={src} alt="tic tac toe game piece"/>
	);
};

GamePiece.propTypes = {
	type: PropTypes.oneOf(['circle', 'cross']).isRequired
};