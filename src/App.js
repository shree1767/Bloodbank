import "./App.css";
import { useState,useEffect} from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import Donor from "./pages/Donor";
import Reciever from "./pages/Reciever";
import { ToastContainer } from "react-toastify";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";

function App() {
  const [isAuth, setisAuth] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setisAuth(true);
    }
  }, []);

  return (
    <div className="App">
      <ToastContainer />
      <Navbar isAuth={isAuth} setisAuth={setisAuth} />
      <Routes>
        <Route path="/" element={<Landing isAuth={isAuth} />} />
        {!isAuth && (
          <>
            <Route path="/login" element={<Login isAuth={isAuth} setisAuth={setisAuth} />} />
            <Route path="/sign-up" element={<Signup isAuth={isAuth} setisAuth={setisAuth} />} />
          </>
        )}
        {isAuth && (
          <>
            <Route path="/donor" element={<Donor />} />
            <Route path="/reciever" element={<Reciever />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;

