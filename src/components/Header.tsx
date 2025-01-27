"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { LuLogOut } from "react-icons/lu";

const Header = () => {
  const router = useRouter();

  const handleLogout = () => {
    router.push("/");
  };

  return (
    <div className="bg-gray-300 md:p-4 flex justify-between items-center">
      <h1 className="font-bold text-rose-500 md:text-xl text-base truncate items-center flex justify-center">
        <span className="hidden md:inline"> Welcome to </span>
        Admin dashboard
      </h1>
      <button
        onClick={handleLogout}
        className="bg-rose-500 text-white p-2 flex items-center rounded-lg hover:bg-blue-500 transition-colors md:px-3 md:py-2 gap-1"
      >
        <LuLogOut className="text-lg" />
        <span className="text-sm md:text-base">Logout</span>
      </button>
    </div>
  );
};

export default Header;
