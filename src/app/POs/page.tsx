"use client";

import Navbar from "@/components/NavBar";

import React, { useState, useEffect } from "react";
import { FaCheck } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
import { MdSendToMobile } from "react-icons/md";
import { HiOutlineCash } from "react-icons/hi";
import { FcCancel } from "react-icons/fc";
import { IoPrintSharp } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { fetchExternalImage } from "next/dist/server/image-optimizer";
import { parse } from "postcss";

interface Product {
  id: string;
  barcode: string;
  name: string;
  description: string;
  price: number;
  image: string;
  stock: string;
  qty: number;
}

export default function Page() {
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [barcode, setBarcode] = useState<string>("");
  const [productId, setProductId] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState("");
  const [showReciept, setShowReciept] = useState<string>("");

  const fetchProduct = async (id: string) => {
    try {
      const response = await fetch(`/api/products/${id}`);
      if (!response.ok) throw new Error("Product not found");
      const product = await response.json();
      setProducts((prev) => [...prev, product]);
      setProductId("");
    } catch (error) {
      setError("Product not found");
    }
  };

  const handleAddProduct = () => {
    if (productId) fetchProduct(productId);
  };

  const handlePrint = () => {};

  const handleScan = (event: React.ChangeEvent<HTMLInputElement>) => {
    const id = event.target.value;
    setProductId(id);
    if (id) fetchProduct(id);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (productId) fetchProduct(productId);
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(`/api/products/${searchQuery}`);
      if (!response.ok) {
        throw new Error("Product not found");
      }
      const data = await response.json();
      setProduct(data);
      setError("Product not Found");
    } catch (error) {
      setProduct(null);
    }
  };

  const TAX_RATE = 0.16;
  const calculateGrossPrice = (items: Product[]): number => {
    return items.reduce((total, item) => {
      const price = Number(item.price) || 0;
      const quantity = Number(item.qty) || 1;

      return total + price * quantity;
    }, 0);
  };
  const totalItems = products.length;
  const totalAmount = calculateGrossPrice(products);
  const taxAmount = totalAmount * TAX_RATE;
  const grossPrice = totalAmount + taxAmount;
  const [change, setChange] = useState(null);
  const [paymentType, setPaymentType] = useState<string>("");

  const handlePayment = async () => {
    handlePrint();
  };

  const handleCancel = () => {
    setProducts([]);
  };
  const handleCashPayment = () => {
    const cashGiven = prompt("Enter the cash amount paid:");

    // Handle the case where the prompt returns null (user clicks cancel)
    if (cashGiven === null) {
      alert("Payment canceled.");
      return;
    }

    const cashPaid = parseFloat(cashGiven);

    // Check if cashPaid is a valid number
    if (isNaN(cashPaid)) {
      alert("Invalid input. Please enter a valid number.");
      return;
    }

    if (cashPaid >= grossPrice) {
      const change = cashPaid - grossPrice;
      alert(`Payment successful. Change: ${change.toFixed(2)}`);
      // Proceed with receipt printing
    } else {
      alert(`Insufficient cash. Please pay at least ${grossPrice.toFixed(2)}.`);
    }
  };

  return (
    <div className="bg-gray-300 container-none mx-auto px-4">
      <Navbar />
      <div className="flex">
        <div className=" rounded bg-white shadow-md mt-5 w-1/3 ml-5 mb-5">
          <div className="mb-4 mt-4 ml-4 w-full flex">
            <input
              type="text"
              placeholder="Scan Barcode"
              className="border rounded border-rose-600 text-black font-bold w-15 shadow-md focus:outline-none p-2"
              onChange={handleScan}
              value={productId}
            />
            <button
              onClick={handleAddProduct}
              className=" rounded-r  bg-rose-600 hover:bg-blue-600 p-2.5"
            >
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
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="text-black border p-2 font-bold">
                    {product.name}
                  </td>
                  <td className="text-black border p-2 font-bold">1</td>
                  <td className="text-black border p-2 font-bold">
                    {product.price}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mb-8">
            <div className="grid grid-cols-2">
              <div className="text-black font-bold ml-3 mb-3">
                Total Items:{totalItems}
              </div>
              <div className="text-black font-bold mb-3">
                Price: ${totalAmount.toFixed(2)}
              </div>
              <div className="text-black font-bold mt-4 ml-3">
                Discount:
                <input
                  type="number"
                  placeholder="Discount on item"
                  className="border rounded text-black shadow-md focus:outline-none p-2 mb-3 mt-3"
                />
              </div>
              <div className="text-black font-bold mt-4 mb-3">
                Gross Price(Inc Tax):${grossPrice.toFixed(2)}
              </div>
            </div>
          </div>
          <button
            onClick={() => handlePayment}
            className="rounded-full bg-green-500 hover:bg-rose-600  ml-3 mb-3 p-2"
          >
            <MdSendToMobile />
            Mobile
          </button>

          <button
            onClick={handleCashPayment}
            className="rounded-full bg-blue-600 hover:bg-green-600 ml-8 mb-3 p-2 mr-3"
          >
            <HiOutlineCash />
            Cash
          </button>
          <button
            onClick={handleCancel}
            className="rounded-full bg-black hover:bg-cyan-800 ml-10 mb-3 p-2"
          >
            <FcCancel />
            Cancel
          </button>
          <button
            onClick={handlePrint}
            className="rounded-full bg-yellow-500 hover:bg-teal-900 ml-5 mb-3 p-2"
          >
            <IoPrintSharp />
            Print Reciept
          </button>
        </div>
        <div className=" rounded w-2/3 bg-white shadow-md mt-5 ml-5 mr-4 mb-5">
          <div className="mt-4 mb-4 ml-4 mr-4">
            <input
              onChange={(e) => setSearchQuery(e.target.value)}
              value={searchQuery}
              type="text"
              placeholder="Search for Product"
              className="border rounded text-black shadow-md focus:outline-none p-2 w-96"
            />
            <button
              onClick={handleSearch}
              className="rounded-r bg-rose-600 hover:bg-indigo-600 p-3"
            >
              <FaCheck />
            </button>
          </div>
          {product && (
            <div className="p-4 border rounded-r-none border-rose-600 ml-3 mr-3">
              <h2 className="text-lg mb-2 text-rose-600 font-bold">
                {product.name}
              </h2>
              <p className="font-bold text-black">{product.description}</p>
              <h1 className="text-rose-600 mt-2 mb-2 underline">
                In Stock: {product.stock}
              </h1>
              <p className="text-rose-600 font-bold">Price:{product.price}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
