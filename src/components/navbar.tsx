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
import modal from "./userPOP";

export default function navbar() {
  const router = useRouter();
  const handleTransaction = () => {
    router.push("/Transactions");
  };

  const handleLogOut = () => {
    router.push("/");
  };

  interface User {
    id: string;
    name: string;
  }

  interface UsersResponse {
    current: User[];
    previous: User[];
  }

  const [isUserPopOpen, SetIsUserPopOpen] = useState<boolean>(false);
  const [users, setUsers] = useState<{ current: User[]; previous: User[] }>({
    current: [],
    previous: [],
  });

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/auth/user");
      if (!response.ok) throw new Error("Network response was not ok");
      const data: UsersResponse = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  const handleButtonClick = () => {
    fetchUsers();
    SetIsUserPopOpen(true);
  };

  const handleOrder = () => {
    router.push("/Orders");
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
      <button className="no-underline hover:underline rounded bg-rose-600 hover:bg-blue-600 p-2 ml-3 mr-3 mt-3 mb-3">
        <BiMaleFemale />
        Customers
      </button>
      <button className=" no-underline hover:underline rounded bg-green-500 hover:bg-blue-600 p-2 ml-128 mr-3 mt-3 mb-3">
        <FcSettings />
      </button>
      <button
        onClick={handleTransaction}
        className=" no-underline hover:underline rounded bg-green-500 hover:bg-blue-600 p-2 ml-10 mr-3 mt-3 mb-3"
      >
        <FaCreditCard />
        Transactions
      </button>
      <button
        onClick={handleButtonClick}
        className=" no-underline hover:underline rounded bg-emerald-500 hover:bg-blue-600 p-2 px-4 ml-3 mr-3 mt-3 mb-3"
      >
        <FaUser />
        Users
      </button>
      <modal
        isOpen={isUserPopOpen}
        onClose={() => SetIsUserPopOpen(true)}
        users={users}
      />
      <button
        onClick={handleLogOut}
        className="no-underline hover:underline rounded bg-rose-600 hover:bg-blue-600 p-2  px-3 ml-3 mt-3 mb-2"
      >
        <LuLogOut />
        LogOut
      </button>
    </div>
  );
}
