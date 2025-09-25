import mongoose from "mongoose";

export interface IUser {
    _id: string;
    name: string;
    email: string;
    password: string;
    role: 'user' | 'admin';
}

const UserSchema = new mongoose.Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ['user', 'admin'] }
}, {
    timestamps: true
});

const User = mongoose.model<IUser>("User", UserSchema);
export default User;