import React from 'react';
import { compose, withHandlers } from 'recompose';
import { Logo } from "../../shared/components/Logo";
import { Input } from "../../shared/components/Input";
import { Button } from "../../shared/components/Button";
import { withState } from "../../shared/containers/withState";
import { withRegister } from "../../api/withRegister";
import { storeAuthToken } from "../../shared/utils/localStorageUtil";
import { connect } from "react-redux";
import { setAuthStatus } from "../../redux/authStore";
import '../../styles/routes/Auth.css';

const initialState = {
	username: '',
	email: '',
	password: '',
	isSubmitting: false
};

const RegisterComponent = (props) => {
	const { state, setState } = props;
	const { username, email, password } = state;

	return (
		<div className="auth">
			<div className="auth__content-wrapper">
				<Logo/>

				<form>
					<Input
						placeholder="Username"
						required={true}
						value={username}
						onChange={username => setState(ss => ({...ss, username}))}
					/>

					<Input
						placeholder="Email"
						type="email"
						required={true}
						value={email}
						onChange={email => setState(ss => ({...ss, email}))}
					/>

					<Input
						placeholder="Password"
						type="password"
						required={true}
						value={password}
						onChange={password => setState(ss => ({...ss, password}))}
					/>

					<Button type="grey" onClick={props.handleRegister}>
						Register
					</Button>
				</form>

				<a onClick={() => props.history.push('/login')} className="auth__help-text">
					Login
				</a>
			</div>
		</div>
	);
};

const mapDispatchToProps = {
	setAuthStatus
};

export const Register = compose(
	connect(null, mapDispatchToProps),
	withRegister,
	withState(initialState),
	withHandlers({
		handleRegister: (props) => async (e) => {
			e.preventDefault();
			const { state, setState } = props;
			const { username, email, password } = state;

			if (state.isSubmitting) {
				return;
			}

			try {
				setState(ss => ({...ss, isSubmitting: true}));
				const response = await props.registerUser({username, email, password});
				const token = response.data.register;

				storeAuthToken(token);
				props.setAuthStatus(true);
				props.history.push('/games')
			} catch (err) {
				setState(ss => ({...ss, isSubmitting: false}));
				props.setAuthStatus(false);
				console.log(err);
			}
		}
	})
)(RegisterComponent);