import { Query } from './query';
import { Mutation } from './mutation';
import { Subscription } from "./subscription";
import { PubSub } from 'graphql-subscriptions';

export const pubsub = new PubSub();

export const resolvers = {
	...Query,
	...Mutation,
	...Subscription
};