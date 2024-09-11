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
    <div className="h-full bg-gray-300 text-white p-4 rounded shadow-sm">
      {loading && <Spinner />}
      <h2 className=" text-2xl font-bold text-rose-500 mb-6 no-underline hover:underline">
        Zacc Management.
        <Image
          src="/logo2.png"
          alt=""
          width={50}
          height={50}
          className=" no-underline hover:underline"
        />
      </h2>
      <div className="mb-5">
        <button
          onClick={handleHome}
          disabled={loading}
          className="rounded bg-rose-600 text-white p-3 hover:bg-indigo-600"
        >
          <FcHome />
          Home
        </button>
      </div>
      <div className="mb-5">
        <button
          onClick={handleproduct}
          className=" rounded bg-rose-600 text-white p-3 hover:bg-indigo-600"
          disabled={loading}
        >
          <TbShoppingCartDollar />
          Product Management
        </button>
      </div>
      <div className="mb-5">
        <button
          onClick={handleEmployee}
          className="rounded bg-rose-600 text-white p-3 hover:bg-indigo-600"
          disabled={loading}
        >
          <FcManager />
          Employee Management.
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
