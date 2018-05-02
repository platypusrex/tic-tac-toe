import React from 'react';
import { compose } from 'recompose';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { Layout } from './layout/Layout';
import { CheckToken } from "./routes/CheckToken/CheckToken";
import { Login } from './routes/Login/Login';
import { Register } from './routes/Register/Register';
import { GameSelection } from './routes/GameSelection/GameSelection';
import { OnePlayerGame } from "./routes/Game/OnePlayerGame";
import { TwoPlayerGame } from "./routes/Game/TwoPlayerGame";
import { GameScores } from "./routes/GameScores/GameScores";

export const AppComponent = (props) => {
	const { isAuthenticated } = props;

	const AppRoutes = () => (
			<Switch>
				<Route path="/games" component={GameSelection}/>
				<Route path="/one-player-game" component={OnePlayerGame}/>
				<Route path="/two-player-game" component={TwoPlayerGame}/>
				<Route path="/game-scores" component={GameScores}/>
			</Switch>
	);

	return (
		<Layout>
			<Switch>
				<Route exact={true} path="/" component={CheckToken}/>
				<Route path="/login" component={Login}/>
				<Route path="/register" component={Register}/>
				{isAuthenticated ?
					<Route component={() => AppRoutes()}/> :
					<Redirect to="/login"/>
				}
			</Switch>
		</Layout>
	);
};

const mapStateToProps = ({authStore}) => ({
	isAuthenticated: authStore.isAuthenticated
});

export const App = compose(
	withRouter,
	connect(mapStateToProps)
)(AppComponent);
