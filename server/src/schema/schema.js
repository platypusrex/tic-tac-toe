export const typeDefs = `
	type User {
		id: Int!
		username: String!
		email: String!
		createdAt: String!
		updatedAt: String!
	}
	
	input GameSquareInput {
		squares: [String]
	}
	
	type GameSquare {
		squares: [String]
	}
	
	type Game {
		id: Int!
		createdAt: String!
		updatedAt: String!
		players: [String!]!
		winner: String!
		history: [GameSquare]
	}
	
	type Comment {
		id: Int!
		createdAt: String!
		updatedAt: String!
		comment: String!,
		userId: Int!
	}
	
	type Query {
		allUsers: [User!]
		userById(userId: Int!): User
		allGames: [Game!]
		gamesWonByUserId(username: String!): [Game!]
	}
	
	type Mutation {
		register(username: String!, email: String!, password: String!): String!
		login(email: String!, password: String!): String!
		refreshToken(userId: Int): String!
		addGame(players: [String!]!, winner: String!, history: [GameSquareInput]): Game!
		addComment(comment: String!, userId: Int!): Comment!
	}
	
	type Subscription {
		commentAdded (userId: Int): Comment
	}
`;