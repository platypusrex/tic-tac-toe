
import {getAuthToken} from "../shared/utils/localStorageUtil";

const SET_AUTH_STATUS = 'auth/status';

export function setAuthStatus (isAuthenticated) {
	return {type: SET_AUTH_STATUS, payload: isAuthenticated};
}

const initialState = {
	isAuthenticated: !!getAuthToken()
};

export function authStore (state = initialState, action) {
	switch (action.type) {
		case SET_AUTH_STATUS:
			return {...state, isAuthenticated: action.payload};
		default:
			return state;
	}
}