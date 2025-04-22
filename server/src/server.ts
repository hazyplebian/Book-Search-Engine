import express from 'express';
import path from 'node:path';
import type { Request, Response } from 'express';
import db from './config/connection.js';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import{ typeDefs, resolvers } from './schemas/index.js';
import { authenticateToken } from './services/auth.js';
import type { Context } from './types/express'; // or wherever you saved it

const PORT = process.env.PORT || 3001;

const server = new ApolloServer<Context>({
  typeDefs,
  resolvers,
  introspection: true,
});
const app = express();
const startApolloServer = async () => {
  await server.start();
  await db();
 

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

app.use(
  '/graphql',
  expressMiddleware(server, {
    context: async ({ req }) => {
      const user = authenticateToken(req);
      console.log('Context User:', user); // ✅ TEMP: Log user to verify
      return { user }; // `user` will be passed to resolvers via `context.user`
    },
  })
);

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
  });
};

startApolloServer();