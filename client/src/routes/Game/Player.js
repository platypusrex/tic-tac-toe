import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/routes/Player.css';

export const Player = (props) => {
	const { current, name, wins } = props;

	return (
		<div className="player">
			<h2 className={`${current ? 'current' : ''}`}>{name}</h2>
			<h3>{wins}</h3>
		</div>
	);
};

Player.propTypes = {
	current: PropTypes.bool,
	name: PropTypes.string.isRequired,
	wins: PropTypes.number.isRequired
};


