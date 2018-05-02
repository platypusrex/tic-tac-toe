import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";
import '../../styles/components/BackButton.css';

const BackButtonComponent = (props) => {
	const { title, history} = props;

	return (
		<div className="back-button">
			<div className="back-button__inner" onClick={() => history.goBack()}>
				<span>&#x276e;</span>
			</div>

			{title && <h1 className="back-button__title">{title}</h1>}
		</div>
	);
};

BackButtonComponent.propTypes = {
	title: PropTypes.string
};

export const BackButton = withRouter(BackButtonComponent);