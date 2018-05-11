import {pubsub} from "./index";

export const commentResolver = {
	Mutation: {
		addComment: async (parent, args, {models}) => {
			const comment = await models.Comment.create(args);

			pubsub.publish('commentAdded', {
				commentAdded: comment.dataValues
			});

			return comment;
		}
	},

	Subscription: {
		commentAdded: {
			subscribe: () => pubsub.asyncIterator('commentAdded')
		}
	}
};