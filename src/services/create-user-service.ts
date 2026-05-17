import bcrypt from "bcryptjs";

import { User, UserRole } from "../entities/User";
import { userRepository } from "../repositories/user-repository";

interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
}

export class CreateUserService {
  async execute({
    name,
    email,
    password,
  }: CreateUserDTO): Promise<User> {
    if (!name || !email || !password) {
      throw new Error("All fields are required");
    }

    if (password.length < 6) {
      throw new Error("Password must be at least 6 characters");
    }

    const userAlreadyExists = await userRepository.findOne({
      where: {
        email,
      },
    });

    if (userAlreadyExists) {
      throw new Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = userRepository.create({
      name,
      email,
      password: hashedPassword,
      role: UserRole.USER,
    });

    await userRepository.save(user);

    return user;
  }
}