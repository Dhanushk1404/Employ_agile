import React from "react";
import { Link, Outlet } from "react-router-dom";
import { MdHome, MdOutlineTimeToLeave, MdCoPresent } from "react-icons/md";
import { FaHandshake, FaCircleRadiation } from "react-icons/fa6";
import FooterMainlower from "./FooterMainlower";
import { VscReport } from "react-icons/vsc";

const HomeSidebar = () => {
  const menuItems = [
    { name: "Home", icon: <MdHome className="text-2xl" />, path: "/homepage" },
    { name: "Onboard", icon: <FaHandshake className="text-2xl" />, path: "/homepage/onboard" },
    { name: "Leave", icon: <MdOutlineTimeToLeave className="text-2xl" />, path: "/homepage/leavecontent" },
    { name: "Attendance", icon: <MdCoPresent className="text-2xl" />, path: "/homepage/attendance" },

  ];

  return (
    <div className="flex">
      
      <aside className="bg-blue-950 w-20 mt-10 h-screen fixed flex flex-col items-center py-6 space-y-6 ">
        {menuItems.map((item, index) => (
          <Link to={item.path} key={index}>
            <li className="text-white text-sm bg-blue-900 w-16 h-14 flex flex-col items-center justify-center rounded-lg shadow-lg hover:bg-blue-700 transition-colors duration-300 cursor-pointer">
              {item.icon}
              <span className="text-xs mt-1 text-center">{item.name}</span>
            </li>
          </Link>
        ))}

      </aside>



      <div className="ml-20 flex-grow  ">
        <Outlet />
      </div>
    </div>
  );
};

export default HomeSidebar;
