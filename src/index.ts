import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
//import { Post } from "./entities/Post";
import mikroOrmConfig from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { PostResolver } from "./resolvers/post";
import { UserResolver } from "./resolvers/user";

const PORT = 4000;

const main = async () => {
  const orm = await MikroORM.init(mikroOrmConfig);
  await orm.getMigrator().up();

  const app = express();

  const appoloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [PostResolver, UserResolver],
      validate: false,
    }),
    context: () => ({ em: orm.em }),
  });

  appoloServer.applyMiddleware({ app });

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
