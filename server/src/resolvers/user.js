import { createToken, hashPassword, validatePassword } from "../utils/auth";

export const userResolver = {
	Query: {
		getAllUsers: async (parent, args, {models}) => {
			const users = await models.User.findAll({
				include: [{
					as: 'games',
					model: models.Game
				}]
			});

			return users;
		},
		getUserById: async (parent, {userId}, {models}) => {
			const user = await models.User.findOne({
				where: {id: userId},
				include: [{
					as: 'games',
					model: models.Game,
				}]
			});

			return user;
		}
	},

	Mutation: {
		register: async (parent, user, {models}) => {
			user.password = await hashPassword(user.password);
			const newUser = await models.User.create(user);
			return createToken(newUser);
		},
		login: async (parent, {email, password}, {models}) => {
			const user = await models.User.findOne({ where: {email} });

			if (!user) {
				throw new Error('user not found');
			}

			const valid = await validatePassword(password, user.password);

			if (!valid) {
				throw new Error('username or password is incorrect');
			}

			return createToken(user);
		},
		refreshToken: async (parent, {userId}, {models}) => {
			const user = await models.User.findOne({ where: {id: userId} });

			if (!user) {
				throw new Error('user not found');
			}

			return createToken(user);
		},
	}
};