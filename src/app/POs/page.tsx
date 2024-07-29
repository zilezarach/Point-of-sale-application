"use client";

import Navbar from "@/components/navbar";

import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
import { MdSendToMobile } from "react-icons/md";
import { HiOutlineCash } from "react-icons/hi";
import { FcCancel } from "react-icons/fc";
import { IoPrintSharp } from "react-icons/io5";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const [scannedItems, setScannedItems] = useState<[]>([]);

  return (
    <div className="bg-gray-300 container-none mx-auto px-4">
      <Navbar />
      <div className="flex">
        <div className=" rounded bg-white shadow-md mt-5 w-1/3 ml-5 mb-5">
          <div className="mb-4 mt-4 ml-4 w-full flex">
            <input
              type="text"
              placeholder="Scan Barcode or type Number"
              className="border rounded border-rose-600 text-black font-bold w-15 shadow-md focus:outline-none p-2"
            />
            <button className=" rounded-r  bg-rose-600 hover:bg-blue-600 p-2.5">
              <FaCheck />
            </button>
          </div>
          <table className=" w-4/5 mb-144 shadow rounded ml-5 mr-2">
            <thead>
              <tr>
                <th className="text-black font-bold p-2 border ">Item</th>
                <th className="text-black font-bold p-2 border ">Qty</th>
                <th className="text-black font-bold p-2 border">Price</th>
              </tr>
            </thead>
            <tbody>
              {scannedItems.map((item, index) => (
                <tr key={index}>
                  <td className="text-black border p-2 font-bold">{ }</td>
                  <td className="text-black border p-2 font-bold">{ }</td>
                  <td className="text-black border p-2 font-bold">{ }</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mb-8">
            <div className="grid grid-cols-2">
              <div className="text-black font-bold ml-3 mb-3">Total Items:</div>
              <div className="text-black font-bold mb-3">Price:</div>
              <div className="text-black font-bold mt-4 ml-3">Discount:
                <input
                  type="number"
                  placeholder="Discount on item"
                  className="border rounded text-black shadow-md focus:outline-none p-2 mb-3 mt-3"
                />
              </div>
              <div className="text-black font-bold mt-4 mb-3">
                Gross Price(Inc Tax):
              </div>
            </div>
          </div>
          <button className="rounded-full bg-green-500 hover:bg-rose-600  ml-3 mb-3 p-2">
            <MdSendToMobile />
            Mobile
          </button>
          <button className="rounded-full bg-blue-600 hover:bg-green-600 ml-8 mb-3 p-2">
            <HiOutlineCash />
            Cash
          </button>
          <button className="rounded-full bg-black hover:bg-cyan-800 ml-10 mb-3 p-2">
            <FcCancel />
            Cancel
          </button>
          <button className="rounded-full bg-yellow-500 hover:bg-teal-900 ml-5 mb-3 p-2">
            <IoPrintSharp />
            Print Reciept
          </button>
        </div>
        <div className=" rounded w-2/3 bg-white shadow-md mt-5 ml-5 mr-4 mb-5">
          <div className="mt-4 mb-4 ml-4 mr-4">
            <input
              type="text"
              placeholder="Search for Product"
              className="border rounded text-black shadow-md focus:outline-none p-2 w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
