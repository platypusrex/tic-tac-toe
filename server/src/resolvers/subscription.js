import { pubsub } from "./index";

export const Subscription = {
	Subscription: {
		commentAdded: {
			subscribe: () => pubsub.asyncIterator('commentAdded')
		}
	}
};