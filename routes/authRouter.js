import { Router } from "express";
import { signUp, logIn, currentUser, logOut, newAvatar, getUser, resendMail } from "../controllers/userControllers.js";
import validateBody from "../helpers/validateBody.js";
import { protect } from "../middleware/protectToken.js";
import { signUpUserSchema, logInUserSchema } from "../schemas/userSchemas.js";
import { uploadAvatar } from "../middleware/avatarMiddleware.js";

const authRouter = Router();

authRouter.post('/register', validateBody(signUpUserSchema), signUp);

authRouter.post('/login', validateBody(logInUserSchema), logIn);

authRouter.post('/logout', protect, logOut);

authRouter.get('/current', protect, currentUser);

authRouter.patch('/avatars', protect, uploadAvatar, newAvatar);

authRouter.post('/verify', resendMail)

authRouter.get('/verify/:verificationToken', getUser)

export default authRouter;