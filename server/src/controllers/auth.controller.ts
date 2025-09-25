import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.model";
import { generateToken } from "../config/jwt";
import { AuthenticatedRequest } from '../middlewares/auth.middleware';

interface RegisterBody {
    name: string;
    email: string;
    password: string;
    role: "user" | "admin";
    secret?: string;
}

interface LoginBody {
    email: string;
    password: string;
}

interface DeleteUserBody {
  password: string;
}

async function hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}

export const register = async (req: Request<{}, {}, RegisterBody>, res: Response): Promise<void> => {
    const { name, email, password, role, secret } = req.body;
    try {
        if (!name || !email || !password || !(role && ['user', 'admin'].includes(role))) {
            res.status(400).json({ message: "All fields are required" });
            return;
        }
        const existsingUser = await User.findOne({ email });
        if (existsingUser) {
            res.status(400).json({ message: "User already exists" });
            return;
        }
        if(role==='admin'){
            if(!secret){
                res.status(400).json({ message: "Admin secret is required" });
                return;
            }
            if(secret !== process.env.ADMIN_SECRET){
                res.status(403).json({ message: "Invalid admin secret" });
                return;
            }
        }
        const hashedPassword = await hashPassword(password);
        const newUser = new User({ name, email, password: hashedPassword, role });
        if (newUser) {
            generateToken(newUser._id, newUser.role, res);
            await newUser.save();
            const message = role === 'admin' ? "Admin registered successfully" : "User registered successfully";
            res.status(201).json({ message, userId: newUser._id, role: newUser.role });
        }
        return;
    } catch (error) {
        console.error("Error in register:", error);
        res.status(500).json({ message: "Server error" });
        return;
    }
}

export const login = async (req: Request<{}, {}, LoginBody>, res: Response): Promise<void> => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            res.status(400).json({ message: "Email and password are required" });
            return;
        }
        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({ message: "Invalid credentials" });
            return;
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ message: "Invalid credentials" });
            return;
        }
        generateToken(user._id, user.role, res);
        res.status(200).json({ message: "Login successful", userId: user._id, role: user.role });
        return;
    }
    catch (error) {
        console.error("Error in login:", error);
        res.status(500).json({ message: "Server error" });
        return;
    }
}

export const logout = (req: Request, res: Response): void => {
    try {
        res.cookie("token", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });
        return;
    } catch (error) {
        console.log("Error in logout controller");
        res.status(500).json({ message: "Internal server error" });
        return;
    }
}

export const getProfile = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    res.status(200).json({
        message: "user details fetched successfully",
        user: req.user,
    });
    return
}

export const deleteUser= async (req: AuthenticatedRequest& { body: DeleteUserBody }, res: Response): Promise<void> => {
    const userId = req.user?._id;
    console.log("Authenticated user ID:", userId);
    const { password } = req.body;
    try {
        if (!password) {
            res.status(400).json({ message: "Password is required" });
            return;
        }
        const user = await User.findById(userId);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ message: "Invalid password" });
            return;
        }
        await User.findByIdAndDelete(userId);
        res.cookie("token", "", { maxAge: 0 });
        res.status(200).json({ message: "User deleted successfully" });
        return;
    } catch (error) {
        console.error("Error in deleteUser:", error);
        res.status(500).json({ message: "Server error" });
        return;
    }
}