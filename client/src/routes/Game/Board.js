import React from 'react';
import PropTypes from 'prop-types';
import { Square } from './Square';
import { Logo } from "../../shared/components/Logo";
import '../../styles/routes/Board.css';

export const Board = (props) => {
	const { squares, onClick, children } = props;

	const renderSquare = (i) => (
		<Square
			value={squares[i]}
			onClick={() => onClick(i)}
		/>
	);

	return (
		<div className="board">
			{children}
			<Logo/>

			<div className="board__row">
				{renderSquare(0)}
				{renderSquare(1)}
				{renderSquare(2)}
			</div>
			<div className="board__row">
				{renderSquare(3)}
				{renderSquare(4)}
				{renderSquare(5)}
			</div>
			<div className="board__row">
				{renderSquare(6)}
				{renderSquare(7)}
				{renderSquare(8)}
			</div>
		</div>
	)
};

Board.propTypes = {
	squares: PropTypes.array.isRequired,
	onClick: PropTypes.func.isRequired,
	children: PropTypes.node
};