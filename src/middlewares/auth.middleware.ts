// middlewares/auth.middleware.ts

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthenticatedRequest extends Request {
    user?: any; // Puedes definir un tipo más específico para 'user' según tus necesidades
  }


export const authenticate = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Token de autenticación no proporcionado' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string); // Reemplaza con la clave secreta utilizada para firmar el token
    req['user'] = decoded; // Almacena la información del usuario en el objeto de solicitud para su uso posterior
    next(); // Continúa con la siguiente middleware o ruta
  } catch (error) {
    return res.status(401).json({ message: 'Token de autenticación no válido' });
  }
};
