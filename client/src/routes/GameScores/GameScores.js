import React from 'react';
import { compose, withProps } from 'recompose';
import { withAllGames } from "../../api/withAllGames";
import { BackButton } from "../../shared/components/BackButton";
import '../../styles/routes/GameScores.css';

const GameScoresComponent = (props) => {
	const { games } = props;
	const options = {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric'
	};

	if (!games) {
		return null;
	}

	return (
		<div className="game-scores">
			<BackButton title="Games History"/>

			{!games.length &&
			<div className="game-scores__empty">
				<h3>No game data to show ya!</h3>
			</div>}

			<div className="game-scores__list">
			{games.map(game => (
				<div key={game.id} className="game-scores__list-item">
					<div className="game-scores__game-number">
						<h2>Game # {game.id}</h2>
					</div>
					<div className="game-scores__item-players">
						<h4>Players:</h4>
						{game.players.map((player, i) => (
							<span className="game-scores__list-item__detail" key={i}>
								{player}
							</span>
						))}
					</div>

					<div style={{marginBottom: '10px'}}>
						<h4>Winner:</h4>
						<span className="game-scores__list-item__detail">
							{game.winner}
						</span>
					</div>

					<div>
						<h4>Added on:</h4>
						<span className="game-scores__list-item__detail">
							{new Date(game.createdAt).toLocaleDateString(undefined, options)}
						</span>
					</div>
				</div>
			))}
			</div>
		</div>
	);
};

export const GameScores = compose(
	withAllGames,
	withProps(props => {
		let games =
			props.data &&
			props.data.allGames &&
			[...props.data.allGames] || [];

		games = games.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

		return {games}
	})
)(GameScoresComponent);