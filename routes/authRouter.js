import { Router } from "express";
import { signUp, logIn, currentUser, logOut, newAvatar, verifyUser, resendMail } from "../controllers/userControllers.js";
import validateBody from "../helpers/validateBody.js";
import { protect } from "../middleware/protectToken.js";
import { signUpUserSchema, logInUserSchema } from "../schemas/userSchemas.js";
import { uploadAvatar } from "../middleware/avatarMiddleware.js";
import { sendEMail } from "../services/emailService.js";

const authRouter = Router();

authRouter.post('/register', validateBody(signUpUserSchema), signUp);

authRouter.post('/login', validateBody(logInUserSchema), logIn);

authRouter.post('/logout', protect, logOut);

authRouter.get('/current', protect, currentUser);

authRouter.patch('/avatars', protect, uploadAvatar, newAvatar);

authRouter.post('/verify', validateBody(sendEMail), resendMail)

authRouter.get('/verify/:verificationToken', verifyUser)

export default authRouter;