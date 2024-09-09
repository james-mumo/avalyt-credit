// src/components/ViewCustomers.js
import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosConfig"; // Import the Axios instance

function ViewCustomers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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

  useEffect(() => {
    // Function to fetch users
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get("/users"); // Use axiosInstance here
        setUsers(response.data);
      } catch (err) {
        setError("Error fetching users");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []); // Empty dependency array means this effect runs once on component mount

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Directly send the formData
      const response = await axiosInstance.post("/users", formData);
      console.log(response.data);
      // Refresh the user list after adding a new user
      const updatedResponse = await axiosInstance.get("/users");
      setUsers(updatedResponse.data);
      // Reset form data
      setFormData({
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
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Customer List</h1>
      {/* Customer List Table */}
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border">First Name</th>
            <th className="py-2 px-4 border">Last Name</th>
            <th className="py-2 px-4 border">ID Number</th>
            <th className="py-2 px-4 border">Phone Number</th>
            <th className="py-2 px-4 border">Date of Birth</th>
            <th className="py-2 px-4 border">Gender</th>
            <th className="py-2 px-4 border">Residential Area</th>
            <th className="py-2 px-4 border">Source of Income</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.IDNumber}>
              <td className="py-2 px-4 border">{user.firstName}</td>
              <td className="py-2 px-4 border">{user.lastName}</td>
              <td className="py-2 px-4 border">{user.IDNumber}</td>
              <td className="py-2 px-4 border">{user.phoneNumber}</td>
              <td className="py-2 px-4 border">
                {new Date(user.dateOfBirth).toLocaleDateString()}
              </td>
              <td className="py-2 px-4 border">{user.gender}</td>
              <td className="py-2 px-4 border">{user.residentialArea}</td>
              <td className="py-2 px-4 border">{user.sourceOfIncome}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Add User Form */}
      <div className="p-4 bg-gray-700 shadow-md rounded w-full mb-6">
        <h2 className="text-xl font-bold mb-4 text-blue-500">
          Add New Customer
        </h2>
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
            <option value="Embakasi">Embakasi</option>
            <option value="Utawala">Utawala</option>
            <option value="Makadara">Makadara</option>
            <option value="Jogoo Road">Jogoo Road</option>
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
            Add Customer
          </button>
        </form>
      </div>
    </div>
  );
}

export default ViewCustomers;
