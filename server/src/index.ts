import 'reflect-metadata';
import express from 'express';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import { UserResolver } from './resolvers/user';
import { ApolloServer } from 'apollo-server-express';

(async () => {
	const app = express();

	await createConnection();

	const apolloServer = new ApolloServer({
		schema: await buildSchema({
			resolvers: [UserResolver],
			validate: false,
		}),
	});
	apolloServer.applyMiddleware({ app });
	app.listen(4000, () => {
		console.log('express server started 🥊');
	});
})();
