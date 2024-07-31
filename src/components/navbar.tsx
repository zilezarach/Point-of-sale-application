import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AiOutlineProduct } from "react-icons/ai";
import { FcCustomerSupport } from "react-icons/fc";
import { FcSettings } from "react-icons/fc";
import { FaCreditCard } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import { BiMaleFemale } from "react-icons/bi";

export default function navbar() {
  const router = useRouter();
  const handleTransaction = () => {
    router.push("/Transactions")
  }

  return (
    <div className="p-2">
      <button className=" no-underline hover:underline  rounded bg-rose-600 hover:bg-blue-600 p-2 ml-3 mr-3 mt-3 mb-3">
        <FcCustomerSupport />
        Customer Orders
      </button>
      <button className="no-underline hover:underline rounded bg-rose-600 hover:bg-blue-600 p-2 ml-3 mr-3 mt-3 mb-3"><BiMaleFemale />
        Customers
      </button>
      <button className=" no-underline hover:underline rounded bg-green-500 hover:bg-blue-600 p-2 ml-128 mr-3 mt-3 mb-3">
        <FcSettings />
      </button>
      <button onClick={handleTransaction} className=" no-underline hover:underline rounded bg-green-500 hover:bg-blue-600 p-2 ml-10 mr-3 mt-3 mb-3">
        <FaCreditCard />
        Transactions
      </button>
      <button className=" no-underline hover:underline rounded bg-emerald-500 hover:bg-blue-600 p-2 px-4 ml-3 mr-3 mt-3 mb-3">
        <FaUser />
        Users
      </button>
      <button className="no-underline hover:underline rounded bg-rose-600 hover:bg-blue-600 p-2  px-3 ml-3 mt-3 mb-2">
        <LuLogOut />
        LogOut
      </button>
    </div>
  );
}
