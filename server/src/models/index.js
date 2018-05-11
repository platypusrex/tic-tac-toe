import Sequelize from 'sequelize';
import { admin, database, password } from '../utils/config';

const sequelize = new Sequelize(database, admin, password, {
	host: 'localhost',
	dialect: 'postgres',
	define: {
		underscored: true
	}
});

const db = {
	User: sequelize.import('./user'),
	Game: sequelize.import('./game'),
	UserGame: sequelize.import('./userGame'),
	Comment: sequelize.import('./comment')
};

Object.keys(db).forEach(modelName => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

db.sequelize = sequelize;

export default db;