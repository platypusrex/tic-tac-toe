import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from "apollo-boost";
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { Provider } from 'react-redux';
import { createReduxStore } from "./redux";
import { AuthProvider } from "./shared/containers/authState";
import { apolloClient } from "./api/apiGraphqlUtil";
import './index.css';
import { App } from './App';

const store = createReduxStore();

ReactDOM.render(
	<ApolloProvider client={apolloClient}>
		<AuthProvider>
			<Provider store={store}>
				<Router>
					<App />
				</Router>
			</Provider>
		</AuthProvider>
	</ApolloProvider>,
	document.getElementById('root')
);
