import 'reflect-metadata';
import express from 'express';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import { UserResolver } from './resolvers/user';
import { ApolloServer } from 'apollo-server-express';
import redis from 'redis';
import session from 'express-session';
(async () => {
	const app = express();

	let RedisStore = require('connect-redis')(session);
	let redisClient = redis.createClient();

	app.use(
		session({
			name: 'chip',
			store: new RedisStore({ client: redisClient }),
			secret: 'eq[oweinqpwenjk',
			resave: false,
			saveUninitialized: false,
		})
	);

	await createConnection();

	const apolloServer = new ApolloServer({
		schema: await buildSchema({
			resolvers: [UserResolver],
			validate: false,
		}),
		context: ({ req, res }) => ({
			req,
			res,
			redis,
		}),
	});
	apolloServer.applyMiddleware({ app });
	app.listen(4000, () => {
		console.log('express server started 🥊');
	});
})();
