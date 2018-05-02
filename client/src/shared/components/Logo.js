import React from 'react';
import '../../styles/components/Logo.css';
import logo from '../../assets/tic_tac_toe_logo.svg';

export const Logo = () => (
	<div className="logo">
		<img className="logo__img" src={logo} alt="tic tac toe logo"/>
	</div>
);