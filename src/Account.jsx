import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Account() {
  const [users, setUsers] = useState([]);
  const [loginUser, setLoginUser] = useState()

  // Fetch all accounts on mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch("http://expanse-tracker-backend-atv7.onrender.com/get-user");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Error fetching users:", err);
      toast.error("Failed to load accounts");
    }

    const fetchLoggedInUser = async () => {
      try {
        const res = await fetch("http://expanse-tracker-backend-atv7.onrender.com/get-login-user");
        const data = await res.json();
        setLoginUser(data)
      } catch (e) {
        toast.error("Error fetching user");
      } finally {
      }
    }
      fetchLoggedInUser()
  };

  const handleDelete = async (user) => {
    if (!window.confirm(`Delete account for ${user.name}? This action is irreversible.`)) return;

    try {
      await fetch("http://expanse-tracker-backend-atv7.onrender.com/delete-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user.email),
      });
      toast.success("Account Deleted Successfully!");
      fetchUsers();
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Failed to delete account");
    }
  };

  return (
    <div className="min-h-screen p-4 text-center bg-gradient-to-br from-gray-100 to-gray-200">
      {/* Header */}
      <div className="w-[90%] bg-white mx-auto flex flex-col sm:flex-row justify-between items-center my-10 px-6 py-4 rounded-xl shadow-lg">
        <h1 className="text-2xl font-extrabold text-blue-800 md:text-3xl">
          📝 Account — Expense Tracker
        </h1>
        <div className="flex flex-col gap-4 sm:flex-row pt-[10px] ">
          <Link to="/loginAccount" className="text-lg font-semibold text-blue-600 transition-all duration-500 hover:text-red-800">
            📝 Login
          </Link>
          <Link to="/createAccount" className="text-lg font-semibold text-blue-600 transition-all duration-500 hover:text-red-800">
            ➕ Create Account
          </Link>
          <Link to="/" className="text-lg font-semibold text-blue-600 transition-all duration-500 hover:text-red-800">
            🏠 Home
          </Link>
        </div>
      </div>

      {/* Accounts List */}
      <div className="w-[90%] mx-auto space-y-6">
        {users.length === 0 ? (
          <p className="text-center text-gray-600">No accounts found.</p>
        ) : (
          users.map((user) => (
            <div key={user.email} className="p-6 bg-white rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-800">
                Account: {user.name}
              </h2>
              <p className="mt-2 text-gray-600">Email: {user.email}</p>
              <div className="flex items-baseline justify-between">
                <button
                onClick={() => handleDelete(user)}
                className="px-[1vw] py-[1vh] mt-3 text-white bg-red-500 rounded hover:bg-red-600 transition-all duration-500"
              >
                🗑 Delete Account
              </button>
              <p
                className={user.email === loginUser?.[0]?.email ? "px-4 py-2 font-semibold text-green-700" : "px-4 py-2 font-semibold text-red-700"}
              >
                 {user.email === loginUser?.[0]?.email ? "LOGGED IN" : "UN-LOGGED IN"}
              </p>
              </div>
            </div>
          ))
        )}
      </div>
      <ToastContainer position="bottom-right" autoClose={2000} />
    </div>
  );
}
