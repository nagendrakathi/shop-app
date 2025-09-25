import dotenv  from 'dotenv';
import { Response } from 'express';
import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

export const generateToken = (userId:string, role: string, res: Response): string => {
    const token = jwt.sign({ userId: userId.toString(), role }, JWT_SECRET, { expiresIn: '1h' });
    res.cookie("token", token, {
        maxAge: 3600000,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === 'production'
    })
    return token;
}