export const userSchema = `
	type User {
		id: Int!
		createdAt: String!
		updatedAt: String!
		username: String!
		email: String!
		games: [Game!]
	}
	
	type Query {
		getAllUsers: [User]
		getUserById (userId: Int!): User!
	}
	
	type Mutation {
		register(username: String!, email: String!, password: String!): String!
		login(email: String!, password: String!): String!
		refreshToken(userId: Int): String!
	}
`;