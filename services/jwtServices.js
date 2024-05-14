import jwt from 'jsonwebtoken';
import { HttpError } from '../helpers/HttpError.js';

export function signToken(id) {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: 604800,
    });
};

export function checkToken(token) {
    if (!token) throw HttpError(401, 'Unauthorized... no token');
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    return id
};
