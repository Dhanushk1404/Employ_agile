import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLocationDetails } from "../../redux/store";

const Location = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    locationName: "",
    mailAlias: "",
    description: "",
    address: "",
    country: "",
    state: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.locationName)
      newErrors.locationName = "Location Name is required";
    if (!formData.mailAlias) newErrors.mailAlias = "Mail Alias is required";
    if (!formData.description)
      newErrors.description = "Description is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.country) newErrors.country = "Country is required";
    if (!formData.state) newErrors.state = "State is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm) {
      console.log(formData);
      dispatch(setLocationDetails(formData));
      navigate("/companycreate/departments");
      setFormData({
        name: "",
        mailAlias: "",
        description: "",
        address: "",
        country: "",
        state: "",
      });
    }
  };

  return (
    <div className="font-poppins p-5">
      <h1 className="text-2xl font-bold mb-5">Location Details</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-10">
          <div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="locationName"
              >
                Location Name
              </label>
              <input
                type="text"
                id="locationName"
                name="locationName"
                onChange={handleChange}
                className="mt-1 block w-96 border-2 border-gray-300 rounded-md p-2"
              />
              {errors.locationName && (
                <p className="text-red-500 text-xs">{errors.locationName}</p>
              )}
            </div>

            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="mailAlias"
              >
                Mail Alias
              </label>
              <input
                type="email"
                id="mailAlias"
                name="mailAlias"
                onChange={handleChange}
                className="mt-1 block w-96 border-2 border-gray-300 rounded-md p-2"
              />
              {errors.mailAlias && (
                <p className="text-red-500 text-xs">{errors.mailAlias}</p>
              )}
            </div>

            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                onChange={handleChange}
                className="mt-1 block w-96 border-2 border-gray-300 rounded-md p-2"
                rows="4"
              />
              {errors.description && (
                <p className="text-red-500 text-xs">{errors.description}</p>
              )}
            </div>
          </div>

          <div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="address"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                onChange={handleChange}
                className="mt-1 block w-96 border-2 border-gray-300 rounded-md p-2"
              />
              {errors.address && (
                <p className="text-red-500 text-xs">{errors.address}</p>
              )}
            </div>

            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="country"
              >
                Country
              </label>
              <input
                type="text"
                id="country"
                name="country"
                onChange={handleChange}
                className="mt-1 block w-96 border-2 border-gray-300 rounded-md p-2"
              />
              {errors.country && (
                <p className="text-red-500 text-xs">{errors.country}</p>
              )}
            </div>

            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="state"
              >
                State
              </label>
              <input
                type="text"
                id="state"
                name="state"
                onChange={handleChange}
                className="mt-1 block w-96 border-2 border-gray-300 rounded-md p-2"
              />
              {errors.state && (
                <p className="text-red-500 text-xs">{errors.state}</p>
              )}
            </div>
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="w-96 bg-black text-white font-semibold py-2 rounded-md  transition duration-200"
          >
            Save and Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default Location;
