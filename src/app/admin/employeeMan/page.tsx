"use client";

import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import AddEmployeeForm from "@/components/AddEmployeeForm";
import { FiMenu } from "react-icons/fi";

export default function Page() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-200">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="md:hidden fixed top-2 left-2 z-50 p-2 bg-rose-600 text-white rounded-lg"
      >
        <FiMenu className="text-xl" />
      </button>

      {/* Sidebar with Mobile Responsive Behavior */}
      <div
        className={`fixed md:relative inset-y-0 left-0 z-40 w-64 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <Sidebar />
      </div>

      {/* Overlay for Mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <div className="flex-1 min-h-screen p-4 md:ml-64">
        <AddEmployeeForm />
      </div>
    </div>
  );
}
