import { User } from '../entities/User';import { Request, Response } from "express";

import { CreateUserService } from "../services/create-user-service";

export class UserController {
  async register(req: Request, res: Response): Promise<Response> {
    try {
      const { name, email, password } = req.body;

      const service = new CreateUserService();

      const user = await service.execute({
        name,
        email,
        password,
      });

      return res.status(201).json({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      });
    } catch (error) {
      return res.status(400).json({
        message: error instanceof Error ? error.message : "Unexpected error",
      });
    }
  }
}