import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Signup = ({ isAuth, setisAuth }) => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleTogglePassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword((prevState) => !prevState);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("https://bloodbank-server-2g3p.onrender.com/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: form.username,
          email: form.email,
          password: form.password,
        }),
      });
      if (!response.ok) {
        toast.error("Failed to register");
      } else {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        setisAuth(true);
        toast.success("Signed Up!");
        navigate("/");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Server error");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="md:w-[28vw] mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">New Member 🙏🏼</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="username">
              Username
            </label>
            <input
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              type="text"
              id="username"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
            />
          </div>
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
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 pr-10"
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
                {showPassword ? (
                  <FiEyeOff color="#EA3323" size={20} />
                ) : (
                  <FiEye color="#EA3323" size={20} />
                )}
              </button>
            </div>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 mb-2"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 pr-10"
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                required
              />
              <button
                className="absolute inset-y-0 right-2 flex items-center justify-center bg-transparent text-gray-400 focus:outline-none"
                onClick={handleToggleConfirmPassword}
              >
                {showConfirmPassword ? (
                  <FiEyeOff color="#EA3323" size={20} />
                ) : (
                  <FiEye color="#EA3323" size={20} />
                )}
              </button>
            </div>
          </div>
          <div className="flex justify-center">
            <button
              className="bg-[#CC2E2B] text-white py-2.5 px-4 rounded-full w-full"
              type="submit"
            >
              Sign Up
            </button>
          </div>
        </form>
        <p className="mt-8 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-[#CC2E2B]">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
