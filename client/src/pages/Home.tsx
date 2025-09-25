import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import axiosInstance from "../lib/axios";
import API_PATHS from "../lib/apiPaths";
import { toast } from "react-toastify";

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);

  const fetchProducts = async () => {
    try {
      const { data } = await axiosInstance.get(API_PATHS.ADMIN.GET_ALL_PRODUCTS);
      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddToCart = async (productId: string) => {
    try {
      const res = await axiosInstance.post(API_PATHS.USER.ADD_TO_CART, {
        productId,
        quantity: 1,
      });
      if (res.status === 200) {
        toast.success("Product added to cart");
      } else {
        toast.error("Failed to add product to cart");
      }
    } catch (error) {
      console.error("Add to cart failed:", error);
      toast.error("Failed to add product to cart");
    }
  };

  return (
    <div className="min-h-screen w-full">
      <NavBar />
      <div className="mt-10 flex flex-col items-center justify-center">
        <h1 className="mb-6 text-3xl font-bold">All Products</h1>
        {products.length === 0 ? (
          <p>No products available.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product: any) => (
              <div key={product._id} className="rounded border p-4 shadow">
                <h2 className="mb-2 text-xl font-semibold">{product.name}</h2>
                <p className="mb-4 text-gray-700">${product.price}</p>
                <p className="text-gray-600">{product.description}</p>
                <p className="text-gray-600">In Stock: {product.stock}</p>
                <button
                  className="mt-3 rounded bg-primary px-3 py-1 text-white hover:bg-primary/80"
                  onClick={() => handleAddToCart(product._id)}
                >
                  Add to cart
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
