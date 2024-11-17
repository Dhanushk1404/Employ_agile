import axios from "axios";
import React, { useEffect, useState } from "react";

const LeaveContent = () => {
  const token = localStorage.getItem("token");
  const organizationDetails = JSON.parse(
    localStorage.getItem("organizationDetails")
  );
  const companyEmail =
    organizationDetails?.organizationDetails?.organization?.contactEmail;

  const [leavedata, setleavedata] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      if (!companyEmail) return;

      try {
        const response = await axios.get(
          `http://localhost:5000/tango/leave/${companyEmail}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setleavedata(response.data.leavedata);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching leave data:", error);
      }
    }

    fetchData();
  }, [companyEmail, token]);

  console.log("leavecontent", leavedata);

  return (
    <main>
      <div className="h-screen flex flex-col items-center justify-center pt-[70vh] px-4 overflow-scroll  pb-[40vh]">
        <div className="max-w-4xl w-full rounded-lg shadow-lg p-6">
          <h1 className="text-4xl font-bold text-center text-teal-700 mb-8">
            Leave Records
          </h1>

      
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr className="bg-teal-200 text-teal-700">
                  <th className="px-4 py-2 border">Employee ID</th>
                  <th className="px-4 py-2 border">Name</th>
                  <th className="px-4 py-2 border">Leave Type</th>
                  <th className="px-4 py-2 border">Email</th>
                  <th className="px-4 py-2 border">Leave Date</th>
                </tr>
              </thead>
              <tbody>
                {leavedata.map((data, index) => (
                  <tr key={index} className="bg-teal-50">
                    <td className="px-4 py-2 border">{data.employeeId}</td>
                    <td className="px-4 py-2 border">{data.firstName}</td>
                    <td className="px-4 py-2 border">{data.leaveType}</td>
                    <td className="px-4 py-2 border">{data.email}</td>
                    <td className="px-4 py-2 border">
                      {new Date(data.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-teal-100 p-6 rounded-lg shadow-md mt-8">
            <h2 className="text-3xl font-semibold text-teal-600 mb-4">
              Upcoming Holidays
            </h2>
            <p className="text-lg text-gray-600 mb-4">
              Our upcoming holidays for the year 2024:
            </p>
            <ul className="space-y-4">
              <li className="flex justify-between items-center border-b pb-4">
                <span className="text-xl font-medium">
                  Christmas - December 25, 2024
                </span>
                <span className="text-sm text-gray-500">1 day</span>
              </li>
              <li className="flex justify-between items-center border-b pb-4">
                <span className="text-xl font-medium">
                  New Year's Day - January 1, 2025
                </span>
                <span className="text-sm text-gray-500">1 day</span>
              </li>
              <li className="flex justify-between items-center pb-4">
                <span className="text-xl font-medium">
                  Republic Day - January 26, 2025
                </span>
                <span className="text-sm text-gray-500">1 day</span>
              </li>
            </ul>
          </div>

          <div className="bg-teal-100 p-6 rounded-lg shadow-md mt-8">
            <h2 className="text-3xl font-semibold text-teal-600 mb-4">
              Leave Policy
            </h2>
            <p className="text-lg text-gray-600 mb-4">
              At our company, we encourage work-life balance. Our leave policy
              is designed to ensure employees have time for rest and personal
              commitments.
            </p>
            <ul className="space-y-4 text-lg text-gray-600 pb-20">
              <li>
                <strong>Casual Leave (CL):</strong> 12 days per year.
              </li>
              <li>
                <strong>Medical Leave (ML):</strong> 10 days per year.
              </li>
              <li>
                <strong>Annual Leave (AL):</strong> 20 days per year.
              </li>
              <li>
                <strong>Public Holidays:</strong> Observed as per the company
                calendar.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LeaveContent;
