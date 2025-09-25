import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/auth.middleware";
import { Product } from "../models/Product.model";
import User from "../models/User.model";

export const createProduct = async (req: AuthenticatedRequest, res: Response) => {
    const { name, description, price, stock = 1, images, status = "In stock" } = req.body;
    try {
        if (!name || !description || !price) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const newProduct = new Product({
            name,
            description,
            price,
            stock,
            images: images || [],
            status: status
        });
        await newProduct.save();
        return res.status(201).json(newProduct);
    } catch (error) {
        console.error("Error creating product:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const updateProduct = async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;
    const { name, description, price, stock, images } = req.body;
    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        if (name) product.name = name;
        if (description) product.description = description;
        if (price) product.price = price;
        if (stock !== undefined) product.stock = stock;
        if (images) product.images = images;
        await product.save();
        return res.status(200).json(product);
    } catch (error) {
        console.error("Error updating product:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const deleteProduct = async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;
    try {
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        return res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error("Error deleting product:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const getAllProducts = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const products = await Product.find();
        return res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const getProductById = async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;
    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        return res.status(200).json(product);
    } catch (error) {
        console.error("Error fetching product:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const getAllUsers = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const users = await User.find({ role: { $ne: "admin" } }).select("-password").select("-role");
        return res.status(200).json(users);
    }
    catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const getUserById = async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id).select("-password").select("-role");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const delUser = async (req: AuthenticatedRequest, res: Response) => {
    const { userId } = req.params;
    try {
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Error deleting user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
