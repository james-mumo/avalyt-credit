// src/components/Signup.js
import React, { useState } from "react";
import axiosInstance from "../axiosConfig";

function Signup() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    IDNumber: "",
    phoneNumber: "",
    dateOfBirth: "",
    gender: "",
    password: "",
    residentialArea: "",
    sourceOfIncome: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Directly send the formData
      const response = await axiosInstance.post("/users", formData);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-4 bg-gray-700 shadow-md rounded w-full">
      <h2 className="text-xl font-bold mb-4 text-blue">Sign Up</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="text"
          name="IDNumber"
          placeholder="ID Number"
          value={formData.IDNumber}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="tel"
          name="phoneNumber"
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="date"
          name="dateOfBirth"
          placeholder="Date of Birth"
          value={formData.dateOfBirth}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <select
          name="residentialArea"
          value={formData.residentialArea}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        >
          <option value="">Select Residential Area</option>
          <option value="Westlands">Westlands</option>
          <option value="Kilimani">Kilimani</option>
          <option value="Karen">Karen</option>
          <option value="Lang'ata">Lang'ata</option>
          <option value="Eastleigh">Eastleigh</option>
          <option value="Runda">Runda</option>
          <option value="South C">South C</option>
          <option value="South B">South B</option>
          <option value="Ngong Road">Ngong Road</option>
          <option value="Ngong Road">Embakasi</option>
          <option value="Ngong Road">Utawala</option>
          <option value="Ngong Road">Makadara</option>
          <option value="Ngong Road">Jogoo Road</option>
          <option value="CBD">CBD</option>
        </select>
        <select
          name="sourceOfIncome"
          value={formData.sourceOfIncome}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        >
          <option value="">Select Source of Income</option>
          <option value="Employment">Employment</option>
          <option value="Business">Business</option>
        </select>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <button
          type="submit"
          className="w-full py-2 bg-green-400 text-white rounded hover:bg-green-500"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default Signup;
