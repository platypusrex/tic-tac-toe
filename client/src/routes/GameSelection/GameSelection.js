import React from 'react';
import { compose, withProps } from 'recompose';
import { Button } from "../../shared/components/Button";
import { Logo } from "../../shared/components/Logo";
import { getUserName } from "../../shared/utils/localStorageUtil";
import '../../styles/routes/GameSelection.css';

export const GameSelectionComponent = (props) => {
	return (
		<div className="game-selection">
			<div className="game-selection__content-wrapper">
				<Logo/>
				<h2 className="game-selection__username">Hey {props.username}!</h2>
				<span className="game-selection__help-text">
				Ready to play some Tic-Tac-Toe?<br/>
				Please select a game type below...
			</span>

				<div className="game-selection__btn-wrapper">
					<Button type="grey" className="game-selection__btn" onClick={() => props.history.push('/one-player-game')}>
						One Player
					</Button>
					<Button type="grey" className="game-selection__btn" onClick={() => props.history.push('/two-player-game')}>
						Two Player
					</Button>
				</div>
			</div>
		</div>
	);
};

export const GameSelection = compose(
	withProps((props) => ({
		username: getUserName()
	})),
)(GameSelectionComponent);
