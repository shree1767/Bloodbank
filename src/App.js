import "./App.css";
import { useState,useEffect} from "react";
import axios from "axios";
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
  const [user, setUser] = useState(null);

  const fetchUserProfile = async (token) => {
    try {
      const response = await axios.get("https://bloodbank-server-2g3p.onrender.com/user/profile", {
        headers: {
          "x-auth-token": token,
        },
      });
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      setisAuth(false); // If the token is invalid or expired, log out the user
      localStorage.removeItem("token");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserProfile(token)
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
            <Route path="/donor" element={<Donor user={user}/>} />
            <Route path="/reciever" element={<Reciever />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;

