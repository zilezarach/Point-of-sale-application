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

interface Product {
  productId: string;
  barcode: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

export default function Page() {
  const router = useRouter();
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [grossPrice, setGrossPrice] = useState<number>(0);
  const [scannedItems, setScannedItems] = useState<Product[]>([]);
  const [product, setProduct] = useState<Product | null>(null);
  const [barcode, setBarcode] = useState<string>('');
  const [productId, setProductId] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [productList, setProductList] = useState<Product[]>([]);

  const fetchProductDetails = async (id: string, type: 'barcode' | 'productId') => {
    const response = await fetch('/api/products/$[id]?type=${type}');
    const productData = await response.json();
    setProduct(productData);
  }

  const handleBarcodeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBarcode(e.target.value);
  }

  const handleProductID = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductId(e.target.value);
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }

  const addToCheckout = () => {
    if (product) {
      const newScannedItem = [...scannedItems, product];
      setScannedItems(newScannedItem);
      const newTotalPrice = newScannedItem.reduce((acc, item) => acc + item.price, 0);
      const newGrossPrice = newTotalPrice * 1.5;

      setTotalPrice(newTotalPrice);
      setGrossPrice(newGrossPrice);
    }
  };

  const handleScan = () => {
    if (barcode) {
      fetchProductDetails(barcode, "barcode").then(addToCheckout);

    } else if (productId) {
      fetchProductDetails(productId, 'productId').then(addToCheckout);
    }
  }

  const resetCheckout = () => {
    setScannedItems([]);
    setTotalPrice(0);
    setGrossPrice(0);
    setProduct(null);
    setBarcode('');
  };

  const handlePayment = (method: string) => {
    const transactionData = {
      items: scannedItems,
      totalPrice,
      grossPrice,
      paymentMethod: method,
      status: 'Completed'
    };
    fetch('api/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(transactionData)
    }).then(response => {
      if (response.ok) {
        alert('Payment Successful with ${method}');
        resetCheckout();
      } else {
        alert('Payment failed. Please try again');
      }
    })

  }

  const handleCancel = () => {
    resetCheckout();
  }

  const fetchProductName = async (name: string) => {
    if (name.trim() === '') {
      setProductList([]);
      return;
    }
    const response = await fetch('api/products?name=${name}');
    const productsData = await response.json()
    setProductList(productsData);
  }

  useEffect(() => {
    fetchProductName(searchQuery);

  }, [searchQuery]);

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
              onChange={handleBarcodeInput}
              value={barcode}
            />
            <button onClick={handleScan} className=" rounded-r  bg-rose-600 hover:bg-blue-600 p-2.5">
              <FaCheck />
            </button>
          </div>
          <div className="ml-4 mt-4 w-full flex mb-4">
            <input
              value={productId}
              onChange={handleProductID}
              placeholder="Enter ProductID"
              type="text"
              className="border rounded border-rose-600 text-black font-bold w-15 shadow-md focus:outline-none p-2"
            />
            <button onClick={handleScan} className="rounded-r bg-rose-600 hover:bg-blue-600 p-2.5"><FaCheck /></button>
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
                  <td className="text-black border p-2 font-bold">{item.name}</td>
                  <td className="text-black border p-2 font-bold">1</td>
                  <td className="text-black border p-2 font-bold">{item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mb-8">
            <div className="grid grid-cols-2">
              <div className="text-black font-bold ml-3 mb-3">Total Items:</div>
              <div className="text-black font-bold mb-3">Price:{totalPrice.toFixed(2)}</div>
              <div className="text-black font-bold mt-4 ml-3">Discount:
                <input
                  type="number"
                  placeholder="Discount on item"
                  className="border rounded text-black shadow-md focus:outline-none p-2 mb-3 mt-3"
                />
              </div>
              <div className="text-black font-bold mt-4 mb-3">
                Gross Price(Inc Tax):{grossPrice.toFixed(2)}
              </div>
            </div>
          </div>
          <button onClick={() => handlePayment('Mobile Money')} className="rounded-full bg-green-500 hover:bg-rose-600  ml-3 mb-3 p-2">
            <MdSendToMobile />
            Mobile
          </button>
          <button onClick={() => handlePayment('Cash')} className="rounded-full bg-blue-600 hover:bg-green-600 ml-8 mb-3 p-2">
            <HiOutlineCash />
            Cash
          </button>
          <button onClick={handleCancel} className="rounded-full bg-black hover:bg-cyan-800 ml-10 mb-3 p-2">
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
              onChange={handleSearch}
              value={searchQuery}
              type="text"
              placeholder="Search for Product"
              className="border rounded text-black shadow-md focus:outline-none p-2 w-full"
            />
          </div>
          {product && (
            <div className="p-4 border rounded">
              <h2 className="text-lg mb-2">{product.name}</h2>
              <p>{product.description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
