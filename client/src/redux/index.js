import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { authStore } from "./authStore";

export function createReduxStore () {
	const reducers = combineReducers({
		authStore
	});

	const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose;

	return createStore(reducers, composeEnhancers(
		applyMiddleware(thunk)
	))
}