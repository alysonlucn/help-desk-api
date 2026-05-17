import { Request, Response } from "express";

import { AuthService } from "../services/auth-service";

export class AuthController {
  async login(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;

      const service = new AuthService();

      const result = await service.execute({
        email,
        password,
      });

      return res.status(200).json(result);
    } catch (error) {
      return res.status(401).json({
        message: error instanceof Error
          ? error.message
          : "Authentication error",
      });
    }
  }
}