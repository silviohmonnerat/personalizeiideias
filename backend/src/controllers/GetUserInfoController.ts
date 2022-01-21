import { Request, Response } from "express";

import { createConnection } from "../services/postgres";
import { getRedis } from "../services/redis";

export class GetUserInfoController {
  async handle(request: Request, response: Response) {
    const { userId } = request;

    // const clientConnection = await createConnection();

    console.time();

    const userRedis = await getRedis(`user-${userId}`);
    const user = JSON.parse(userRedis);

    // const { rows } = await clientConnection.query(
    //   `SELECT * FROM USERS WHERE ID  = $1 LIMIT 1`,
    //   [userId]
    // );

    console.timeEnd();

    return response.json(user);
  }
}
