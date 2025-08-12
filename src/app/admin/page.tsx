"use client";
import React, { useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import SaleOverview from "@/components/SaleOverview";
import { FiMenu } from "react-icons/fi";
import { styleText } from "util";

export default function Admin() {
  const [isSideOpen, setIsSideOpen] = useState(false);
  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-200">
      <button
        onClick={() => setIsSideOpen(!isSideOpen)}
        className="md:hidden fixed top-10 left-2 z-50 p-2 bg-rose-600 rounded-lg"
      >
        <FiMenu className="text-xl" />
      </button>
      <div
        className={`${
          isSideOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 fixed md:relative inset-y-0 left-0 z-40 w-64 transition-transform duration-300 ease-in-out`}
      >
        <Sidebar />
      </div>
      <div className=" flex flex-col flex-1 min-h-0">
        <Header />

        <div className="flex-1 overflow-auto p-4">
          <SaleOverview />
        </div>
      </div>
    </div>
  );
}
