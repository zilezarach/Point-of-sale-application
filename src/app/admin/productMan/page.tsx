"use client";

import React, { useState } from "react";

import Sidebar from "@/components/Sidebar";

import AddProduct from "@/components/AddProductForm";

import ProductList from "@/components/ProductList";

import { FiMenu } from "react-icons/fi";

export default function Page() {
  const [productsUpdated, setProductsUpdated] = useState(false);

  const handleProductAdded = () => {
    setProductsUpdated(!productsUpdated);
  };

  const [isSideOpen, setIsSideOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-500">
      <button
        onClick={() => setIsSideOpen(!isSideOpen)}
        className="md:hidden fixed top-2 left-2 z-50 p-2 bg-rose-600 text-white rounded-lg"
      >
        <FiMenu className="text-xl" />
      </button>
      <div
        className={`fixed md:relative inset-y-0 left-0 z-40 w-64 transform ${
          isSideOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <Sidebar />
      </div>
      <div className="flex-1 min-h-screen p-4 md:ml-64 ">
        <AddProduct onProductAdded={handleProductAdded} />
        <ProductList productsUpdated={productsUpdated} />
      </div>
    </div>
  );
}
