import React from "react";
import { Link, Outlet } from "react-router-dom";

const AdminHome = () => {
  return (
    <section>
      <div className="flex-grow  w-full mt-[56px] fixed">
        <nav className="bg-gray-200 p-3">
          <ul className="flex space-x-6 text-gray-700 font-semibold">
            <Link to="/homepage">
              <li >
                Overview
              </li>
            </Link>
            <Link to="/homepage/dasboard">
              <li >
                Dashboard
              </li>
            </Link>
            <Link to="/homepage/calendar" >
              <li>
                Calendar
              </li>
            </Link>
          </ul>
        </nav>
        <div>
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default AdminHome;
