"use client";
import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { LuLogOut } from "react-icons/lu";
import { navItems } from "./config/navConfig";
import Spinner from "./Spinner";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/");
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  const handleNavClick = (route: any) => {
    setLoading(true);
    router.push(route);
    setTimeout(() => setLoading(false), 500);
  };

  return (
    <div className="h-full bg-gray-300 text-white p-4 rounded shadow-sm flex flex-col">
      {loading && <Spinner />}
      <h2 className="text-xl md:text-2xl font-bold text-rose-500 mb-6">
        Zacc Management
      </h2>

      <div className="flex flex-col gap-2 flex-1">
        {navItems.map(({ label, icon: Icon, route }) => (
          <button
            key={label}
            onClick={() => handleNavClick(route)}
            disabled={loading}
            className={`flex items-center gap-2 p-3 rounded transition-colors ${
              pathname === route
                ? "bg-rose-600 text-white"
                : "bg-rose-500 hover:bg-indigo-600 text-white"
            }`}
          >
            <Icon className="text-xl flex-shrink-0" />
            {label}
          </button>
        ))}
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 p-3 bg-rose-600 hover:bg-rose-700 text-white rounded-lg transition-colors mt-4"
      >
        <LuLogOut className="text-xl" />
        <span>Logout</span>
      </button>
    </div>
  );
}
