declare namespace Express {
  interface Request {
    user: {
      _id: unknown;
      username: string;
    };
  }
}

export type UserPayload = {
  _id: string;
  email?: string; // optional, if included in the JWT
  username?: string;
  // Add more fields from your JWT payload if needed
};

export interface Context {
  user?: UserPayload;
}