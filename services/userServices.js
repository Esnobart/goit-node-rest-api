import { v4 as uuidv4 } from 'uuid';
import { User } from "../models/userModel.js";
import { checkPasswordHash, createPasswordHash } from './passwordHashService.js';
import { HttpError } from "../helpers/HttpError.js";
import { signToken } from './jwdServices.js';

async function createUser(userData) {
    const password = await createPasswordHash(userData.password);
    const newUser = await User.create({ id: uuidv4(), ...userData, password});
    newUser.password = undefined;
    return (newUser);
};

async function findUser({email, password}) {
    const user = await User.findOne({ email });
    if (!user) throw new HttpError(401);
    const isPasswordIsValid = await checkPasswordHash(password, user.password);
    if (!isPasswordIsValid) throw new HttpError(401, 'Data is incorrect..');
    const token = signToken(user.id);
    user.token = token;
    await user.save();
    await User.findOneAndUpdate({ email }, { token }, { new: true });
    user.password = undefined;
    return user     
}

export { createUser, findUser };