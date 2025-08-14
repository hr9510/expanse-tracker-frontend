import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CreateAccount() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [createdUser, setCreatedUser] = useState(null);
  const [show, setShow] = useState(true)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = formData;

    if (!name.trim() || !email.trim() || !password.trim()) {
      return toast.warn("Please fill all fields");
    }

    try {
      const res = await fetch("https://expanse-tracker-backend-pg8i.onrender.com/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Server error");

      setCreatedUser(formData);
      setFormData({ name: "", email: "", password: "" });
      toast.success("Account created successfully!");
    } catch (err) {
      toast.error("Email already exists or use different password");
    }
  };

  return (
    <div className="min-h-screen p-4 text-center bg-gradient-to-br from-gray-100 to-gray-200">
      {/* Header */}
      <div className="w-[90%] bg-white mx-auto flex justify-between items-center my-10 px-6 py-4 rounded-xl shadow-lg flex-col md:flex-row space-y-1">
        <h1 className="text-2xl font-extrabold text-blue-800 md:text-3xl">
          📝 Create Account — Expense Tracker
        </h1>
        <Link to="/Account" className="font-semibold text-blue-600 transition-all duration-500 hover:text-red-800">
          📝 Account
        </Link>
        <Link to="/" className="text-lg font-semibold text-blue-600 transition-all duration-500 hover:text-red-800">
          🏠 Home
        </Link>
      </div>

      {/* Form */}
      <div className="w-full max-w-md p-8 mx-auto bg-white shadow-2xl rounded-xl shadow-green-600">
        <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
          <input
            type="text"
            name="name"
            placeholder="👤 Name"
            value={formData.name}
            onChange={handleChange}
            className="px-5 py-3 text-gray-700 bg-gray-100 rounded-full shadow-inner outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="email"
            name="email"
            placeholder="📧 Email"
            value={formData.email}
            onChange={handleChange}
            className="px-5 py-3 text-gray-700 bg-gray-100 rounded-full shadow-inner outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type={show?"password":"text"}
            name="password"
            placeholder="🔒 Password"
            value={formData.password}
            onChange={handleChange}
            className="px-5 py-3 text-gray-700 bg-gray-100 rounded-full shadow-inner outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="py-3 text-lg font-bold text-white transition-all duration-500 bg-blue-700 rounded-full hover:bg-blue-800"
          >
            🚀 Create Account
          </button>
        <ToastContainer position="bottom-right" autoClose={2000}/>
        </form>
        
          <button onClick={()=>setShow(!show)} className='font-semibold w-[100%] py-3 text-white bg-blue-700 rounded-full transition-all duration-500 hover:bg-blue-800'>
            {show?"SHOW":"HIDE"}
          </button>
      </div>

      {/* Confirmation */}
      {createdUser && (
        <div className="w-[90%] mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800">
            Account Created Successfully!
          </h2>
          <p className="mt-2 text-gray-600">Name: {createdUser.name}</p>
          <p className="text-gray-600">Email: {createdUser.email}</p>
        </div>
      )}
    </div>
  );
}
