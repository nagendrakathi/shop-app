import React, { use, useEffect, useState } from "react";
import axiosInstance from "../lib/axios";
import API_PATHS from "../lib/apiPaths";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function Cart() {
  const [cartItems, setCartItems] = React.useState<any[]>([]);
  const [cart, setCart] = useState<any>(null);
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const { data } = await axiosInstance.get(API_PATHS.USER.GET_CART);
        setCartItems(data.items);
        setCart(data);
      } catch (error) {
        console.error("Failed to fetch cart items:", error);
      }
    };
    fetchCartItems();
  }, []);

  const handleCheckOut = async () => {
    try {
      const { data } = await axiosInstance.post(API_PATHS.USER.CHECK_OUT);
      setCartItems([]);
      setCart(data);
      toast.success("Checkout successful");
    } catch (error) {
      console.error("Checkout failed:", error);
      toast.error("Checkout failed");
    }
  };

  return (
    <div className="min-h-screen w-full">
      <h1 className="my-6 text-center text-3xl font-bold">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-center">
          Your cart is empty.{" "}
          <Link to={"/"} className="underline">
            Back to home
          </Link>
        </p>
      ) : (
        <div className="flex flex-col items-center justify-center">
          {cartItems.map((item) => (
            <div
              key={item.productId._id}
              className="mb-4 w-1/2 rounded border p-4 shadow"
            >
              <h2 className="mb-2 text-xl font-semibold">
                {item.productId.name}
              </h2>
              <p className="mb-2 text-gray-700">
                Price: Rs {item.productId.price}
              </p>
              <p className="mb-2 text-gray-700">Quantity: {item.quantity}</p>
              <p className="text-gray-600">
                Total: Rs {item.productId.price * item.quantity}
              </p>
            </div>
          ))}
          <p className="font-bold">Total Cart Price:Rs {cart.totalPrice}</p>
          <button
            className="bg-foreground text-background hover:bg-foreground/80 cursor-pointer rounded-md px-2 py-2"
            onClick={handleCheckOut}
          >
            CheckOut
          </button>
        </div>
      )}
    </div>
  );
}
