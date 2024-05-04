import { HttpError } from "../helpers/HttpError.js";
import { User } from "../models/userModel.js";
import { createUser, findUser } from "../services/userServices.js";

export const signUp = async (req, res, next) => {
    try {
        const userExist = await User.exists({ email: req.body.email });
        if (userExist) {next (HttpError(409, 'User already exist...'))};
        const newUser = await createUser(req.body);
        const { email, subscription } = newUser;
        res.status(201).json({ user: { email, subscription } })
    } catch (err) {
        next(err)
    }
};

export const logIn = async (req, res, next) => {
    try {
        const user = await findUser(req.body);
        if (!user) {
            next(HttpError(401))
        }
        res.status(200).json(user)
    } catch (err) {
        next(err)
    }
};

export const currentUser = async (req, res) => {
    res.status(200).json({
        user: req.user
    })
}

export const logOut = async (req, res) => {
    console.log(req.body.token)
    await User.findOneAndUpdate({ token: req.body.token}, { token: null });
    res.status(204).send('Success')
}
