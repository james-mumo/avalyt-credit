// src/components/TopNav.js
import React from "react";

const TopNav = () => {
  return (
    <div className="bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-lg font-semibold">Dashboard</h1>
      <div>
        {/* Add user profile, notifications, or other top navigation items */}
        <span className="text-gray-600">Welcome, User!</span>
      </div>
    </div>
  );
};

export default TopNav;
