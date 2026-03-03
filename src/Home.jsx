import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Addform from "./Addform";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Home() {
  const [user, setUser] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [finalBalance, setFinalBalance] = useState(10)
  const [expenses, setExpenses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [deleteId, setDeleteId] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    earn: "",
    spend: "",
    totalBalance: "",
    email: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const total = expenses.reduce((acc, item) => acc + (item.totalBalance || 0), 0);
  setFinalBalance(total);
}, [expenses]);


  const fetchLoggedInUser = async () => {
    try {
      const res = await fetch("http://localhost:5000/get-login-user", {
        credentials: "include"
      });
      const data = await res.json();
      setUser(data[0] || null);
      setFormData(prev => ({ ...prev, email: data[0]?.email || "" }));
    } catch (e) {
      toast.error("Error fetching user");
    } finally {
      setLoading(false);
    }
  };

  const fetchExpenses = async email => {
    try {
      const res = await fetch("http://localhost:5000/get-expanses", {
        credentials: "include"
      });
      const expList = await res.json();
      setExpenses(expList.filter(e => e.email === email));
    } catch (e) {
      toast.error("Error fetching expenses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLoggedInUser();
  }, []);

  useEffect(() => {
    if (user?.email) {
      setLoading(true);
      fetchExpenses(user.email);
    }
  }, [user]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value, email: user?.email || "" }));
  };

  const addExpense = async e => {
    e.preventDefault();
    const { title, earn, spend} = formData;
    if (!title || !earn || !spend ) {
      return toast.warn("Please fill all fields");
    }
    try {
      // const csrf = getCookie("csrf_access_token"); 
      await fetch("http://localhost:5000/add-expanse", {
        credentials : "include",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        
      });
      toast.success("Expense Added Successfully");
      fetchExpenses(user.email);
      setFormData({
        title: "",
        earn: "",
        spend: "",
        totalBalance: "",
        email: user.email,
      });
      setShowForm(false);
    } catch {
      toast.error("Something went wrong!");
    }
  };
const removeExpense = async () => {
  if (deleteId.length === 0) {
    return toast.warn("Please select an expense row");
  }

  try {
    const res = await fetch("http://localhost:5000/remove-expanses", {
      credentials : "include",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(deleteId),
    });

    if (!res.ok) throw new Error("Server error");

    toast.success("Expense deleted");
    fetchExpenses(user.email);
    setDeleteId([]);
  } catch {
    toast.error("Failed to remove expense");
  }
  };
  
  const updateExpense = async (e) => {
    e.preventDefault();
    setUpdating(true);
    if (deleteId.length === 0) {
      setUpdating(false);
      return toast.warn("Please select an expense row to update");
    }
    try {
      const res = await fetch("http://localhost:5000/update-expanse", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: deleteId[0] , data : formData}),
      });
      const data = await res.json();
      toast.success("Expense updated successfully");
      fetchExpenses(user.email)
      setUpdating(false);
    }
    catch (err) {
      toast.error("Update failed",);
      console.log(err)
    }
  }


  const submitLogout = async () => {
    if (!user) return toast.warn("Already logged out");
    try {
      await fetch("http://localhost:5000/delete-login-user", {
        credentials: "include"
      });
      toast.success("Logged out successfully");
      window.location.reload();
    } catch (err) {
      toast.error("Logout failed");
      console.log(err)
    }
  };

