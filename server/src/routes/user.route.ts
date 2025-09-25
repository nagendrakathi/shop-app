import express from 'express';
import { isUser, verifyToken } from '../middlewares/auth.middleware';
import { addToCart, checkOut, clearCart, getCart, removeFromCart } from '../controllers/user.controller';

const router = express.Router();

router.post("/add-to-cart", verifyToken, isUser, addToCart);
router.get("/get-cart", verifyToken, isUser, getCart);
router.delete("/remove-from-cart", verifyToken, isUser, removeFromCart)
router.delete("/clear-cart", verifyToken, isUser, clearCart)
router.post("/check-out", verifyToken, isUser, checkOut);

export default router;