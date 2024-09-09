// src/components/SharedLayout.js
import React from "react";
import { Outlet } from "react-router-dom"; // Renders nested routes
import TopNav from "./TopNav";
import Sidebar from "./Sidebar";

function SharedLayout() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <TopNav />
        <main className="flex-1 p-4 bg-gray-100 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default SharedLayout;
