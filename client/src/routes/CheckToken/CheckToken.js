import React from 'react';
import { compose, lifecycle } from 'recompose';
import { Loading } from "../../shared/components/Loading";
import { storeAuthToken, withUserTokenProps } from "../../shared/utils/localStorageUtil";
import { withRefreshToken } from "../../api/withRefreshToken";
import { connect } from "react-redux";
import { setAuthStatus } from "../../redux/authStore";

const CheckTokenComponent = (props) => {
	return <Loading/>;
};

const mapDispatchToProps = {
	setAuthStatus
};

export const CheckToken = compose(
	connect(null, mapDispatchToProps),
	withUserTokenProps,
	withRefreshToken,
	lifecycle({
		componentWillMount: async function () {
			const userId =
				this.props.user &&
				this.props.user.id;

			if (!userId) {
				this.props.setAuthStatus(false);
				this.props.history.push('/login');
			}

			try {
				const response = await this.props.refreshToken({userId});
				const token = response.data.refreshToken;

				storeAuthToken(token);
				this.props.setAuthStatus(true);
				this.props.history.push('/games');
			} catch (err) {
				console.log(`check token component: ${err}`);
				this.props.setAuthStatus(false);
				this.props.history.push('/login');
			}
		}
	}),
)(CheckTokenComponent);