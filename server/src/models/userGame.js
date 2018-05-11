export default (sequelize, DataTypes) => {
	const UserGame = sequelize.define('UserGames', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		}
	});

	return UserGame;
};