const resetApp = () => {
  if (user === null) {
    toast.warn("Login into an account first to reset app")
  } else {
    if (!window.confirm("Want to reset full app? This action is irreversible.")) return;

  fetch("http://localhost:5000/reset-app", { method: "GET", credentials: "include" })
    .then(res => res.json())
    .catch(err => {
      console.error("Reset failed", err);
    });
    toast.success("Full App has been reset");

setTimeout(() => {
  window.location.reload();
}, 1500);

  }
}


  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-gray-100 to-gray-300 w-[100vw] overflow-x-auto text-center">
      {/* Navigation */}
      <nav className="flex flex-col col-auto sm:flex-row items-center justify-evenly gap-5 py-6 bg-white shadow-md rounded-xl w-[90%] mx-auto">
        <h2 className="text-2xl font-extrabold">🏠 Home</h2>
        <Link to="/Account" className="text-blue-600 transition-all duration-500 hover:text-red-800">📝 Account</Link>
        <button onClick={submitLogout} className="text-purple-700 transition-all duration-500 hover:text-red-800">🚪 Log out</button>
        <Link to="/about" className="text-purple-600 transition-all duration-500 hover:text-red-800">📖 About</Link>
        <Link to="/contactUs" className="text-green-600 transition-all duration-500 hover:text-red-800">📞 Contact Us</Link>
        <button onClick={resetApp} className="text-yellow-600 transition-all duration-500 hover:text-red-800">🗑️ Reset Full App</button>
        <ToastContainer position="bottom-center" autoClose={2000}  />
      </nav>

      {showForm  ? (
  <Addform
    handleSubmit={addExpense}
    formData={formData}
    handleChanging={handleChange}
          setFinalBalance={setFinalBalance} 
  />
) : loading ? (
  <p className="my-10 text-center">Loading...</p>
) : user ? (
  <table className="mx-auto my-10 bg-white shadow-2xl rounded-xl  min-w-[600px] md:min-w-full table-auto">
    <caption className="my-5 text-3xl font-extrabold decoration-dashed">
      💰 Welcome {user.name} to Expense Tracker
    </caption>
    <thead className="text-lg text-white bg-black">
      <tr>
        <th className="p-4 border">S. No.</th>
        <th className="p-4 border">Title</th>
        <th className="p-4 border">Earn</th>
        <th className="p-4 border">Spend</th>
        <th className="p-4 border">Balance</th>
      </tr>
    </thead>

<tbody className="text-center text-gray-700">
                {expenses.map((e, idx) => {
                  return(
    <tr
      key={e.id}
      className={`hover:bg-gray-200 transition-all duration-500 ${deleteId.includes(e.id) ? "bg-red-100" : ""}`}
      onClick={()=> {deleteId.includes(e.id)? setDeleteId(prev => prev.filter(id => id !== e.id)) : setDeleteId(prev => [...prev, e.id])}}
    >
      <td className="p-4 border">{idx + 1}</td>
      <td className="p-4 border">{e.title}</td>
      <td className="p-4 font-semibold text-green-600 border">{e.earn}</td>
      <td className="p-4 font-semibold text-red-600 border">{e.spend}</td>
      <td
        className={`p-4 font-bold border ${
          e.totalBalance >= 0 ? "text-green-500" : "text-red-500"
        }`}
      >
        {e.totalBalance}
      </td>
    </tr>
    
  )})}
     <td colSpan={4}  className="p-4 font-bold ">Total </td>
    <td className={`p-4 font-bold border ${
          finalBalance >= 0 ? "text-green-500" : "text-red-500"
        }`}>{finalBalance}</td>       
</tbody>

  </table>
) : (
  <div className=" w-full py-[10vh] text-center text-3xl font-extrabold animate-[float_3s_ease-in-out_infinite] hover:text-red-600  transition-all duration-500">
    Login to start using the app
  </div>
)}

      {user?<div className="flex justify-center gap-5 w-[90%] mx-auto my-5">
                <button
                    onClick={() => setShowForm(prev => !prev)}
                  className="p-4 font-semibold text-white transition-all duration-500 bg-black rounded-xl hover:bg-white hover:text-black"
                >
                  {showForm ? "Hide" : "Show"} Expense Form
                </button>
                <button
          onClick={removeExpense}
          className={!showForm? "p-4 text-white bg-black rounded-xl transition-all duration-500 hover:bg-white hover:text-black font-semibold" : "hidden"}
                >
                  Remove Selected Expense
                </button>
                {/* <button
          onClick={updateExpense}
          className={!showForm? "p-4 text-white bg-black rounded-xl transition-all duration-500 hover:bg-white hover:text-black font-semibold" : "hidden"}
                >
                  Updated Selected Expense
        </button> */}
      </div> : null}
    </div>
  );
}

export default Home;
