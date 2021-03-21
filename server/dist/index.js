"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const user_1 = require("./resolvers/user");
const apollo_server_express_1 = require("apollo-server-express");
const redis_1 = __importDefault(require("redis"));
const express_session_1 = __importDefault(require("express-session"));
(() => __awaiter(void 0, void 0, void 0, function* () {
    const app = express_1.default();
    let RedisStore = require('connect-redis')(express_session_1.default);
    let redisClient = redis_1.default.createClient();
    app.use(express_session_1.default({
        name: 'chip',
        store: new RedisStore({ client: redisClient }),
        secret: 'eq[oweinqpwenjk',
        resave: false,
        saveUninitialized: false,
    }));
    yield typeorm_1.createConnection();
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: yield type_graphql_1.buildSchema({
            resolvers: [user_1.UserResolver],
            validate: false,
        }),
        context: ({ req, res }) => ({
            req,
            res,
            redis: redis_1.default,
        }),
    });
    apolloServer.applyMiddleware({ app });
    app.listen(4000, () => {
        console.log('express server started 🥊');
    });
}))();
//# sourceMappingURL=index.js.map