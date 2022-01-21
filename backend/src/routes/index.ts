import { Router } from "express";

import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";

import { SessionController } from "../controllers/SessionController";
import { UserController } from "../controllers/UserController";

const routes = Router();

const sessionController = new SessionController();
const userController = new UserController();

routes.post("/session", sessionController.handle);

routes.get("/users/profile", ensureAuthenticate, userController.handle);

export { routes };
