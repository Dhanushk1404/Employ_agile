import React, { useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { IoIosNotifications } from "react-icons/io";
import { IoSettings } from "react-icons/io5";
import { RxAvatar } from "react-icons/rx";
import {useNavigate} from 'react-router-dom' 

const UpperNavMain = () => {

  const organizationDetails = JSON.parse(
    localStorage.getItem("organizationDetails")
  );

  console.log(organizationDetails.organizationDetails.organization.companyName);
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("organizationDetails");
    navigate('/login')
    window.location.reload(); 
  };

  return (
    <div>
      <nav className="bg-blue-950 p-4 flex justify-between items-center shadow-lg pl-20 w-full fixed z-50">
        <div>
          <ul className="flex space-x-8 text-white font-poppins text-sm">
            <li className="hover:text-blue-300 transition-colors duration-300 cursor-pointer">My Space</li>
            <h1>{organizationDetails.organizationDetails.organization.companyName}'s Admin Dashboard</h1>
          </ul>
        </div>

        <div className="flex space-x-6 text-white text-2xl relative">
          <span className="hover:text-blue-300 transition-colors duration-300 cursor-pointer">
            <IoMdSearch />
          </span>
          <span className="hover:text-blue-300 transition-colors duration-300 cursor-pointer">
            <IoIosNotifications />
          </span>
          <span className="hover:text-blue-300 transition-colors duration-300 cursor-pointer">
            <IoSettings />
          </span>
          <span 
            className="hover:text-blue-300 transition-colors duration-300 cursor-pointer relative"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
          >
            <RxAvatar />
            {isDropdownOpen && (
              <div className="absolute right-0 bg-white text-black rounded shadow-lg mt-2 w-96 p-5">
                <div className="p-2 text-sm">
                  <h2 className="font-semibold">Sign Out</h2>
                  <p>Are you sure you want to sign out?</p>
                </div>
                <div className="flex justify-end border-t border-gray-300 text-sm p-5">
                  <button 
                    className="bg-red-500 text-white px-10 py-2 rounded mr-2"
                    onClick={handleSignOut}
                  >
                    sign out
                  </button>
                  <button 
                    className="bg-gray-300 px-4 py-2 rounded"
                    onClick={() => setIsDropdownOpen(false)} 
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </span>
        </div>
      </nav>
    </div>
  );
};

export default UpperNavMain;
