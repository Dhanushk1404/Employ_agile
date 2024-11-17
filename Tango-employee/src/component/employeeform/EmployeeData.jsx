import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const EmployeeData = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
 
  // const companyMail = queryParams.get("companyMail") || "";
  const companyMail = location.state;



  const [formData, setFormData] = useState({
    companyMail,
    profilePhoto: "",
    employeeId: "",
    firstName: "",
    lastName: "",
    nickname: "",
    email: "",
    mobileNumber: "",
    location: "",
    designation: "",
    experience: "",
    dob: "",
    gender: "",
    maritalStatus: "",
    aboutMe: "",
    phoneNumber: "",
    address: "",
    password:""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, profilePhoto: file });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.profilePhoto)
      newErrors.profilePhoto = "Profile photo is required";
    if (!formData.employeeId) newErrors.employeeId = "Employee ID is required";
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.mobileNumber)
      newErrors.mobileNumber = "Mobile number is required";
    if (!formData.location) newErrors.location = "Location is required";
    if (!formData.designation)
      newErrors.designation = "Designation is required";
    if (!formData.experience) newErrors.experience = "Experience is required";
    if (!formData.dob) newErrors.dob = "Date of birth is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.maritalStatus)
      newErrors.maritalStatus = "Marital status is required";
    if (!formData.phoneNumber)
      newErrors.phoneNumber = "Phone number is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.password) newErrors.password = "password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const formDataToSend = new FormData();
    for (let key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    
    try {
      console.log(formData);
        const res = await axios.post('http://localhost:5000/tango/api/employeedata', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      console.log(res);
      alert("Employee data saved successfully");
      navigate('/homepage');
    } catch (error) {
      console.error("Error saving employee data:", error);
    }
  };

  return (
    <div className="bg-gray-100 p-6">
      <form
        onSubmit={handleSubmit}
        className="space-y-6 max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold text-center">Employee Data Form</h2>

        <div className="space-y-4">
          <label className="block">
            <span className="text-gray-700">Profile Photo</span>
            <input
              type="file"
              name="profilePhoto"
              onChange={handleFileChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
            {errors.profilePhoto && (
              <p className="text-red-500">{errors.profilePhoto}</p>
            )}
          </label>
        </div>

        {/* Personal Information Section */}
        <section className="space-y-4">
          <label className="block">
            <span className="text-gray-700">Employee ID</span>
            <input
              type="text"
              name="employeeId"
              value={formData.employeeId}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
            {errors.employeeId && (
              <p className="text-red-500">{errors.employeeId}</p>
            )}
          </label>

          <label className="block">
            <span className="text-gray-700">First Name</span>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
            {errors.firstName && (
              <p className="text-red-500">{errors.firstName}</p>
            )}
          </label>

          <label className="block">
            <span className="text-gray-700">Last Name</span>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
            {errors.lastName && (
              <p className="text-red-500">{errors.lastName}</p>
            )}
          </label>

          <label className="block">
            <span className="text-gray-700">Nick Name</span>
            <input
              type="text"
              name="nickname"
              value={formData.nickname}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </label>

          <label className="block">
            <span className="text-gray-700">Email</span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
          </label>

          <label className="block">
            <span className="text-gray-700">Mobile Number</span>
            <input
              type="text"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
            {errors.mobileNumber && (
              <p className="text-red-500">{errors.mobileNumber}</p>
            )}
          </label>

          <label className="block">
            <span className="text-gray-700">Location</span>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
            {errors.location && (
              <p className="text-red-500">{errors.location}</p>
            )}
          </label>

          <label className="block">
            <span className="text-gray-700">Designation</span>
            <input
              type="text"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
            {errors.designation && (
              <p className="text-red-500">{errors.designation}</p>
            )}
          </label>

          <label className="block">
            <span className="text-gray-700">Experience</span>
            <input
              type="text"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
            {errors.experience && (
              <p className="text-red-500">{errors.experience}</p>
            )}
          </label>

          <label className="block">
            <span className="text-gray-700">Date of Birth</span>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
            {errors.dob && <p className="text-red-500">{errors.dob}</p>}
          </label>

          <label className="block">
            <span className="text-gray-700">Gender</span>
            <input
              type="text"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
            {errors.gender && <p className="text-red-500">{errors.gender}</p>}
          </label>

          <label className="block">
            <span className="text-gray-700">Marital Status</span>
            <input
              type="text"
              name="maritalStatus"
              value={formData.maritalStatus}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
            {errors.maritalStatus && (
              <p className="text-red-500">{errors.maritalStatus}</p>
            )}
          </label>

          <label className="block">
            <span className="text-gray-700">About Me</span>
            <textarea
              name="aboutMe"
              value={formData.aboutMe}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </label>

          <label className="block">
            <span className="text-gray-700">Phone Number</span>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
            {errors.phoneNumber && (
              <p className="text-red-500">{errors.phoneNumber}</p>
            )}
          </label>

          <label className="block">
            <span className="text-gray-700">Address</span>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
            {errors.address && <p className="text-red-500">{errors.address}</p>}
          </label>

          <label className="block">
            <span className="text-gray-700">password</span>
            <input
              type="text"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
            {errors.password && (
              <p className="text-red-500">{errors.password}</p>
            )}
          </label>


        </section>

        <button
          type="submit"
          className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Submit
        </button>
      </form>
      
    </div>
  );
};

export default EmployeeData;
