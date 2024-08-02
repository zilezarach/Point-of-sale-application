"use client";

import React, { useState } from "react";

import Sidebar from "@/components/Sidebar";

import AddProduct from "@/components/AddProductForm";

import ProductList from "@/components/ProductList";

export default function Page() {
  const [productsUpdated, setProductsUpdated] = useState(false);

  const handleProductAdded = () => {
    setProductsUpdated(!productsUpdated);
  };

  return (
    <div className="flex min-h-screen bg-gray-500">
      <div className="w-1/4">
        <Sidebar />
      </div>
      <div className="w-3/4 p-4">
        <AddProduct onProductAdded={handleProductAdded} />
        <ProductList productsUpdated={productsUpdated} />
      </div>
    </div>
  );
}
