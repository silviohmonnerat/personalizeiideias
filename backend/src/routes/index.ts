import { Router } from "express";

import { authentication } from "../middlewares/auth";

import { CreateUserController } from "../controllers/CreateUserController";
import { GetUserInfoController } from "../controllers/GetUserInfoController";
import { LoginUserController } from "../controllers/LoginUserController";

const routes = Router();

const createUserController = new CreateUserController();
const loginUserController = new LoginUserController();
const getUserInfoController = new GetUserInfoController();

routes.post("/users", createUserController.handle);

routes.post("/login", loginUserController.handle);
routes.get("/users/profile", authentication, getUserInfoController.handle);

export { routes };
