export default (sequelize, DataTypes) => {
	const Game = sequelize.define('Game', {
		players: DataTypes.ARRAY(DataTypes.STRING),
		winner: DataTypes.STRING,
		history: DataTypes.ARRAY(DataTypes.JSON)
	});

	return Game;
}