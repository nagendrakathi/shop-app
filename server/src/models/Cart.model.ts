import mongoose from "mongoose";

export interface CartItem {
  productId: mongoose.Types.ObjectId;
  quantity: number;
}

export interface CartDocument extends mongoose.Document {
    userId: mongoose.Types.ObjectId;
    items: CartItem[];
    totalPrice: number;
    createdAt: Date;
    updatedAt: Date;
}

const CartItemSchema = new mongoose.Schema<CartItem>({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true, min: 1 }
});

const CartSchema = new mongoose.Schema<CartDocument>({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    items: { type: [CartItemSchema], default: [] },
    totalPrice: { type: Number, required: true, default: 0 },
}, { timestamps: true });

const Cart = mongoose.model<CartDocument>('Cart', CartSchema);
export default Cart;