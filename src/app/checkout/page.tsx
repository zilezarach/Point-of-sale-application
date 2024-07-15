"use client"

import React, { useState } from "react";
import { LuFolderSearch } from "react-icons/lu";
import { IoSearchSharp } from "react-icons/io5";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";


export default function Page() {
  const [input, setInput] = useState('')
  const [inputType, setInputType] = useState('')
  const [searchResults, setSearchResults] = useState<[]>([]);
  const [scannedItems, setScannedItems] = useState<[]>([]);
  return (
    <div className="min-h-screen p-6 bg-gray-300 flex">
      <div className="w-1/2">
        <header className="mb-6">
          <h2 className=" text-center font-bold text-xl no-underline hover:underline text-rose-500"><MdOutlineShoppingCartCheckout />Checkout</h2>
        </header>
        <div className="bg-white p-10 rounded shadow-md">
          <div className="mb-4">
            <label className="text-black font-bold ml-3" >
              <input type="radio" checked={inputType === ''} onChange={() => setInputType('')} className="ml-3" />
              Barcode
            </label>
          </div>
          <div className="mb-4">
            <label className="text-black font-bold ml-3">
              <input type="radio" checked={inputType === ''} onChange={() => setInputType('')} className="ml-3" />
              Product number
            </label>
          </div>
          <div className="flex mb-7">
            <input type="text" value={input} onChange={(e) => setInputType(e.target.value)} className="p-2 border rounded w-80" placeholder="Scan or write product number" />
            <button className="bg-gray-500 rounded-r"><IoSearchSharp /></button>
          </div>
          <table className="w-full mb-6 shadow rounded">
            <thead>
              <tr>
                <th className="text-black font-bold p-2 border">Item</th>
                <th className="text-black font-bold p-2 border">Qty</th>
                <th className="text-black font-bold p-2 border">Price</th>
              </tr>
            </thead>
            <tbody>
              {scannedItems.map((item, index) => (
                <tr>
                  <td className="text-black border p-2 font-bold">{ }</td>
                  <td className="text-black border p-2 font-bold">{ }</td>
                  <td className="text-black border p-2 font-bold">{ }</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mb-6">
            <p className="font-bold text-black">Total:</p>
            <p className="font-bold text-black">VAT:</p>
          </div>
        </div>
      </div>
    </div >
  )
}
