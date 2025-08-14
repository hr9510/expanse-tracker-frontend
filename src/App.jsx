// App.js
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import ContactUs from "./ContactUs";
import CreateAccount from "./CreateAccount";
import LoginAccount from "./Login";
import Account from "./Account";
import NotFound from "./NotFound";
import Addform from "./Addform";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<Addform />} />
        <Route path="/about" element={<About />} />
        <Route path="/account" element={<Account />} />
        <Route path="/contactUs" element={<ContactUs />} />
        <Route path="/createAccount" element={<CreateAccount />} />
        <Route path="/loginAccount" element={<LoginAccount />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
