import { Request, Response } from "express";
import { compare } from "bcrypt";
import jwt from "jsonwebtoken";

import { prisma } from "../services/prisma";
import { setRedis } from "../services/redis";

interface IAuthenticateClient {
  email: string;
  password: string;
}

export class SessionController {
  async handle(request: Request, response: Response) {
    try {
      const { email, password }: IAuthenticateClient = request.body;

      const user = await prisma.users.findFirst({
        where: {
          email,
        },
      });

      if (!user) {
        return response.status(401).json({ error: "User not found!" });
      }

      const passwordMatch = await compare(password, user.password);

      if (!passwordMatch) {
        return response.status(401).json({ error: "Password invalid!" });
      }

      const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        subject: user.id,
        expiresIn: "1d",
      });

      await setRedis(`user-${user.id}`, JSON.stringify(user));

      return response.json(token);
    } catch (error) {
      return response.status(401).end();
    }
  }
}
