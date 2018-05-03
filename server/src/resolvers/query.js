export const Query = {
	Query: {
		allUsers: (parent, args, {models}) => models.User.findAll(),
		userById: (parent, {userId}, {models}) => models.User.findOne({ where: {id: userId} }),
		allGames: (parent, args, {models}) => models.Game.findAll(),
		gamesWonByUserId: (parent, {username}, {models}) => models.Game.findAll({ where: {winner: username}})
	}
};