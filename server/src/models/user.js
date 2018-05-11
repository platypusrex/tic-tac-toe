export default (sequelize, DataTypes) => {
	const User = sequelize.define('User', {
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
		username: {
			type: DataTypes.STRING,
			unique: true
		},
		email: {
			type: DataTypes.STRING,
			unique: true
		},
		password: DataTypes.STRING
	}, {
		timestamps: true
	});

	User.associate = (models) => {
		User.belongsToMany(models.Game, {
			as: 'games',
			through: models.UserGame,
			foreignKey: {
				name: 'userId',
				field: 'user_id'
			}
		});
	};

	return User;
}