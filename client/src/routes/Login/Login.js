import React from 'react';
import { compose, withHandlers } from 'recompose';
import { Logo } from "../../shared/components/Logo";
import { Input } from "../../shared/components/Input";
import { Button } from "../../shared/components/Button";
import { withState } from "../../shared/containers/withState";
import { withLogin } from "../../api/auth/withLogin";
import { storeAuthToken } from "../../shared/utils/localStorageUtil";
import { setAuthStatus } from "../../redux/authStore";
import { connect } from "react-redux";
import '../../styles/routes/Auth.css';

const initialState = {
	email: '',
	password: '',
	isSubmitting: false
};

const LoginComponent = (props) => {
	const { state, setState } = props;
	const { email, password } = state;

	return (
		<div className="auth">
			<div className="auth__content-wrapper">
				<Logo/>

				<form>
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

					<Button type="grey" onClick={props.handleLogin}>
						Login
					</Button>
				</form>

				<a onClick={() => props.history.push('/register')} className="auth__help-text">
					Register
				</a>
			</div>
		</div>
	);
};

const mapDispatchToProps = {
	setAuthStatus
};

export const Login = compose(
	connect(null, mapDispatchToProps),
	withLogin,
	withState(initialState),
	withHandlers({
		handleLogin: (props) => async (e) => {
			e.preventDefault();
			const { state, setState } = props;
			const { email, password } = state;

			if (state.isSubmitting) {
				return;
			}

			try {
				setState(ss => ({...ss, isSubmitting: true}));
				const response = await props.loginUser({email, password});
				const token = response.data.login;

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
)(LoginComponent);