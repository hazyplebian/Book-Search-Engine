import type { Request } from 'express';
import jwt from 'jsonwebtoken';
import { GraphQLError } from 'graphql';
import type { UserPayload } from '../types/express';
import dotenv from 'dotenv';
dotenv.config();

// interface JwtPayload {
//   _id: unknown;
//   username: string;
//   email: string,
// }


export const authenticateToken = (req: Request): UserPayload | undefined => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.split(' ')[1]; // expects "Bearer <token>"
  console.log("headers", authHeader)
  console.log("Token", token)
  console.log("SECRET", process.env.JWT_SECRET_KEY)
  if (!token) {
    console.log("No token")
    return;
  }

  try {
    const secretKey = process.env.JWT_SECRET_KEY || '';
    const decoded = jwt.verify(token, secretKey) as { data: UserPayload };
    console.log("DECODED", decoded)
    console.log("DATA", decoded.data)
    return decoded.data;
  } catch (error) {
    console.error('Invalid token:', error);
    return;
  }
};

export const signToken = (username: string, email: string, _id: unknown) => {
  const payload = { username, email, _id };
  const secretKey = process.env.JWT_SECRET_KEY || '';
  console.log(secretKey)

  return jwt.sign({ data: payload }, secretKey, { expiresIn: '2h' });
};

export class AuthenticationError extends GraphQLError {
  constructor(message: string) {
    super(message, { extensions: { code: 'UNAUTHETICATED' } });
    Object.defineProperty(this, 'name', { value: 'AuthenticationError' });
  }
};