import React from 'react';
import '../../styles/components/Loading.css';

export const Loading = () => (
	<div className="loading">
		<div className="sk-folding-cube">
			<div className="sk-cube1 sk-cube"/>
			<div className="sk-cube2 sk-cube"/>
			<div className="sk-cube4 sk-cube"/>
			<div className="sk-cube3 sk-cube"/>
		</div>
	</div>
);