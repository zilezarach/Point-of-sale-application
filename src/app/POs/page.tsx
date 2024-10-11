"use client";

import Navbar from "@/components/NavBar";
import React, { useState, useRef } from "react";
import { FaCheck } from "react-icons/fa";
import { MdSendToMobile } from "react-icons/md";
import { HiOutlineCash } from "react-icons/hi";
import { FcCancel } from "react-icons/fc";
import { IoPrintSharp } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { useReactToPrint } from "react-to-print";

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
const Receipt = React.forwardRef(({ products, totalAmount, grossPrice }: { products: Product[], totalAmount: number, grossPrice: number }, ref: any) => (
  <div ref={ref} className="receipt p-4 border rounded border-gray-600">
    <h1 className="text-2xl font-bold">Receipt</h1>
    <h2 className="text-lg font-semibold mt-2">Items Purchased:</h2>
    {products.map((product) => (
      <div key={product.id} className="flex justify-between">
        <p>{product.name} - ${product.price.toFixed(2)} x {product.qty}</p>
      </div>
    ))}
    <h2 className="text-lg font-semibold mt-2">Total Amount: ${totalAmount.toFixed(2)}</h2>
    <h2 className="text-lg font-semibold">Gross Price (Inc Tax): ${grossPrice.toFixed(2)}</h2>
  </div>
));

export default function Page() {
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [productId, setProductId] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [receiptData, setReceiptData] = useState<any>(null);
  const receiptRef = useRef<HTMLDivElement | null>(null); // Ref for printing the receipt
  const TAX_RATE = 0.16;

  // Fetch product details by ID
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

  const handleScan = (event: React.ChangeEvent<HTMLInputElement>) => {
    const id = event.target.value;
    setProductId(id);
    if (id) fetchProduct(id);
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(`/api/products/${searchQuery}`);
      if (!response.ok) throw new Error("Product not found");
      const data = await response.json();
      setProduct(data);
      setError(null);
    } catch (error) {
      setProduct(null);
      setError("Product not found");
    }
  };

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

  const handleCancel = () => {
    setProducts([]);
    setError(null);
  };

  // Update product stock after transaction
  const updateStock = async (productId: string, qty: number): Promise<void> => {
    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ qty }),
      });

      if (!response.ok) throw new Error("Failed to update product stock");
      console.log("Product stock updated");
    } catch (error) {
      console.error("Error updating product stock:", error);
    }
  };

  // Save the transaction to the server
  const saveTransaction = async (transaction: any) => {
    try {
      const response = await fetch("/api/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transaction),
      });
      const data = await response.json();

      if (response.ok) {
        alert("Transaction saved successfully!");
      } else {
        alert(data.error || "Failed to save transaction");
      }
    } catch (error) {
      console.error("Error saving transaction:", error);
    }
  };

  // Cash payment handler
  const handleCashPayment = async () => {
    const cashGiven = prompt("Enter the cash amount paid:");

    if (cashGiven === null) {
      alert("Payment canceled.");
      return;
    }

    const cashPaid = parseFloat(cashGiven);

    if (isNaN(cashPaid)) {
      alert("Invalid input. Please enter a valid number.");
      return;
    }

    if (cashPaid >= grossPrice) {
      const change = cashPaid - grossPrice;
      alert(`Payment successful. Change: ${change.toFixed(2)}`);

      // Generate transaction data
      const transaction = {
        date: new Date().toISOString(),
        amount: totalAmount,
        paymentMethod: "Cash",
        productInfo: products.map((product) => product.name).join(","),
      };

      // Save the transaction
      await saveTransaction(transaction);

      // Update stock for each product sold
      products.forEach(async (product) => {
        await updateStock(product.id, product.qty);
      });

      // Generate the receipt data
      setReceiptData({
        date: new Date().toLocaleString(),
        items: products,
        totalAmount,
        taxAmount,
        grossPrice,
        paymentMethod: "Cash",
        cashPaid,
        change,
      });

      // Clear products after saving the transaction
      setProducts([]);
      setError(null);
    } else {
      alert(`Insufficient cash. Please pay at least ${grossPrice.toFixed(2)}.`);
    }
  };

  // Mobile payment handler
  const handleMobilePayment = async () => {
    alert("Mobile payment successful.");

    const transaction = {
      date: new Date().toISOString(),
      amount: totalAmount,
      paymentMethod: "Mobile",
      productInfo: products.map((product) => product.name).join(","),
    };

    // Save the transaction
    await saveTransaction(transaction);

    // Update stock for each product sold
    products.forEach(async (product) => {
      await updateStock(product.id, product.qty);
    });

    // Generate the receipt data
    setReceiptData({
      date: new Date().toLocaleString(),
      items: products,
      totalAmount,
      taxAmount,
      grossPrice,
      paymentMethod: "Mobile",
    });

    // Clear products after saving the transaction
    setProducts([]);
    setError(null);
  };

  // Print receipt function using react-to-print
  const handlePrint = useReactToPrint({

    documentTitle: 'Receipt',
    onAfterPrint: () => alert('Print successful')

  });

  return (
    <div className="bg-gray-300 container-none mx-auto px-4">
      <Navbar />
      <div className="flex">
        <div className="rounded bg-white shadow-md mt-5 w-1/3 ml-5 mb-5">
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
              className="rounded-r bg-rose-600 hover:bg-blue-600 p-2.5"
            >
              <FaCheck />
            </button>
          </div>
          <table className="w-4/5 mb-144 shadow rounded ml-5 mr-2">
            <thead>
              <tr>
                <th className="text-black font-bold p-2 border">Item</th>
                <th className="text-black font-bold p-2 border">Qty</th>
                <th className="text-black font-bold p-2 border">Price</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="text-black border p-2 font-bold">{product.name}</td>
                  <td className="text-black border p-2 font-bold">1</td>
                  <td className="text-black border p-2 font-bold">{product.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mb-8">
            <div className="grid grid-cols-2">
              <div className="text-black font-bold ml-3 mb-3">Total Items: {totalItems}</div>
              <div className="text-black font-bold mb-3">Price: ${totalAmount.toFixed(2)}</div>
              <div className="text-black font-bold mt-4 mb-3">Gross Price (Inc Tax): ${grossPrice.toFixed(2)}</div>
            </div>
          </div>
          <button
            onClick={handleMobilePayment}
            className="rounded-full bg-green-500 hover:bg-rose-600 ml-3 mb-3 p-2"
          >
            <MdSendToMobile /> Mobile
          </button>
          <button
            onClick={handleCashPayment}
            className="rounded-full bg-blue-600 hover:bg-green-600 ml-8 mb-3 p-2"
          >
            <HiOutlineCash /> Cash
          </button>
          <button
            onClick={handleCancel}
            className="rounded-full bg-black hover:bg-cyan-800 ml-10 mb-3 p-2"
          >
            <FcCancel /> Clear
          </button>
          <button
            onClick={handlePrint}
            className="rounded-full bg-yellow-500 hover:bg-teal-900 ml-5 mb-3 p-2"
          >
            <IoPrintSharp /> Print Receipt
          </button>
          {error && <p className="text-center text-rose-600 font-bold">{error}</p>} </div>

        {receiptData && (
          <Receipt
            ref={receiptRef}
            products={receiptData.items}
            totalAmount={totalAmount}
            grossPrice={grossPrice}
          />
        )}

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
  )
};


