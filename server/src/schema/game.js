export const gameSchema = `
	enum GameStatus {
		pending
		started
		complete
		cancelled
	}
	
	enum GameType {
		one_player
		two_player
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
 		status: GameStatus
 		type: GameType
 		players: [User]
 		winner: User
 		history: [GameSquare]
 	}
 	
 	type Query {
 		getAllGames: [Game]
 		getGameById (gameId: Int!): Game!
	}
 	
 	type Mutation {
 		createGame (userId: Int!, type: GameType): Game!
 		updateGame (gameId: Int!, status: GameStatus, winnerId: Int): Game!
 	}
 	
 	type Subscription {
 		gameChanged (gameId: Int!): Game!
 	}
`;