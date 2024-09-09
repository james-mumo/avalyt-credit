import React, { useState } from "react";
import axios from "../axiosConfig"; // Import your Axios instance

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/login", formData); // Use the Axios instance
      console.log(response.data);
      // Handle successful login (e.g., save token, redirect user)
    } catch (error) {
      console.error("Login error:", error);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <div className="p-4 bg-gray-700 shadow-md rounded w-full">
      <h2 className="text-xl font-bold mb-4 text-blue">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
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
          className="w-full py-2 bg-blue text-white rounded hover:bg-blue-dark"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
