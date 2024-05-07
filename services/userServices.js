import { v4 as uuidv4 } from 'uuid';
import { User } from "../models/userModel.js";
import { checkPasswordHash, createPasswordHash } from './passwordHashService.js';
import { HttpError } from "../helpers/HttpError.js";
import { signToken } from './jwtServices.js';
import crypto from 'crypto';
import { ImageService } from './imageService.js';
import { sendEMail } from './emailService.js';

async function createUser(userData) {
    const password = await createPasswordHash(userData.password);
    const hash = crypto.createHash('md5').update(userData.email).digest('hex');
    const avatarURL = `https://gravatar.com/avatar/${hash}.jpg?d=identicon`;
    const newUser = await User.create({ id: uuidv4(), ...userData, avatarURL, password, verificationToken: uuidv4()});
    newUser.password = undefined;
    await sendEMail(userData.email)
    return (newUser);
};

async function findUser({email, password}) {
    const user = await User.findOne({ email });
    if (!user) throw HttpError(401);
    if (user.verificationToken !== null) throw HttpError(409, 'Verify your email for log in')
    const isPasswordIsValid = await checkPasswordHash(password, user.password);
    if (!isPasswordIsValid) throw HttpError(401, 'Data is incorrect..');
    const token = signToken(user.id);
    user.token = token;
    await user.save();
    user.password = undefined;
    return user
};

async function changeAvatar(user, file) {
    if (file) {
        user.avatarURL = await ImageService.saveImage(file);
        console.log(user.avatarURL)
        const newUser = await User.findByIdAndUpdate({ _id: user.id }, { avatarURL })
        return newUser
    }
    return null
}

async function findUserByToken(token) {
    const user = await User.findOne({ verificationToken: token });
    if (user) {
        user.verificationToken = null;
        user.verify = true;
        await user.save();
        return user
    }
    return null
}

export { createUser, findUser, changeAvatar, findUserByToken };