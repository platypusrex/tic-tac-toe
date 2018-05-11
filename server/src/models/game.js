export default (sequelize, DataTypes) => {
	// const Game = sequelize.define('Game', {
	// 	players: DataTypes.ARRAY(DataTypes.INTEGER),
	// 	winner: DataTypes.STRING,
	// 	history: DataTypes.ARRAY(DataTypes.JSON)
	// });
	//
	// Game.associate = (models) => {
	// 	Game.hasMany(models.User, {
	// 		as: 'Players'
	// 	});
	// };
	//
	// return Game;


	const Game = sequelize.define('Game', {
		createdAt: {
			type: DataTypes.DATE,
			field: 'created_at',
			name: 'createdAt'
		},
		updatedAt: {
			type: DataTypes.DATE,
			field: 'updated_at',
			name: 'updatedAt'
		},
		status: DataTypes.ENUM(['pending', 'started', 'complete', 'cancelled']),
		type: DataTypes.ENUM(['one_player', 'two_player']),
		history: DataTypes.ARRAY(DataTypes.JSON)
	}, {
		timestamps: true,
	});

	Game.associate = (models) => {
		Game.belongsToMany(models.User, {
			as: 'players',
			through: models.UserGame,
			foreignKey: {
				name: 'gameId',
				field: 'game_id'
			}
		});

		Game.belongsTo(models.User, {
			as: 'winner',
			foreignKey: {
				name: 'winnerId',
				field: 'winner_id'
			}
		})
	};

	return Game;
}