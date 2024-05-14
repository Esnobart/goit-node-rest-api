import { HttpError } from "../helpers/HttpError.js";
import { User } from "../models/userModel.js";
import { checkToken } from "../services/jwtServices.js";

export const protect = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.startsWith('Bearer ') && req.headers.authorization.split(' ')[1];
        const userId = checkToken(token);

        if (!userId) throw HttpError(401);
        const currentUser = await User.findById(userId);
        if (!currentUser) throw HttpError(401);

        if (currentUser.token !== token) {
            throw HttpError(401)
        }

        req.user = currentUser;
        next();
    } catch (err) {
        next(err)
    }
}