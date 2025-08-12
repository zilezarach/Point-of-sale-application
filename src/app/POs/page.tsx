"use client";

import Navbar from "@/components/NavBar";
import React, { useState, useRef, useEffect } from "react";
import { FaCheck } from "react-icons/fa";
import { MdSendToMobile } from "react-icons/md";
import { HiOutlineCash } from "react-icons/hi";
import { FcCancel } from "react-icons/fc";
import { IoPrintSharp } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { useReactToPrint } from "react-to-print";

interface Product {
  _id: string;
  barcode: string;
  name: string;
  description: string;
  price: number;
  image: string;
  stock: number;
  qty: number;
}

const Receipt = React.forwardRef(
  (
    {
      products,
      totalAmount,
      taxAmount,
      grossPrice,
      paymentMethod,
      cashPaid,
      change,
      date,
    }: {
      products: Product[];
      totalAmount: number;
      taxAmount: number;
      grossPrice: number;
      paymentMethod: string;
      cashPaid?: number;
      change?: number;
      date: string;
    },
    ref: React.Ref<HTMLDivElement>
  ) => (
    <div ref={ref} className="receipt p-4 border rounded border-gray-600">
      <h1 className="text-2xl font-bold">Receipt</h1>
      <p>Date: {date}</p>
      <h2 className="text-lg font-semibold mt-2">Items Purchased:</h2>
      {products.map((product) => (
        <div key={product._id} className="flex justify-between">
          <p>
            {product.name} - ${product.price.toFixed(2)} x {product.qty}
          </p>
        </div>
      ))}
      <h2 className="text-lg font-semibold mt-2">
        Subtotal: ${totalAmount.toFixed(2)}
      </h2>
      <h2 className="text-lg font-semibold">
        Tax (16%): ${taxAmount.toFixed(2)}
      </h2>
      <h2 className="text-lg font-semibold">Total: ${grossPrice.toFixed(2)}</h2>
      <p>Payment Method: {paymentMethod}</p>
      {paymentMethod === "Cash" && (
        <>
          <p>Cash Paid: ${cashPaid?.toFixed(2)}</p>
          <p>Change: ${change?.toFixed(2)}</p>
        </>
      )}
    </div>
  )
);

