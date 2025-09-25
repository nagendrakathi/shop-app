import express from 'express';
import { deleteUser, getProfile, login, logout, register } from '../controllers/auth.controller';
import { verifyToken } from '../middlewares/auth.middleware';

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/profile", verifyToken, getProfile)
router.post("/delete", verifyToken, deleteUser)

export default router;