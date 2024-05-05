import { HttpError } from "../helpers/HttpError.js";
import { User } from "../models/userModel.js";
import { changeAvatar, createUser, findUser } from "../services/userServices.js";

export const signUp = async (req, res, next) => {
    try {
        const userExist = await User.exists({ email: req.body.email });
        if (userExist) {
            throw HttpError(409, 'User already exist...')
        };
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
            throw HttpError(401)
        }
        res.status(200).json(user)
    } catch (err) {
        next(err)
    }
};

export const currentUser = async (req, res, next) => {
    try {
        res.status(200).json({
            user: req.user
        })
    } catch (err) {
        next(err)
    }
}

export const logOut = async (req, res, next) => {
    try {
        await User.findOneAndUpdate({ token: req.body.token}, { token: null });
        res.status(204).json({
            status: "Success"
        })
    } catch (err) {
        next(err)
    }
}

export const newAvatar = async (req, res, next) => {
    try {
        const newUser = await changeAvatar(req.user, req.file);
        console.log(newUser)
        if (!newUser) throw HttpError(401)
        res.status(204).json({
            user: newUser
        })
    } catch (err) {
        next(err)
    }
}