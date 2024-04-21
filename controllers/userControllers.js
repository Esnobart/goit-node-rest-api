import HttpError from "../helpers/HttpError.js";
import { User } from "../models/userModel.js";
import { createUser } from "../services/userServices.js";

export const signUp = async (req, res, next) => {
    try {
        const userExist = User.exists({ email: req.email });
        if (userExist) {next (HttpError(409, 'User already exist...'))};
        const newUser = createUser(req.password, req.email, req.subscription);
        const { email, subscription } = newUser;
        res.status(201).json({ user: { email, subscription } })
    } catch (err) {
        next(err)
    }
};

