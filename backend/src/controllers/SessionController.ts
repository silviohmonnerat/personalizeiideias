import { Request, Response } from "express";
import { compare } from "bcrypt";
import jwt from "jsonwebtoken";

import { prisma } from "../services/prisma";

interface IAuthenticateClient {
  username: string;
  password: string;
}

export class SessionController {
  async handle(request: Request, response: Response) {
    const { username, password }: IAuthenticateClient = request.body;

    const user = await prisma.sessions.findFirst({
      where: {
        username,
      },
    });

    if (!user) {
      throw new Error("Username or password invalid!");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Username or password invalid!");
    }

    const token = jwt.sign({ username }, process.env.JWT_SECRET, {
      subject: user.id,
      expiresIn: "1d",
    });

    return response.json(token);
  }
}
