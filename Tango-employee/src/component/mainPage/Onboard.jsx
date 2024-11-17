import React, { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom'
import axios from "axios";

const Onboard = () => {

  const navigate = useNavigate();
  
  const token = localStorage.getItem("token");
  const organizationDetails = JSON.parse(
    localStorage.getItem("organizationDetails")
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const companyMail =
    organizationDetails.organizationDetails.organization.contactEmail;
  console.log(companyMail);
  

  const [employeedata,setemployeedata] = useState([]);

  const toggleModal = () => {
   navigate('/employeedata',{state : companyMail});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    try {
      await axios.post("http://localhost:5000/tango/employee/add", {
        email,
        companyMail,
      });

      console.log(email);

      toggleModal();
    } catch (err) {
      setError("Failed to add employee");
    }
  };


  console.log("my email right",companyMail);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      if (!companyMail) return;

      try {
        const response = await axios.get(`http://localhost:5000/tango/fetchdata/${companyMail}`);
        setemployeedata(response.data.employees);
      } catch (error) {
        console.log(error);
      }
    };

    fetchEmployeeData();
  }, [companyMail]);
  

  console.log(employeedata);


  function handleSend(data){
    console.log(data);
    navigate('/homepage/profile',{state : data}); 
  }
  return (
    <div className="px-8 py-4">
      <div className="flex ">
        <button
          onClick={toggleModal}
          className="bg-black text-white px-4 py-2 rounded  transition"
        >
          Add Employee
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-96 p-6 rounded shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Add Employee
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded mt-1 focus:outline-none focus:border-blue-500"
                  placeholder="Enter employee's email"
                />
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={toggleModal}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

<div className="overflow-x-scroll w-[160vh] ms-20 mt-10">
  <table className="min-w-full table-auto border-collapse border border-gray-200">
    <thead>
      <tr>
        <th className="px-4 py-2 border-b border-gray-200">Company Mail</th>
        <th className="px-4 py-2 border-b border-gray-200">Profile Photo</th>
        <th className="px-4 py-2 border-b border-gray-200">Employee ID</th>
        <th className="px-4 py-2 border-b border-gray-200">First Name</th>
        <th className="px-4 py-2 border-b border-gray-200">Last Name</th>
        <th className="px-4 py-2 border-b border-gray-200">Designation</th>
        <th className="px-4 py-2 border-b border-gray-200">Email</th>
        <th className="px-4 py-2 border-b border-gray-200">Phone Number</th>
      </tr>
    </thead>
    <tbody>
      {employeedata.map((data, index) => (
        <tr key={index} className="hover:bg-gray-100"  onClick={()=>handleSend(data)}>
          <td className="px-4 py-2 border-b border-gray-200">{data.companyMail}</td>
          <td className="px-4 py-2 border-b border-gray-200">
            <img src={`http://localhost:5000/${data.profilePhoto}`} alt="" className="w-24" />

            </td>
          <td className="px-4 py-2 border-b border-gray-200">{data.employeeId}</td>
          <td className="px-4 py-2 border-b border-gray-200">{data.firstName}</td>
          <td className="px-4 py-2 border-b border-gray-200">{data.lastName}</td>
          <td className="px-4 py-2 border-b border-gray-200">{data.designation}</td>
          <td className="px-4 py-2 border-b border-gray-200">{data.email}</td>
          <td className="px-4 py-2 border-b border-gray-200">{data.phoneNumber}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

    </div>
  );
};

export default Onboard;
