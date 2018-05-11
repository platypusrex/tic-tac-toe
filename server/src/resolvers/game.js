import { pubsub } from "./index"
import { withFilter } from 'graphql-subscriptions';

const GAME_CHANGED = 'gameChanged';
const gameStatus = { pending: 'pending', started: 'started' };

export const gameResolver = {
	Game: {
		winner: async (parent, args, {models}) => {
			const user = await models.User.findOne({
				where: {id: parent.winnerId}
			});

			return user;
		}
	},
	Query: {
		getAllGames: async (parent, args, {models}) => {
			const games = await models.Game.findAll({
				include: [{
					as: 'players',
					model: models.User
				}]
			});

			return games;
		},
		getGameById: async (parent, {gameId}, {models}) => {
			const game = await models.Game.findOne({
				where: {id: gameId},
				include: [{
					as: 'players',
					model: models.User
				}]
			});

			return game;
		}
	},

	Mutation: {
		createGame: async (parent, args, {models}) => {
			try {
				const gameInProgress = await models.Game.findOne({ where: {status: gameStatus.pending} });
				let game;

				if (gameInProgress) {
					args.status = gameStatus.started;
					args.gameId = gameInProgress.id;

					game = await updateGame(models, args);
				} else {
					game = await models.sequelize.transaction(async () => {
						args.status = gameStatus.pending;
						const newGame = await models.Game.create(args);
						await models.UserGame.create({userId: args.userId, gameId: newGame.id});
						return newGame;
					});
				}

				pubsub.publish(GAME_CHANGED, {
					gameChanged: game.dataValues
				});

				return game;
			} catch (err) {
				throw new Error(`createGame: ${err}`);
			}
		},
		updateGame: async (parent, args, {models}) => {
			try {
				const game = await updateGame(models, args);

				pubsub.publish(GAME_CHANGED, {
					gameChanged: game.dataValues
				});

				return game;
			} catch (err) {
				throw new Error(`updateGame: ${err}`)
			}
		}
	},

	Subscription: {
		gameChanged: {
			subscribe: withFilter(() => pubsub.asyncIterator(GAME_CHANGED), (payload, variables) => {
				const { gameChanged } = payload;
				return gameChanged.id === variables.gameId;
			}),
		},
	}
};

async function updateGame (models, args) {
	const { gameId, userId, winnerId, status, type } = args;
	const [rowsUpdated, [game]] = await models.Game.update(
		{
			status,
			type,
			winnerId
		},
		{
			returning: true,
			where: {id: gameId}
		}
	);

	if (userId) {
		await models.UserGame.create({userId, gameId});
	}

	return game;
}