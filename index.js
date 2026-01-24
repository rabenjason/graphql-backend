import express from "express";
import http from "http";

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";

import typeDefs from "./schema/index_schema.js";
import resolvers from "./resolvers/index_resolvers.js";

async function startServer() {
  const app = express();
  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  app.use(
    "/graphql",
    express.json(),
    expressMiddleware(server)
  );

  const PORT = process.env.PORT || 4000;

  httpServer.listen(PORT, () => {
    console.log(`🚀 GraphQL ready at http://localhost:${PORT}/graphql`);
  });
}

startServer();
