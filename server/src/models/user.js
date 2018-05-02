export default (sequelize, DataTypes) => {
	const User = sequelize.define('User', {
		username: {
			type: DataTypes.STRING,
			unique: true
		},
		email: {
			type: DataTypes.STRING,
			unique: true
		},
		password: DataTypes.STRING
	});

	return User;
}