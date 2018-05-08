export default (sequelize, DataTypes) => {
	const comment = sequelize.define('Comment', {
		comment: DataTypes.STRING,
		userId: DataTypes.INTEGER
	});

	return comment;
}