export default function POS() {
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [productId, setProductId] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [receiptData, setReceiptData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [showCashModal, setShowCashModal] = useState(false);
  const [cashGiven, setCashGiven] = useState("");
  const contentRef = useRef<HTMLDivElement>(null);
  const TAX_RATE = 0.16;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
    fetch("/api/auth/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.valid) {
          router.push("/login");
        }
      });
  }, []);

  const fetchProduct = async (id: string, qtyToAdd: number = 1) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/products/${id}`);
      if (!response.ok) throw new Error("Product not found");
      const product: Product = await response.json();
      if (product.stock < qtyToAdd) throw new Error("Insufficient stock");

      setProducts((prev) => {
        const existing = prev.find((p) => p._id === product._id);
        if (existing) {
          return prev.map((p) =>
            p._id === product._id ? { ...p, qty: p.qty + qtyToAdd } : p
          );
        }
        return [...prev, { ...product, qty: qtyToAdd }];
      });
      setError(null);
      setProductId("");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleScanKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      if (productId) fetchProduct(productId);
    }
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/products/${searchQuery}`);
      if (!response.ok) throw new Error("Product not found");
      const data = await response.json();
      setProduct(data);
      setError(null);
    } catch (error) {
      setProduct(null);
      setError("Product not found");
    } finally {
      setLoading(false);
    }
  };

  const removeProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p._id !== id));
  };

  const updateQty = (id: string, newQty: number) => {
    if (newQty < 1) return removeProduct(id);
    setProducts((prev) =>
      prev.map((p) => (p._id === id ? { ...p, qty: newQty } : p))
    );
  };

  const calculateTotal = (items: Product[]) =>
    items.reduce((total, item) => total + item.price * item.qty, 0);

  const totalItems = products.reduce((sum, p) => sum + p.qty, 0);
  const totalAmount = calculateTotal(products);
  const taxAmount = totalAmount * TAX_RATE;
  const grossPrice = totalAmount + taxAmount;

  const handleCancel = () => {
    setProducts([]);
    setError(null);
  };

  const updateStock = async (product: Product) => {
    await fetch(`/api/products/${product._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ qty: product.qty }),
    });
  };

  const saveTransaction = async (transaction: any) => {
    const response = await fetch("/api/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(transaction),
    });
    if (!response.ok) throw new Error("Failed to save transaction");
  };

  const processPayment = async (paymentMethod: string, cashPaid?: number) => {
    try {
      const transaction = {
        date: new Date().toISOString(),
        amount: grossPrice,
        paymentMethod,
        productInfo: products.map((p) => `${p.name} x ${p.qty}`).join(", "),
      };
      await saveTransaction(transaction);
      await Promise.all(products.map(updateStock));
      setReceiptData({
        date: new Date().toLocaleString(),
        items: products,
        totalAmount,
        taxAmount,
        grossPrice,
        paymentMethod,
        cashPaid,
        change: cashPaid ? cashPaid - grossPrice : undefined,
      });
      setProducts([]);
      setError(null);
    } catch (err) {
      setError("Transaction failed");
    }
  };

  const handleCashPayment = () => {
    setShowCashModal(true);
  };

  const confirmCash = () => {
    const cashPaid = parseFloat(cashGiven);
    setShowCashModal(false);
    if (isNaN(cashPaid) || cashPaid < grossPrice) {
      setError(`Insufficient cash. Need at least ${grossPrice.toFixed(2)}`);
      return;
    }
    processPayment("Cash", cashPaid);
  };

  const handleMobilePayment = () => {
    // Integrate real API here
    processPayment("Mobile");
  };

  const handlePrint = useReactToPrint({
    contentRef,
    documentTitle: "Receipt",
  });

  return (
    <div className="bg-gray-300 min-h-screen">
      <Navbar />
      <div className="flex flex-col md:flex-row p-2 gap-2">
        <div className="bg-white rounded-lg shadow-md p-3 w-full md:w-1/3">
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              placeholder="Scan Barcode"
              className="border rounded border-rose-600 text-black font-bold w-full shadow-md focus:outline-none p-2"
              onChange={(e) => setProductId(e.target.value)}
              onKeyDown={handleScanKeyDown}
              value={productId}
            />
            <button
              onClick={() => fetchProduct(productId)}
              className="rounded-r bg-rose-600 hover:bg-blue-600 p-2.5"
            >
              <FaCheck />
            </button>
          </div>
          {loading && <p>Loading...</p>}
          <div className="overflow-x-auto">
            <table className="w-full mb-4">
              <thead>
                <tr>
                  <th className="text-black font-bold p-2 border">Item</th>
                  <th className="text-black font-bold p-2 border">Qty</th>
                  <th className="text-black font-bold p-2 border">Price</th>
                  <th className="text-black font-bold p-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    <td className="text-black border p-2 font-bold">
                      {product.name}
                    </td>
                    <td className="text-black border p-2 font-bold">
                      <input
                        type="number"
                        value={product.qty}
                        onChange={(e) =>
                          updateQty(product._id, parseInt(e.target.value))
                        }
                        min="1"
                        className="w-16"
                      />
                    </td>
                    <td className="text-black border p-2 font-bold">
                      {product.price}
                    </td>
                    <td className="text-black border p-2">
                      <button onClick={() => removeProduct(product._id)}>
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span className="font-bold">Total Items:</span>
              <span>{totalItems}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold">Subtotal:</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold">Tax (16%):</span>
              <span>${taxAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between border-t pt-2">
              <span className="font-bold">Total:</span>
              <span>${grossPrice.toFixed(2)}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleMobilePayment}
              className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-lg flex items-center justify-center gap-2"
            >
              <MdSendToMobile className="text-xl" />
              <span className="text-sm">Mobile</span>
            </button>
            <button
              onClick={handleCashPayment}
              className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg flex items-center justify-center gap-2"
            >
              <HiOutlineCash className="text-xl" />
              <span className="text-sm">Cash</span>
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-800 hover:bg-gray-900 text-white p-3 rounded-lg flex items-center justify-center gap-2 col-span-2"
            >
              <FcCancel className="text-xl" />
              <span className="text-sm">Clear All</span>
            </button>
            <button
              onClick={() => handlePrint()}
              className="bg-yellow-500 hover:bg-yellow-600 text-white p-3 rounded-lg flex items-center justify-center gap-2 col-span-2"
            >
              <IoPrintSharp className="text-xl" />
              <span className="text-sm">Print Receipt</span>
            </button>
          </div>

          {error && (
            <p className="text-red-600 text-center mt-4 font-bold">{error}</p>
          )}

          {showCashModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-4 rounded">
                <input
                  type="number"
                  placeholder="Enter cash amount"
                  value={cashGiven}
                  onChange={(e) => setCashGiven(e.target.value)}
                  className="border p-2 mb-2"
                />
                <button
                  onClick={confirmCash}
                  className="bg-green-500 text-white p-2"
                >
                  Confirm
                </button>
                <button
                  onClick={() => setShowCashModal(false)}
                  className="bg-red-500 text-white p-2 ml-2"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-md p-3 w-full md:w-2/3">
          <div className="flex flex-col md:flex-row gap-2 mb-4">
            <input
              onChange={(e) => setSearchQuery(e.target.value)}
              value={searchQuery}
              type="text"
              placeholder="Search for Product"
              className="border rounded text-black p-2 focus:outline-none flex-grow"
            />
            <button
              onClick={handleSearch}
              className="rounded bg-rose-600 hover:bg-rose-700 text-white p-2 flex items-center justify-center"
            >
              <FaCheck />
            </button>
          </div>

          {product && (
            <div className="p-4 border rounded-lg border-rose-600">
              <h2 className="text-lg font-bold text-rose-600 mb-2">
                {product.name}
              </h2>
              <p className="text-gray-700 mb-2">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold">
                  Stock: {product.stock}
                </span>
                <span className="text-lg font-bold text-rose-600">
                  ${product.price.toFixed(2)}
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="hidden">
          {receiptData && (
            <Receipt
              ref={contentRef}
              products={receiptData.items}
              totalAmount={receiptData.totalAmount}
              taxAmount={receiptData.taxAmount}
              grossPrice={receiptData.grossPrice}
              paymentMethod={receiptData.paymentMethod}
              cashPaid={receiptData.cashPaid}
              change={receiptData.change}
              date={receiptData.date}
            />
          )}
        </div>
      </div>
    </div>
  );
}
