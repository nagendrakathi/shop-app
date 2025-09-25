import React, { useState } from "react";
import axiosInstance from "../lib/axios";
import API_PATHS from "../lib/apiPaths";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function Admin() {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: 1,
  });

  const fetchProducts = async () => {
    try {
      const res = await axiosInstance.get(API_PATHS.ADMIN.GET_ALL_PRODUCTS);
      setProducts(res.data);
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axiosInstance.get(API_PATHS.ADMIN.GET_ALL_USERS);
      setUsers(res.data);
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  const createProduct = async () => {
    if (!newProduct.name || !newProduct.description || !newProduct.price) {
      toast.error("Please fill all required fields");
      return;
    }
    try {
      const res = await axiosInstance.post(API_PATHS.ADMIN.CREATE_PRODUCT, {
        name: newProduct.name,
        description: newProduct.description,
        price: Number(newProduct.price),
        stock: Number(newProduct.stock),
      });
      toast.success("Product created successfully");
      setNewProduct({ name: "", description: "", price: "", stock: 1 });
      fetchProducts();
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Failed to create product");
    }
  };

  const deleteProduct = async (productId: string) => {
    try {
      const res = await axiosInstance.delete(
        API_PATHS.ADMIN.DELETE_PRODUCT(productId)
      );
      toast.success(res.data.message);
      fetchProducts();
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  const deleteUser = async (userId: string) => {
    try {
      const res = await axiosInstance.delete(API_PATHS.ADMIN.DELETE_USER(userId));
      toast.success(res.data.message);
      fetchUsers();
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="mt-7 w-full px-5">
      <Link to={"/"}>Back</Link>
      <div className="mb-7 rounded border p-5">
        <h2 className="mb-3 text-xl font-bold">Create Product</h2>
        <input
          type="text"
          placeholder="Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          className="mb-2 w-full rounded border px-2 py-1"
        />
        <input
          type="text"
          placeholder="Description"
          value={newProduct.description}
          onChange={(e) =>
            setNewProduct({ ...newProduct, description: e.target.value })
          }
          className="mb-2 w-full rounded border px-2 py-1"
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          className="mb-2 w-full rounded border px-2 py-1"
        />
        <input
          type="number"
          placeholder="Stock"
          value={newProduct.stock}
          onChange={(e) => setNewProduct({ ...newProduct, stock: Number(e.target.value) })}
          className="mb-2 w-full rounded border px-2 py-1"
        />
        <button
          onClick={createProduct}
          className="bg-foreground cursor-pointer rounded px-4 py-2 font-bold text-white"
        >
          Create Product
        </button>
      </div>

      <button
        onClick={fetchProducts}
        className="bg-foreground cursor-pointer rounded px-4 py-2 font-bold text-white mb-3"
      >
        Fetch Products
      </button>
      <div className="mt-2">
        {products.length === 0 && <p>No products found</p>}
        {products.map((product: any) => (
          <div key={product._id} className="mb-3 rounded border p-3">
            <p className="font-bold">{product.name}</p>
            <p>{product.description}</p>
            <p>${product.price}</p>
            <p>Stock: {product.stock}</p>
            <p
              className="w-fit cursor-pointer rounded-md bg-red-500 px-2 py-1 text-white"
              onClick={() => deleteProduct(product._id)}
            >
              Delete Product
            </p>
          </div>
        ))}
      </div>

      <button
        onClick={fetchUsers}
        className="bg-foreground cursor-pointer rounded px-4 py-2 font-bold text-white mt-5 mb-3"
      >
        Fetch Users
      </button>
      <div className="mt-2">
        {users.length === 0 && <p>No users found</p>}
        {users.map((user: any) => (
          <div key={user._id} className="mb-3 rounded border p-3">
            <p className="font-bold">{user.name}</p>
            <p>{user.email}</p>
            <p>Role: {user.role}</p>
            <p
              className="w-fit cursor-pointer rounded-md bg-red-500 px-2 py-1 text-white"
              onClick={() => deleteUser(user._id)}
            >
              Delete User
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
