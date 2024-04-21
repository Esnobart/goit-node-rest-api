import { Router } from "express";
import { signUp } from "../controllers/userControllers.js";
import validateBody from "../helpers/validateBody.js";
import { signUpUserSchema, logInUserSchema } from "../schemas/userSchemas.js";

const authRouter = Router();

authRouter.post('/register', validateBody(signUpUserSchema), signUp);

authRouter.post('/login', validateBody(logInUserSchema));

export default authRouter;