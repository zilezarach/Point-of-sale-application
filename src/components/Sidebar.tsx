"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FcManager } from "react-icons/fc";
import { TbShoppingCartDollar } from "react-icons/tb";
import { FcHome } from "react-icons/fc";
import Spinner from "./Spinner";
import dynamic from "next/dynamic";

const Sidebar = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleproduct = async () => {
    setLoading(true);
    router.push("/admin/productMan");
  };
  const handleEmployee = async () => {
    setLoading(true);
    router.push("/admin/employeeMan");
  };
  const handleHome = async () => {
    setLoading(true);
    router.push("/admin");
  };
  return (
    <div className="h-full bg-gray-300 text-white p-4 rounded shadow-sm flex flex-col">
      {loading && <Spinner />}
      <div className="flex items-center gap-2 mb-4 md:mb-6 p-2">
        <h2 className=" text-xl md:text-2xl font-bold text-rose-500 mb-6 no-underline hover:underline">
          Zacc Management.
          <Image
            src="/logo2.png"
            alt=""
            width={50}
            height={50}
            className=" no-underline hover:underline"
          />
        </h2>
      </div>
      <div className="flex flex-col gap-2 flex-1">
        <button
          onClick={handleHome}
          disabled={loading}
          className="flex items-center rounded bg-rose-600 text-white hover:bg-indigo-600 w-full p-2 md:p-3"
        >
          <FcHome className="text-xl flex-shrink-0" />
          Home
        </button>
        <button
          onClick={handleproduct}
          className=" flex items-center w-full md:p-3 rounded bg-rose-600 text-white p-3 hover:bg-indigo-600"
          disabled={loading}
        >
          <TbShoppingCartDollar className="text-xl flex-shrink-0" />
          Product Management
        </button>
        <button
          onClick={handleEmployee}
          className=" flex items-center w-full md:p-3 rounded bg-rose-600 text-white p-3 hover:bg-indigo-600"
          disabled={loading}
        >
          <FcManager className="text-xl flex-shrink-0" />
          Employee Management.
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
