import { v4 as uuidv4 } from 'uuid';
import { User } from "../models/userModel.js";

async function createUser(password, email, subscription) {
    const newUser = await User.create({ id: uuidv4(), email, subscription });
    newUser.password = undefined;
    return (newUser);
};

export { createUser };