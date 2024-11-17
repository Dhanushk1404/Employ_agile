import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

const MainAttendence = () => {
  const token = localStorage.getItem("token");
  const organizationDetails = JSON.parse(localStorage.getItem("organizationDetails"));
  const companyMail = organizationDetails.organizationDetails.organization.contactEmail;

  const [employeedata, setemployeedata] = useState([]);
  const [groupedData, setGroupedData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployeeData = async () => {
      if (!companyMail) return;

      try {
        const response = await axios.get(
          `http://localhost:5000/tango/fetchdata/${companyMail}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setemployeedata(response.data.employees);
      } catch (error) {
        console.log(error);
      }
    };

    fetchEmployeeData();
  }, [companyMail, token]);

  useEffect(() => {
    const groupByDate = () => {
      const grouped = {};
      employeedata.forEach((employee) => {
        const date = new Date(employee.lastLoginAt).toLocaleDateString(); 
        if (!grouped[date]) {
          grouped[date] = [];
        }
        grouped[date].push(employee);
      });
      setGroupedData(grouped);
    };

    if (employeedata.length > 0) {
      groupByDate();
    }
  }, [employeedata]);

  function handledata(data) {
    navigate('/homepage/profile', { state: data });  
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {Object.keys(groupedData).map((date) => (
          <div key={date}>
            <h2 className="text-2xl font-semibold text-teal-700 mb-4">{date}</h2>
            <div className="space-y-4">
              {groupedData[date].map((data, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between bg-white rounded-lg shadow-lg p-4 ${data.checkinStatus ? 'border-l-4 border-green-500' : 'border-l-4 border-red-500'}`}
                  onClick={() => handledata(data)}
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={`http://localhost:5000/${data.profilePhoto}`}
                      alt={`${data.firstName}'s profile`}
                      className="w-12 h-12 rounded-full"
                      
                    />
                    <div>
                      <h2 className="text-xl font-semibold text-gray-800">{data.firstName} {data.lastName}</h2>
                      <p className="text-sm text-gray-500">Employee ID: {data.employeeId}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`text-lg font-semibold ${data.checkinStatus ? 'text-green-500' : 'text-red-500'}`}
                    >
                      {data.checkinStatus ? 'Present' : 'Absent'}
                    </p>
                    <p className="text-sm text-gray-500">{new Date(data.lastLoginAt).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainAttendence;
