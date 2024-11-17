// src/components/OrganizationDetails.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setOrganizationDetails } from "../../redux/store";

const OrganizationDetails = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    website: "",
    organizationType: "",
    contactNumber: "",
    contactEmail: "",
    primaryAddress: "",
    password: "",  // Added password field
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.companyName) newErrors.companyName = "Company Name is required";
    if (!formData.website) newErrors.website = "Website is required";
    if (!formData.organizationType) newErrors.organizationType = "Type of Organization is required";
    if (!formData.contactNumber) newErrors.contactNumber = "Contact Number is required";
    if (!formData.contactEmail) newErrors.contactEmail = "Contact Email is required";
    if (!formData.primaryAddress) newErrors.primaryAddress = "Primary Address is required";
    if (!formData.password) newErrors.password = "Password is required"; 
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        console.log(formData);
        dispatch(setOrganizationDetails(formData));
        navigate("/companycreate/locations");
        setFormData({
          companyName: "",
          website: "",
          organizationType: "",
          contactNumber: "",
          contactEmail: "",
          primaryAddress: "",
          password: "",  
        });
      } catch (error) {
        console.error("Failed to submit form:", error);
      }
    }
  };

  return (
    <div className="font-poppins p-5">
      <h1 className="text-2xl font-bold mb-5">Basic Details</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="companyName">
            Company Name
          </label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            className="mt-1 block w-96 border-2 border-gray-300 rounded-md p-2"
          />
          {errors.companyName && <p className="text-red-500 text-xs">{errors.companyName}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="website">
            Website
          </label>
          <input
            type="text"
            id="website"
            name="website"
            value={formData.website}
            onChange={handleChange}
            className="mt-1 block w-96 border-2 border-gray-300 rounded-md p-2"
          />
          {errors.website && <p className="text-red-500 text-xs">{errors.website}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="organizationType">
            Type of Organization
          </label>
          <input
            type="text"
            id="organizationType"
            name="organizationType"
            value={formData.organizationType}
            onChange={handleChange}
            className="mt-1 block w-96 border-2 border-gray-300 rounded-md p-2"
          />
          {errors.organizationType && <p className="text-red-500 text-xs">{errors.organizationType}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="contactNumber">
            Contact Number
          </label>
          <input
            type="text"
            id="contactNumber"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            className="mt-1 block w-96 border-2 border-gray-300 rounded-md p-2"
          />
          {errors.contactNumber && <p className="text-red-500 text-xs">{errors.contactNumber}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="contactEmail">
            Contact Email
          </label>
          <input
            type="email"
            id="contactEmail"
            name="contactEmail"
            value={formData.contactEmail}
            onChange={handleChange}
            className="mt-1 block w-96 border-2 border-gray-300 rounded-md p-2"
          />
          {errors.contactEmail && <p className="text-red-500 text-xs">{errors.contactEmail}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="primaryAddress">
            Primary Address
          </label>
          <input
            type="text"
            id="primaryAddress"
            name="primaryAddress"
            value={formData.primaryAddress}
            onChange={handleChange}
            className="mt-1 block w-96 border-2 border-gray-300 rounded-md p-2"
          />
          {errors.primaryAddress && <p className="text-red-500 text-xs">{errors.primaryAddress}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 block w-96 border-2 border-gray-300 rounded-md p-2"
          />
          {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
        </div>

        <div>
          <button
            type="submit"
            className="w-96 bg-black text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Save and Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default OrganizationDetails;
