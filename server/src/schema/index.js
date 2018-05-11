import { mergeTypes } from 'merge-graphql-schemas';
import { gameTypes} from "./game";
import { userTypes } from "./user";
import { commentTypes} from "./comment";

export const typeDefs = mergeTypes([
	gameTypes,
	userTypes,
	commentTypes
]);