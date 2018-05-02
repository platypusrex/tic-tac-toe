export const Query = {
	Query: {
		getAllUsers: (parent, args, {models}) => models.User.findAll(),
		getUserById: (parent, {userId}, {models}) => models.User.findOne({ where: {id: userId} }),
		allGames: async (parent, args, {models}) => models.Game.findAll()
	}
};