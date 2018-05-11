import { mergeResolvers } from 'merge-graphql-schemas';
import { gameResolver } from "./game";
import { userResolver } from "./user";
import { commentResolver } from "./comment";
import { PubSub } from 'graphql-subscriptions';

export const pubsub = new PubSub();

export const resolvers = mergeResolvers([
	gameResolver,
	userResolver,
	commentResolver
]);
