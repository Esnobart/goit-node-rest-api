import { HttpError } from "../helpers/HttpError.js";
import { User } from "../models/userModel.js";
import { sendEMail } from "../services/emailService.js";
import { changeAvatar, createUser, findUser, verificationUser } from "../services/userServices.js";

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

export const verifyUser = async (req, res, next) => {
    try {
        const user = await verificationUser(req.params.verificationToken);
        if (!user) {
            throw HttpError(404, 'User not found')
        }
        res.status(200).json({
            message: 'Verification successful'
        })
    } catch (err) {
        next(err)
    }
}

export const resendMail = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) throw HttpError(401, 'User doesnt exist');
        if (user.verificationToken = null) throw HttpError(401, 'User already verificated')
        await sendEMail(user.email, user.verificationToken)
        res.status(200).json({
            message: "Verification email sent"
        })
    } catch (err) {
        next(err)
    }
}