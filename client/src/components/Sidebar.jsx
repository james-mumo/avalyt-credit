// src/components/Sidebar.js
import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 text-white flex flex-col p-4 h-screen">
      <h2 className="text-2xl font-bold mb-4">Avalty</h2>
      <nav className="flex flex-col space-y-2">
        <Link to="/dash" className="hover:bg-gray-700 p-2 rounded">
          Dashboard
        </Link>
        <Link to="/create-loan" className="hover:bg-gray-700 p-2 rounded">
          Loan Packages
        </Link>
        <Link to="/requested-loans" className="hover:bg-gray-700 p-2 rounded">
          New Loans
        </Link>
        <Link to="/active-loans" className="hover:bg-gray-700 p-2 rounded">
          Active Loans
        </Link>
        <Link to="/loan-history" className="hover:bg-gray-700 p-2 rounded">
          Loan History
        </Link>
        <Link to="/payments" className="hover:bg-gray-700 p-2 rounded">
          Payments
        </Link>
        <Link to="/customers" className="hover:bg-gray-700 p-2 rounded">
          View Customers
        </Link>
        <Link to="/profile" className="hover:bg-gray-700 p-2 rounded">
          Profile
        </Link>
        <Link to="/support" className="hover:bg-gray-700 p-2 rounded">
          Support
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
