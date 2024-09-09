// src/axiosConfig.js (Create this file for Axios configuration)
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4444/api", // Backend API base URL
});

export default axiosInstance;
