export const commentTypes = `
	type Comment {
		id: Int!
		createdAt: String!
		updatedAt: String!
		comment: String!,
		userId: Int!
	}
	
	type Mutation {
		addComment(comment: String!, userId: Int!): Comment!
	}
	
	type Subscription {
		commentAdded (userId: Int): Comment
	}
`;