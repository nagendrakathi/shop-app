import React, { useState } from "react";
import { useUser } from "../context/useUser";
import axiosInstance from "../lib/axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

type FormData = {
  name: string;
  email: string;
  password: string;
  secretkey?: string;
};

export default function Register() {
  const { updateUser } = useUser();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    secretkey: "",
  });
  const [isAdmin, setIsAdmin] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submitForm = async () => {
    try {
      const res = await axiosInstance.post("/auth/register", {
        ...formData,
        role: isAdmin ? "admin" : "user",
        secret: isAdmin ? formData.secretkey : undefined,
      });
      updateUser(res.data.userData);
      toast.success("Registered Successfully");
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error(error?.response?.data?.message || "Registration failed");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let newErrors: Partial<FormData> = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (isAdmin && !formData.secretkey)
      newErrors.secretkey = "Secret key is required for admin registration";
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      submitForm();
      newErrors = {};
    }
  };

  return (
    <div className="border-primary mx-auto my-20 flex h-fit w-fit flex-col items-center justify-center rounded-md border-1 px-20 py-10">
      <h1 className="text-primary text-2xl">Register</h1>
      <form
        onSubmit={handleSubmit}
        className="mt-10 flex w-full flex-col gap-5 self-start"
      >
        <div className="flex w-full flex-col gap-2">
          <label htmlFor="name" className="text-primary">
            Full Name:
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            className="input border-primary text-primary w-full rounded-md border-1 px-2 py-1 text-sm outline-none"
          />
          {errors.name && (
            <div className="text-xs text-red-500">{errors.name}</div>
          )}
        </div>
        <div className="flex w-full flex-col gap-2">
          <label htmlFor="email" className="text-primary">
            Email:
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="input border-primary text-primary w-full rounded-md border-1 px-2 py-1 text-sm outline-none"
          />
          {errors.email && (
            <div className="text-xs text-red-500">{errors.email}</div>
          )}
        </div>
        <div className="flex w-full flex-col gap-2">
          <label htmlFor="password" className="text-primary">
            Password:
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            className="input border-primary text-primary w-full rounded-md border-1 px-2 py-1 text-sm outline-none"
          />
          {errors.password && (
            <div className="text-xs text-red-500">{errors.password}</div>
          )}
        </div>
        {isAdmin && (
          <div className="flex w-full flex-col gap-2">
            <label htmlFor="secretkey" className="text-primary">
              Secret Key:
            </label>
            <input
              type="password"
              name="secretkey"
              id="secretkey"
              value={formData.secretkey}
              onChange={handleChange}
              className="input border-primary text-primary w-full rounded-md border-1 px-2 py-1 text-sm outline-none"
            />
            {errors.secretkey && (
              <div className="text-xs text-red-500">{errors.secretkey}</div>
            )}
          </div>
        )}
        <div className="flex w-full flex-row gap-2">
          <input
            title="Register as Admin"
            type="checkbox"
            name="isAdmin"
            id="isAdmin"
            className="text-sm"
            onChange={() => setIsAdmin(!isAdmin)}
          />
          <label htmlFor="isAdmin" className="text-sm">
            Are you admin?
          </label>
        </div>

        <button
          type="submit"
          className="bg-foreground text-background hover:bg-primary/80 w-fit cursor-pointer self-center rounded-md px-3 py-2"
        >
          Register
        </button>
        <p className="text-sm">
          Already have an account?{" "}
          <Link to={"/Login"} className="cursor-pointer underline">
            Login
          </Link>
  
        </p>
      </form>
    </div>
  );
}
