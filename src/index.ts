import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import { COOKIE_NAME, __prod__ } from "./constants";
//import { Post } from "./entities/Post";
import mikroOrmConfig from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { PostResolver } from "./resolvers/post";
import { UserResolver } from "./resolvers/user";

import Redis from 'ioredis'
import session from "express-session";
import connectRedis from "connect-redis";
import { MyContext } from "./types";
import cors from "cors";
//import { sendEmail } from "./utils/sendEmail";
//import { User } from "./entities/User";

const PORT = 4000;

const main = async () => {
  const orm = await MikroORM.init(mikroOrmConfig);
  await orm.getMigrator().up();

  const app = express();

  const RedisStore = connectRedis(session);
  const redis = new Redis()
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );

  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({ client: redis, disableTouch: true }),

      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, //10 years
        httpOnly: true,
        sameSite: "lax", //csrf
        secure: false,
      },
      saveUninitialized: false,
      //Put to .env
      secret: "keyboard cat",
      resave: true,
    })
  );

  const appoloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [PostResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }: MyContext) => ({ em: orm.em, req, res, redis }),
  });

  appoloServer.applyMiddleware({
    app,
    cors: false,
  });

  const server = app.listen(PORT, () => {
    console.log(`server started on localhost:${PORT}`);
  });

  //Ubuntu
  process.on("uncaughtException", () => {
    console.info("uncaughtException signal received.");
    console.log("Closing http server.");
    server.close(() => {
      console.log("Http server closed.");
    });
  });
};

main().catch((err) => {
  console.error(err);
});
