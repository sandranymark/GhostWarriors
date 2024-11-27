import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

export const jwtSecret = process.env.JWT_SECRET;

export const generateJWT = (payload) => {
    return jwt.sign(payload, jwtSecret, { expiresIn: '1h' });
};