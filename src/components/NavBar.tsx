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
    <div className="p-2">
      <button
        onClick={handleOrder}
        className=" no-underline hover:underline  rounded bg-rose-600 hover:bg-blue-600 p-2 ml-3 mr-3 mt-3 mb-3"
      >
        <FcCustomerSupport />
        Customer Orders
      </button>
      <button
        onClick={handleCustomer}
        className="no-underline hover:underline rounded bg-rose-600 hover:bg-blue-600 p-2 ml-3 mr-3 mt-3 mb-3"
      >
        <BiMaleFemale />
        Customers
      </button>
      <button
        onClick={handleTransaction}
        className=" no-underline hover:underline rounded bg-green-500 hover:bg-blue-600 p-2 ml-10 mr-3 mt-3 mb-3"
      >
        <FaCreditCard />
        Transactions
      </button>
      <button
        onClick={handlePopUpOpen}
        className=" no-underline hover:underline rounded bg-emerald-500 hover:bg-blue-600 p-2 px-4 ml-3 mr-3 mt-3 mb-3"
      >
        <FaUser />
        Users
      </button>
      {isPopUpVisible && <Modal onClose={handlePopUpClose} />}
      <button
        onClick={handleLogout}
        className="no-underline hover:underline rounded bg-rose-600 hover:bg-blue-600 p-2  px-3 ml-3 mt-3 mb-2"
      >
        <LuLogOut />
        LogOut
      </button>
    </div>
  );
}
