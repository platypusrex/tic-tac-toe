import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/components/Button.css';

export const Button = (props) => {
	const { className, onClick, children, prefixCls, type } = props;
	const buttonClass = `${prefixCls} ${className || ''} ${type ? type : 'green'}`;

	return (
		<button className={buttonClass} onClick={onClick}>
			{children}
		</button>
	);
};

Button.defaultProps = {
	prefixCls: 'button'
};

Button.propTypes = {
	className: PropTypes.string,
	onClick: PropTypes.func,
	children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
	type: PropTypes.oneOf(['green', 'grey'])
};