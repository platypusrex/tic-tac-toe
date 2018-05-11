import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import { execute, subscribe } from 'graphql';
import { createServer } from 'http';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { typeDefs } from "./schema";
import { resolvers } from './resolvers';
import { port } from './utils/config';
import models from './models';

const schema = makeExecutableSchema({
	typeDefs,
	resolvers
});

const app = express();

app
	.use(cors('*'))
	.use(
		'/graphiql',
		graphiqlExpress({
			endpointURL: '/graphql',
			subscriptionsEndpoint: `ws://localhost:${port}/subscriptions`
		})
	)
	.use(
		'/graphql',
		bodyParser.json(),
		graphqlExpress({
			schema,
			context: { models }
		})
	);

const ws = createServer(app);

models
	.sequelize
	.sync({})
	.then(() => ws.listen(port, () => {
		console.log(`listening on port ${port}`);

		new SubscriptionServer({
			execute,
			subscribe,
			schema
		}, {
			server: ws,
			path: '/subscriptions'
		});
	}));