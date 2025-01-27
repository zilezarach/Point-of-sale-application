import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AiOutlineProduct } from "react-icons/ai";
import { FcCustomerSupport } from "react-icons/fc";
import { FcSettings } from "react-icons/fc";
import { FaCreditCard } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import { BiMaleFemale } from "react-icons/bi";
import Modal from "./UserPOP";

export default function Navbar() {
  const router = useRouter();
  const handleTransaction = () => {
    router.push("/Transactions");
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });

      // Redirect to login page or home page after logout
      router.push("/");
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  const [isPopUpVisible, setIsPopUpVisible] = useState(false);

  const handlePopUpOpen = () => {
    setIsPopUpVisible(true);
  };

  const handlePopUpClose = () => {
    setIsPopUpVisible(false);
  };

  const handleOrder = () => {
    router.push("/Orders");
  };

  const handleCustomer = () => {
    router.push("/Customers");
  };
  return (
    <nav className="p-2 bg-white shadow-md">
      <div className="flex flex-col md:flex-row gap-2 items-stretch">
        {/* Main Navigation Items */}
        <div className="flex flex-1 flex-col md:flex-row gap-2">
          <button
            onClick={handleOrder}
            className="flex items-center justify-center gap-2 p-2 bg-rose-100 hover:bg-rose-200 rounded-lg text-black transition-colors"
          >
            <FcCustomerSupport className="text-xl" />
            <span className="text-sm md:text-base">Orders</span>
          </button>

          <button
            onClick={handleCustomer}
            className="flex items-center justify-center gap-2 p-2 bg-rose-100 hover:bg-rose-200 rounded-lg text-black transition-colors"
          >
            <BiMaleFemale className="text-xl" />
            <span className="text-sm md:text-base">Customers</span>
          </button>

          <button
            onClick={handleTransaction}
            className="flex items-center justify-center gap-2 p-2 bg-green-100 hover:bg-green-200 rounded-lg text-black transition-colors"
          >
            <FaCreditCard className="text-xl" />
            <span className="text-sm md:text-base">Transactions</span>
          </button>

          <button
            onClick={() => setIsPopUpVisible(true)}
            className="flex items-center justify-center gap-2 p-2 bg-emerald-100 hover:bg-emerald-200 rounded-lg text-black transition-colors"
          >
            <FaUser className="text-xl" />
            <span className="text-sm md:text-base">Users</span>
          </button>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 p-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg transition-colors"
        >
          <LuLogOut className="text-xl" />
          <span className="text-sm md:text-base">Logout</span>
        </button>
      </div>

      {isPopUpVisible && <Modal onClose={() => setIsPopUpVisible(false)} />}
    </nav>
  );
}
