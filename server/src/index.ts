import express from 'express';
import cors from 'cors';
import dotenv from "dotenv"
import morgan from 'morgan';
import cookieparser from 'cookie-parser';

import connectDB from './config/db';
import authRoutes from './routes/auth.route';
import adminRoutes from './routes/admin.route';
import userRoutes from "./routes/user.route";

dotenv.config()

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieparser());

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/user',userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
    connectDB()
});