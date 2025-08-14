import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddForm({ handleSubmit, formData, handleChanging}) {
formData.totalBalance = Number(formData.earn) - Number(formData.spend);

  return (
    <div
      className="my-[4vh] w-full h-[70vh] bg-center bg-cover"
    >
      <div className="flex items-center justify-center w-full h-full backdrop-blur-sm">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-11/12 p-6 space-y-6 bg-transparent md:w-2/5 rounded-xl"
        >
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChanging}
            placeholder="Title"
            className="px-5 py-3 text-black bg-transparent rounded-full shadow-inner outline-none shadow-gray-900 placeholder:text-black"
          />
          <input
            type="number"
            name="earn"
            value={formData.earn}
            onChange={handleChanging}
            placeholder="Earn"
            className="px-5 py-3 text-black bg-transparent rounded-full shadow-inner outline-none shadow-gray-900 placeholder:text-black"
          />
          <input
            type="number"
            name="spend"
            value={formData.spend}
            onChange={handleChanging}
            placeholder="Spend"
            className="px-5 py-3 text-black bg-transparent rounded-full shadow-inner outline-none shadow-gray-900 placeholder:text-black"
          />
          <button
            type="submit"
            className="py-3 text-lg font-bold text-black transition-all duration-500 bg-transparent rounded-full hover:bg-white "
          >
            🚀 Add Expense
          </button>
        </form>
      </div>
      <ToastContainer position="bottom-center" autoClose={2000} />
    </div>
  );
}
