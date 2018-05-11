import { mergeTypes } from 'merge-graphql-schemas';
import { gameSchema } from "./game";
import { userSchema } from "./user";
import { commentSchema } from "./comment";

export const typeDefs = mergeTypes([
	gameSchema,
	userSchema,
	commentSchema
]);