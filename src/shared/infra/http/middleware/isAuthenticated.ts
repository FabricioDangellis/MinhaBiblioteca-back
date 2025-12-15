import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from 'config/authConfig';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Error('Token JWT não enviado');
  }

  const parts = authHeader.split(' ');

  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    response.status(401).json({ message: 'Formato do token inválido' });
  }

  const token = parts[1];

  try {
    const decodedToken = verify(token, authConfig.jwt.secret!);
    const { sub } = decodedToken as ITokenPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch (error) {
    response.status(401).json({ message: 'Token JWT inválido' });
  }
}
