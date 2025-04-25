import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';    
import type { Request, Response } from 'express';
import db from './config/connection.js';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { typeDefs, resolvers } from './schemas/index.js';
import { authenticateToken } from './services/auth.js';
import type { Context } from './types/express';

// ─── shim for __dirname in ESM ────────────────────────────────────────────────
const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
// ────────────────────────────────────────────────────────────────────────────────

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
        console.log('Context User:', user);
        return { user };
      },
    })
  );

  if (process.env.NODE_ENV === 'production') {
    // point two levels up from server/dist into client/dist
    const clientBuildPath = path.resolve(__dirname, '../../client/dist');

    app.use(express.static(clientBuildPath));

    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(clientBuildPath, 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
  });
};

startApolloServer();
