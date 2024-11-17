import React, { useState } from "react";
import earth from "../../../assets/earth.png";
import { LuCalendarClock } from "react-icons/lu";

const Activity = () => {
  const token = localStorage.getItem("token");
  const organizationDetails = JSON.parse(
    localStorage.getItem("organizationDetails")
  );

  console.log(organizationDetails.organizationDetails.organization.logo);
  const logo = organizationDetails.organizationDetails.organization.logo; 
  const weekData = [
    { day: "Sun", date: "03", status: "Weekend" },
    { day: "Mon", date: "04", status: "Absent" },
    { day: "Tue", date: "05", status: "Work", isToday: true },
    { day: "Wed", date: "06", status: "Work" },
    { day: "Thu", date: "07", status: "Work" },
    { day: "Fri", date: "08", status: "Work" },
    { day: "Sat", date: "09", status: "Weekend" },
  ];
  return (
    <div className="h-screen overflow-scroll">
      <main className="bg-white  rounded-lg p-6 flex space-x-16 mt-50 ">
        <div>
          <div className="flex gap-10">
            <div className="">
              <img
                src={`http://localhost:5000${organizationDetails.organizationDetails.organization.logo}`}
                alt=""
                className="w-36 border p-3 rounded-md"
              />
            </div>
            <div className="border-b-2 mb-3 p-2">
              <h1 className="font-poppins font-semibold text-lg">
                Welcome{" "}
                {
                  organizationDetails.organizationDetails.organization
                    .companyName
                }
              </h1>
              <p>Have a produtive day !</p>
            </div>
          </div>
          <div>
            <p className="text-sm pl-48">
              "The function of leadership is to produce more leaders, not more
              followers." - Ralph Nader
            </p>
          </div>
        </div>
        <div>
          <img src={earth} alt="" className="w-36" />
        </div>
      </main>

      <div className="bg-white rounded-lg mt-5">
        <div className="p-6  mx-auto bg-white rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-full">
              <i className="text-blue-600">🗓️</i>
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-semibold">Work Schedule</h2>
              <p className="text-sm text-gray-500">03-Nov-2024 - 09-Nov-2024</p>
            </div>
          </div>

          <div className="mt-6">
            <div className="bg-gray-100 rounded-lg p-4 text-center">
              <p className="text-sm font-medium text-gray-600">General</p>
              <p className="text-lg font-semibold">9:00 AM - 6:00 PM</p>
            </div>
          </div>

          <div className="mt-4 flex justify-between items-center">
            {weekData.map((day, index) => (
              <div key={index} className="text-center">
                <p
                  className={`text-sm ${
                    day.status === "Weekend"
                      ? "text-orange-500"
                      : day.status === "Absent"
                      ? "text-red-500"
                      : "text-gray-500"
                  }`}
                >
                  {day.day}
                </p>
                <div
                  className={`mt-1 w-8 h-8 flex items-center justify-center rounded-full ${
                    day.isToday ? "bg-blue-500 text-white" : "text-black"
                  }`}
                >
                  {day.date}
                </div>
                <p
                  className={`text-xs mt-1 ${
                    day.status === "Weekend"
                      ? "text-orange-500"
                      : day.status === "Absent"
                      ? "text-red-500"
                      : "text-gray-500"
                  }`}
                >
                  {day.status}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-white mt-10  mb-[45vh] rounded-md">
        <div className="flex items-center font-semibold">
          <h1 className="text-4xl p-3 ">
            <LuCalendarClock className="bg-orange-400 p-1 rounded-md text-white" />
          </h1>
          <h2>You are yet to submit your time logs today!</h2>
        </div>
      </div>
    </div>
  );
};

export default Activity;
