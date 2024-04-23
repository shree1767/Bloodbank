import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LuUser } from "react-icons/lu";

const Navbar = ({ isAuth, setisAuth }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setisAuth(false);
    setShowDropdown(false);
  };

  return (
    <nav className='fixed top-0 left-0 right-0 md:px-20 px-5 py-5 flex justify-between items-center z-10 bg-white shadow'>
      <Link to='/' className='font-bold tracking-widest'>
        BLOODBANK
      </Link>
      <div className="relative p-1">
        {isAuth ? (
          <button onClick={() => setShowDropdown(!showDropdown)} className="focus:outline-none bg-[#CC2E2B] p-3 rounded-full text-white">
            <LuUser size={20}/>
          </button>
        ) : (
          <Link to='/login' className='hover:text-red-600 font-semibold transition-colors duration:300 p-3'>Login</Link>
        )}
        {showDropdown && (
          <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg py-1">
            <Link to='/profile' onClick={()=>{setShowDropdown(false)}} className='block px-4 py-2 text-gray-800 hover:bg-gray-200 hover:text-gray-900'>
              Profile
            </Link>
            <Link to='/login' onClick={handleLogout} className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200 hover:text-gray-900">
              Logout
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
