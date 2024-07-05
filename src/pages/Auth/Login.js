import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FiEye, FiEyeOff } from "react-icons/fi";
import './auth.css'
const Login = ({ isAuth, setisAuth }) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://bloodbank-server-2g3p.onrender.com/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      if (!response.ok) {
        toast.error("Login Failed, Retry");
      } else {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        setisAuth(true);
        toast.success("Successfully logged in");
        navigate("/");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Server error");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="md:w-[28vw] mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Welcome Back 👋🏻</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
            <div className="relative">
            <input
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
            <button
              className="absolute inset-y-0 right-2 flex items-center justify-center bg-transparent text-gray-400 focus:outline-none"
              onClick={handleTogglePassword}
            >
              {showPassword ? <FiEyeOff color="#EA3323" size={20}/> : <FiEye color="#EA3323" size={20}/>}
            </button>
            </div>
       
          </div>
          <div className="flex justify-center">
            <button
              className="bg-[#CC2E2B] text-white py-2.5 px-4 rounded-full w-full"
              type="submit"
            >
              Sign In
            </button>
          </div>
        </form>
        <p className="mt-8 text-center">
          Don't have an account?{" "}
          <Link to="/sign-up" className="text-[#CC2E2B]">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

