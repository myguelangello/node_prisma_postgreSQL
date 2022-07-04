import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

type TokenPayload = {
  id: string;
  iat: number;
  exp: number;
}

export function AuthMiddleware(
  req: Request, 
  res: Response, 
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    //caso não tiver um header mando um erro de autorização(401)
    return res.status(401).json({ error: 'No token provided' });
  }

  //verificar se o token está no formato certo
  //Ex: Bearer ghdngnbjjjwpmxbahs876739vyghfiv
  const parts = authHeader.split(' ');

  if (parts.length !== 2) {
    return res.status(401).json({ error: 'Token Error' });
  }
  
  //desestruturando o array do split
  const [scheme, token] = parts;

  //verificar se o scheme corresponde a Bearer
  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).json({ error: 'Wrong format token' });
  }

  try {
    const decoded = verify(token, "f2f609dfa94ba08c606e63cf8c87fd05");

    const { id } = decoded as TokenPayload

    req.userId = id;
    return next();
  } catch (error) { 
    return res.status(401).json({ error: 'Invalid Token' });
  
}
}
