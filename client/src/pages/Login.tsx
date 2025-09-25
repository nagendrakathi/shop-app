import React, { useState } from "react";
import { useUser } from "../context/useUser";
import axiosInstance from "../lib/axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

type LoginData = {
  email: string;
  password: string;
};

export default function Login() {
  const { updateUser } = useUser();
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<LoginData>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submitForm = async () => {
    try {
      const res = await axiosInstance.post("/auth/login", loginData, {
        withCredentials: true,
      });
      updateUser(res.data.userData);
      toast.success("Logged in Successfully");
      navigate("/");
    } catch (error: any) {
      console.error("Login failed:", error);
      const message = error.response?.data?.message || "Login failed";
      toast.error(message);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let newErrors: Partial<LoginData> = {};
    if (!loginData.email) newErrors.email = "Email is required";
    if (!loginData.password) newErrors.password = "Password is required";
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      submitForm();
      newErrors = {};
    }
  };

  return (
    <div className="border-primary mx-auto my-20 flex h-fit w-fit flex-col items-center justify-center rounded-md border-1 px-20 py-10">
      <h1 className="text-primary text-2xl">Login</h1>
      <form
        onSubmit={handleSubmit}
        className="mt-10 flex w-full flex-col gap-5 self-start"
      >
        <div className="flex w-full flex-col gap-2">
          <label htmlFor="email" className="text-primary">
            Email:
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={loginData.email}
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
            value={loginData.password}
            onChange={handleChange}
            className="input border-primary text-primary w-full rounded-md border-1 px-2 py-1 text-sm outline-none"
          />
          {errors.password && (
            <div className="text-xs text-red-500">{errors.password}</div>
          )}
        </div>

        <button
          type="submit"
          className="bg-foreground text-background hover:bg-primary/80 w-fit cursor-pointer self-center rounded-md px-3 py-2"
        >
          Login
        </button>
        <p className="text-sm">
          Don't have an account?{" "}
          <Link to={"/register"} className="cursor-pointer underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
