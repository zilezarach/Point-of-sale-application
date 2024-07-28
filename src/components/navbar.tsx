import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import AddProductForm from "./AddProductForm";
import { AiOutlineProduct } from "react-icons/ai";
import { FcCustomerSupport } from "react-icons/fc";
import { FcSettings } from "react-icons/fc";
import { FaCreditCard } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";

export default function navbar() {
  return (
    <div>
      <button
        onClick={AddProductForm}
        className="no-underline hover:underline  rounded bg-green-500 hover:bg-blue-600 p-2 ml-3 mr-3 mt-3 mb-3"
      >
        <AiOutlineProduct />
        Add Products
      </button>
      <button className=" no-underline hover:underline  rounded bg-rose-600 hover:bg-blue-600 p-2 ml-3 mr-3 mt-3 mb-3">
        <FcCustomerSupport />
        Customer Orders
      </button>
      <button className=" no-underline hover:underline rounded bg-green-500 hover:bg-blue-600 p-2 ml-128 mr-3 mt-3 mb-3">
        <FcSettings />
      </button>
      <button className=" no-underline hover:underline rounded bg-green-500 hover:bg-blue-600 p-2 ml-10 mr-3 mt-3 mb-3">
        <FaCreditCard />
        Transactions
      </button>
      <button className=" no-underline hover:underline rounded bg-emerald-500 hover:bg-blue-600 p-2 px-4 ml-3 mr-3 mt-3 mb-3">
        <FaUser />
        Users
      </button>
      <button className="no-underline hover:underline rounded bg-rose-600 hover:bg-blue-600 p-2 py-3 px-3 ml-128 mt-3 mb-2">
        <LuLogOut />
        LogOut
      </button>
    </div>
  );
}
