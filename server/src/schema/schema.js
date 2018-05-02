export const typeDefs = `
	type User {
		id: Int!
		username: String!
		email: String!
		createdAt: String!
		updatedAt: String!
	}
	
	type Game {
		id: Int!
		createdAt: String!
		updatedAt: String!
		players: [String!]!
		winner: String!
	}
	
	type Query {
		getAllUsers: [User!]
		getUserById(userId: Int!): User
		allGames: [Game!]
	}
	
	type Mutation {
		register(username: String!, email: String!, password: String!): String!
		login(email: String!, password: String!): String!
		refreshToken(userId: Int): String!
		addGame(players: [String!]!, winner: String!): Game!
	}
`;