import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { userRepository } from "../repositories/user-repository";

interface AuthRequestDTO {
  email: string;
  password: string;
}

export class AuthService {
  async execute({
    email,
    password,
  }: AuthRequestDTO) {
    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    const user = await userRepository.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign(
      {
        role: user.role,
      },
      process.env.JWT_SECRET as string,
      {
        subject: String(user.id),
        expiresIn: "1d",
      }
    );

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }
}