import mongoose from "mongoose";

export interface IProduct {
    name: string;
    description: string;
    price: number;
    stock: number;
    images: string[];
    createdAt: Date;
    updatedAt: Date;
    status?: string;
}

const ProductSchema = new mongoose.Schema<IProduct>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    images: { type: [String], default: [] },
    status: { type: String, default: "In stock" }
}, {
    timestamps: true
})

export const Product = mongoose.model<IProduct>('Product', ProductSchema);
