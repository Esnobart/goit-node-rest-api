import jwt from 'jsonwebtoken';
import HttpError from '../helpers/HttpError.js';

export const signToken = (id) => {
    jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

export const checkToken = (token) => {
    if (!token) throw new HttpError(401, 'Unauthorized...');
    try {
        const { id } = jwt.verify(token, process.env.JWT_SECRET);
        return id
    } catch (err) {
        throw new HttpError(401, 'Unauthorized...')
    }
}