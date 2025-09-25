import { AuthenticatedRequest } from './../middlewares/auth.middleware';
import Cart from "../models/Cart.model";
import { Response } from 'express';
import { Product } from '../models/Product.model';
import mongoose from 'mongoose';


export const addToCart = async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?._id;
    const { productId, quantity } = req.body;

    if (!userId) return res.status(401).json({ message: "Unauthorized" });
    if (!productId || !quantity || quantity <= 0) {
        return res.status(400).json({ message: "Invalid productId or quantity" });
    }

    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({ message: "Invalid product ID format" });
    }

    try {
        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: "Product not found" });

        if (product.stock < quantity) {
            return res.status(400).json({ message: "Insufficient stock available" });
        }
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, items: [{ productId, quantity }], totalPrice: 0 });
        } else {
            const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += quantity;
            } else {
                cart.items.push({ productId, quantity });
            }
        }
        let total = 0;
        for (const item of cart.items) {
            const prod = await Product.findById(item.productId);
            if (prod) total += prod.price * item.quantity;
        }
        cart.totalPrice = total;

        await cart.save();
        return res.status(200).json(cart);

    } catch (error) {
        console.error("Error in addToCart:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const getCart = async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?._id;
    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const cart = await Cart.findOne({ userId }).populate('items.productId');
        if (!cart) {
            return res.status(200).json({ items: [], totalPrice: 0 });
        }
        res.status(200).json(cart);
        return;
    } catch (error) {
        console.error("Error in getCart:", error);
        res.status(500).json({ message: "Internal server error" });
        return;
    }
};

export const removeFromCart = async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?._id;
    const { productId } = req.body;

    if (!userId) return res.status(401).json({ message: "Unauthorized" });
    if (!productId) return res.status(400).json({ message: "Invalid productId" });

    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({ message: "Invalid product ID format" });
    }

    try {
        const cart = await Cart.findOne({ userId });
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
        if (itemIndex === -1) return res.status(404).json({ message: "Product not found in cart" });

        cart.items.splice(itemIndex, 1);

        let total = 0;
        for (const item of cart.items) {
            const prod = await Product.findById(item.productId);
            if (prod) total += prod.price * item.quantity;
        }
        cart.totalPrice = total;

        await cart.save();
        return res.status(200).json(cart);

    } catch (error) {
        console.error("Error in removeFromCart:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const clearCart = async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?._id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });
    try {
        const cart = await Cart.findOneAndDelete({ userId });
        if (!cart) return res.status(404).json({ message: "Cart not found" });
        return res.status(200).json({ message: "Cart cleared successfully" });
    } catch (error) {
        console.error("Error in clearCart:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const checkOut = async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?._id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });
    try {
        const cart = await Cart.findOne({ userId });
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }
        // Here you would typically create an order, process payment, etc.
        // For simplicity, we'll just clear the cart.
        await Cart.findOneAndDelete({ userId });
        return res.status(200).json({ message: "Checkout successful" });
    }
    catch (error) {
        console.error("Error in checkout:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};