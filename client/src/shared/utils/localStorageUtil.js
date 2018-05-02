import { tokenKey, userIdKey, userNameKey } from "../constants/localStorage";
import jwt_decode from 'jwt-decode';
import { withProps } from "recompose";

export function storeAuthToken (token) {
	if (!token) {
		throw new Error('storeAuthToken: no token provided');
	}

	const tokenBody = jwt_decode(token);
	const { user } = tokenBody;

	storeUserId(user.id);
	storeUserName(user.username);
	localStorage.removeItem(tokenKey);
	localStorage.setItem(tokenKey, token);
}

export function storeUserId (userId) {
	localStorage.removeItem(userIdKey);
	localStorage.setItem(userIdKey, userId);
}

export function storeUserName (username) {
	localStorage.removeItem(userNameKey);
	localStorage.setItem(userNameKey, username);
}

export function getAuthToken () {
	const token = localStorage.getItem(tokenKey);

	if (token === 'undefined') {
		return null;
	}

	return token;
}

export function getUserId () {
	const userId = localStorage.getItem(userIdKey);

	if (!userId) {
		return null;
	}

	return userId;
}

export function getUserName () {
	const username = localStorage.getItem(userNameKey);

	if (!username) {
		return null;
	}

	return username;
}

export function getUserFromToken () {
	const token = getAuthToken();

	if (!token) {
		return null;
	}

	const tokenBody = jwt_decode(token);
	return tokenBody.user;
}

export const withUserTokenProps = withProps({user: getUserFromToken()});