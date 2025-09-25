import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User, { IUser } from "../models/User.model"; // Assuming you have IUser interface

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) throw new Error("JWT_SECRET is not defined");

export interface AuthenticatedRequest extends Request {
    user?: IUser;
}

interface JwtPayload {
    userId: string;
    role: string;
}

export const verifyToken = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const token = req.cookies?.token;

    try {
        if (!token) {
            res.status(401).json({ message: "No token provided" });
            return;
        }
        const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
            res.status(401).json({ message: "Invalid token" });
            return;
        }
        req.user = user;
        next();
    } catch (error) {
        console.error("Error in verifyToken:", error);
        res.status(401).json({ message: "Invalid token" });
        return;
    }
};

export const isAdmin = (
    req: AuthenticatedRequest,
    res: Response,  
    next: NextFunction
): void => {
    if (req.user?.role !== "admin") {
        res.status(403).json({ message: "Require Admin Role!" });
        return;
    }
    next();
};

export const isUser = (
    req: AuthenticatedRequest,
    res: Response,  
    next: NextFunction
): void => {
    if (req.user?.role !== "user") {
        res.status(403).json({ message: "Require User Role!" });
        return;
    }
    next();
};
