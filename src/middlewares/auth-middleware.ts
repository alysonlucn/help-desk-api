import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface TokenPayload {
  iat: number;
  exp: number;

  sub: string;

  role: string;
}

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Response | void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "Token missing",
    });
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    );

    const { sub, role } = decoded as TokenPayload;

    req.user = {
      id: sub,
      role,
    };

    return next();
  } catch {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
}