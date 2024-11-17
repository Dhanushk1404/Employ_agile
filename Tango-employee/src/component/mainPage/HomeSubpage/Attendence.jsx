import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Attendence = () => {
  const token = localStorage.getItem("token");
  const organizationDetails = JSON.parse(
    localStorage.getItem("organizationDetails")
  );

  const companyMail =
    organizationDetails.organizationDetails.organization.contactEmail;
  const [employeedata, setemployeedata] = useState([]);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      if (!companyMail) return;

      try {
        const response = await axios.get(
          `http://localhost:5000/tango/fetchdata/${companyMail}`
        );
        setemployeedata(response.data.employees);
      } catch (error) {
        console.log(error);
      }
    };

    fetchEmployeeData();
  }, [companyMail]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl  mb-4 font-poppins">Employee Check In Status</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b font-semibold text-gray-600">Photo</th>
              <th className="py-2 px-4 border-b font-semibold text-gray-600">Emp Id</th>
              <th className="py-2 px-4 border-b font-semibold text-gray-600">Name</th>
              <th className="py-2 px-4 border-b font-semibold text-gray-600">Check-in Status</th>
              <th className="py-2 px-4 border-b font-semibold text-gray-600">Last Login Time</th>
            </tr>
          </thead>
          <tbody>
  {employeedata.map((data, index) => {
    const lastLoginTime = new Date(data.lastLoginAt).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });

    return (
      <tr key={index} className="hover:bg-gray-100">
        <td className="py-2 px-4 border-b text-center">
          <img
            src={`http://localhost:5000/${data.profilePhoto}`}
            alt={`${data.firstName}'s profile`}
            className="w-12 h-12 rounded-full mx-auto"
          />
        </td>
        
        <td className="py-2 px-4 border-b text-center">{data.employeeId}</td>
        <td className="py-2 px-4 border-b text-center">{data.firstName}</td>
        <td
          className={`py-2 px-4 border-b text-center ${
            data.checkinStatus ? 'text-green-500' : 'text-red-500'
          }`}
        >
          {data.checkinStatus ? "Checked In" : "Checked Out"}
        </td>
        <td className="py-2 px-4 border-b text-center">{lastLoginTime}</td>
      </tr>
    );
  })}
</tbody>

        </table>
      </div>
    </div>
  );
};

export default Attendence;
