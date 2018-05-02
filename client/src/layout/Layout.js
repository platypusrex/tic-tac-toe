import React from 'react';
import PropTypes from 'prop-types';

export const Layout = (props) => {
	const { children } = props;

	return (
		<div className="layout" style={{height: '100%'}}>
			{children}
		</div>
	);
};

Layout.propTypes = {
	children: PropTypes.node
};