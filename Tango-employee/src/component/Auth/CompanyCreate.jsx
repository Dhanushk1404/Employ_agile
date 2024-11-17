import React from "react";
import { Link } from "react-router-dom";
import { MdArrowRight } from "react-icons/md";
import { Outlet } from "react-router-dom";

const CompanyCreate = () => {
  return (
    <div className="font-poppins">
      <section>
        <div className="bg-blue-950 py-3 text-white pl-5">
          <h1 className="text-xl">Account Create</h1>
        </div>

        <div className="flex flex-col md:flex-row mt-10">
          <aside className="w-full md:w-1/4 px-5 mb-5 md:mb-0">
            <ul className="space-y-4 cursor-pointer">
              <Link to="/companycreate">
                <li className="hover:bg-gray-200 w-full p-3 rounded-lg transition duration-200 flex items-center">
                  Organization Details <MdArrowRight className="text-3xl" />
                </li>
              </Link>
              <Link to="/companycreate/locations">
                <li className="hover:bg-gray-200 w-full p-3 rounded-lg transition duration-200 flex items-center">
                  Locations <MdArrowRight className="text-3xl" />
                </li>
              </Link>
              <Link to="/companycreate/departments">
                <li className="hover:bg-gray-200 w-full p-3 rounded-lg transition duration-200 flex items-center">
                  Deparments <MdArrowRight className="text-3xl" />{" "}
                </li>
              </Link>
            </ul>
          </aside>
          {/* Main Content Area */}
          <div className="flex-1 p-5">
            <Outlet />
          </div>
          <div></div>
        </div>
      </section>
    </div>
  );
};

export default CompanyCreate;
