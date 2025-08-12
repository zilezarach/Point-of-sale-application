"use client";
import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { LuLogOut } from "react-icons/lu";
import { navItems } from "./config/navConfig";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/");
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  return (
    <nav className="p-2 bg-white shadow-md">
      {/* Mobile Menu Toggle */}
      <div className="flex justify-between items-center md:hidden">
        <h1 className="text-rose-600 font-bold text-lg">Zacc Management</h1>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 bg-rose-100 rounded"
        >
          ☰
        </button>
      </div>

      {/* Menu Items */}
      <div
        className={`flex-col md:flex-row md:flex gap-2 mt-2 md:mt-0 ${
          isMobileMenuOpen ? "flex" : "hidden md:flex"
        }`}
      >
        {navItems.map(({ label, icon: Icon, route }) => (
          <button
            key={label}
            onClick={() => router.push(route)}
            className={`flex items-center gap-2 p-2 rounded-lg transition-colors ${
              pathname === route
                ? "bg-rose-600 text-white"
                : "bg-rose-100 hover:bg-rose-200 text-black"
            }`}
          >
            <Icon className="text-xl" />
            <span>{label}</span>
          </button>
        ))}

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 p-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg transition-colors"
        >
          <LuLogOut className="text-xl" />
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );
}
