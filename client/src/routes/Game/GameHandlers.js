import swal from "sweetalert";

const getAvailableSpots = (board) => {
	let result = [];

	for (let i = 0; i < board.length; i++) {
		if (!board[i]) {
			result.push(i);
		}
	}
	return result;
};

const minimize = (board) => {
	const moves = getAvailableSpots(board);

	if (calculateWinner(board)) {
		return 1;
	}

	if (!moves.length) {
		return 0;
	}

	let bestMove;
	let bestValue = Infinity;

	for (let i = 0; i < moves.length; i++) {
		board[moves[i]] = 'X';
		let hValue = maximize(board);

		if (Array.isArray(hValue)) {
			hValue = hValue[0];
		}

		if (hValue < bestValue) {
			bestMove = moves[i];
			bestValue = hValue;
		}

		board[moves[i]] = null;
	}

	return [bestValue, bestMove];
};

export const maximize = (board) => {
	const moves = getAvailableSpots(board);

	if (calculateWinner(board)) {
		return -1;
	}

	if (!moves.length) {
		return 0;
	}

	let bestMove;
	let bestValue = -Infinity;

	for (let i = 0; i < moves.length; i++) {
		board[moves[i]] = 'O';
		let hValue = minimize(board);

		if (Array.isArray(hValue)) {
			hValue = hValue[0];
		}

		if (hValue > bestValue) {
			bestMove = moves[i];
			bestValue = hValue;
		}

		board[moves[i]] = null;
	}

	return [bestValue, bestMove];
};

export const calculateWinner = (squares) => {
	const winningRows = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6]
	];
	for (let i = 0; i < winningRows.length; i++) {
		const [a, b, c] = winningRows[i];

		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			return squares[a];
		}
	}
	return null;
};

export const getHistoryAndSquaresForBoard = (state) => {
	const history = state.history.slice(0, state.stepNumber + 1);
	const current = history[history.length - 1];
	const squares = current.squares.slice();

	return {history, squares};
};

export const handleOnePlayerSquareClick = (props, i) => {
	const { state, setState } = props;
	const board = getHistoryAndSquaresForBoard(state);
	const history = board.history;
	const squares = board.squares;

	if (calculateWinner(squares) || squares[i]) {
		return;
	}

	squares[i] = 'X';
	const best = maximize(squares);
	squares[best[1]] = 'O';

	setState({
		...state,
		history: history.concat([{squares}]),
		stepNumber: history.length,
		currentPlayer: 1,
		canCurrentPlayerUndo: true
	});
};

export const handleTwoPlayerSquareClick = (props, i) => {
	const { state, setState } = props;
	const board = getHistoryAndSquaresForBoard(state);
	const history = board.history;
	const squares = board.squares;

	if (calculateWinner(squares) || squares[i]) {
		return;
	}

	squares[i] = state.xIsNext ? 'X' : 'O';

	setState({
		...state,
		history: history.concat([{squares}]),
		stepNumber: history.length,
		xIsNext: !state.xIsNext,
		currentPlayer: state.currentPlayer === 1 ? 2 : 1,
		canCurrentPlayerUndo: true
	});
};

export const handleAddNewGame = (props, initialState, winner) => {
	const { state, setState, player1, player2, addGame } = props;
	let playerWinner;
	let title;

	if (winner) {
		playerWinner = (winner === 'X' && state.firstPlayer === 1) ? player1 : player2;
		title = `${playerWinner} wins!`
	} else {
		playerWinner = 'Tie';
		title = `It's a tie.`;
	}

	swal({
		title,
		closeOnClickOutside: false,
		closeOnEsc: false,
		buttons: {
			confirm: {
				text: 'Save Game',
				value: 'save',
			}
		},
	}).then(async () => {
		const game = {players: [player1, player2], winner: playerWinner};
		await addGame(game);

		setState(initialState);
	});
};