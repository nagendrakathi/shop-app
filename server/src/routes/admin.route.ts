import express from 'express';
import { isAdmin, verifyToken } from '../middlewares/auth.middleware';
import { createProduct, deleteProduct, delUser, getAllProducts, getAllUsers, getProductById, getUserById, updateProduct } from '../controllers/admin.controller';

const router = express.Router();

router.post("/create-product", verifyToken, isAdmin, createProduct);
router.patch("/update-product/:id", verifyToken, isAdmin, updateProduct);
router.delete("/delete-product/:id", verifyToken, isAdmin, deleteProduct);
router.get("/get-all-products", verifyToken, getAllProducts)
router.get("/get-product/:id", verifyToken, isAdmin, getProductById)
router.get("/get-all-users", verifyToken, isAdmin, getAllUsers)
router.get("/get-user/:id", verifyToken, isAdmin, getUserById)
router.delete("/delete-user/:userId", verifyToken, isAdmin, delUser)

export default router;