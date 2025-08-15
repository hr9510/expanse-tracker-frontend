import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LoginAccount() {
  const [formData, setFormData] = useState({ name: "", password: "" });
  const [lastLogin, setLastLogin] = useState(null);
  const [users, setUsers] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch("https://expanse-tracker-backend-atv7.onrender.com/get-user");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Error fetching users:", err);
      toast.error("Failed to load users");
    }
  };

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };
const handleSubmit = async e => {
  e.preventDefault();

  if (users.length === 0) {
    return toast.warn("Create an account first then login");
  }

  const { name, password } = formData;

  if (!name.trim() || !password.trim()) {
    return toast.warn("Please fill all fields");
  }

  const match = users.find(u => u.name === name && u.password === password);
  if (!match) {
    return toast.warn("Invalid credentials");
  }

  try {
    await fetch("https://expanse-tracker-backend-atv7.onrender.com/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    toast.success("Logged in successfully");
    setLastLogin({ name });
    setFormData({ name: "", password: "" });
  } catch (err) {
    console.error("Login failed:", err);
    toast.error("Login failed!");
  }
};


  return (
    <div className="min-h-screen p-4 text-center bg-gradient-to-br from-gray-100 to-gray-200">
      {/* Header */}
      <div className="w-[90%] mx-auto flex justify-between items-center my-10 px-6 py-4 bg-white rounded-xl shadow-lg flex-col md:flex-row">
        <h1 className="text-2xl font-extrabold text-blue-800 md:text-3xl">
          📝 Login — Expense Tracker
        </h1>
        <div className="flex gap-4  flex-col md:flex-row pt-[10px]">
          <Link to="/Account" className="text-blue-600 transition-all duration-500 hover:text-red-800">
            📝 Account
          </Link>
          <Link to="/" className="text-blue-600 transition-all duration-500 hover:text-red-800">
            🏠 Home
          </Link>
        </div>
      </div>

      {/* Login Form */}
      <div className="w-full max-w-md p-8 mx-auto bg-white shadow-2xl rounded-xl shadow-green-600">
        <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
          <input
            type="text"
            name="name"
            placeholder="👤 Name"
            value={formData.name}
            onChange={handleChange}
            className="px-5 py-3 bg-gray-100 rounded-full focus:outline-none"
          />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="🔒 Password"
            value={formData.password}
            onChange={handleChange}
            className="px-5 py-3 bg-gray-100 rounded-full focus:outline-none"
          />
          <button
            type="submit"
            className="py-3 text-white transition-all duration-500 bg-blue-700 rounded-full hover:bg-blue-800"
          >
            🚀 Log in
          </button>
        </form>
        <button
          onClick={() => setShowPassword(prev => !prev)}
          className="w-full py-3 mt-2 text-white transition-all duration-500 bg-blue-700 rounded-full hover:bg-blue-800"
        >
          {showPassword ? "HIDE" : "SHOW"}
        </button>
        <ToastContainer position="bottom-right" autoClose={2000}  />
      </div>

      {/* Last Login Info */}
      {lastLogin && (
        <div className="w-[90%] mx-auto mt-10 p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800">Last Login</h2>
          <p className="mt-2 text-gray-600">Name: {lastLogin.name}</p>
        </div>
      )}
    </div>
  );
}
