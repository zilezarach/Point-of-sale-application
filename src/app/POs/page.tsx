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
const Receipt = React.forwardRef(
  (
    {
      products,
      totalAmount,
      grossPrice,
    }: { products: Product[]; totalAmount: number; grossPrice: number },
    ref: React.Ref<HTMLDivElement>,
  ) => (
    <div ref={ref} className="receipt p-4 border rounded border-gray-600">
      <h1 className="text-2xl font-bold">Receipt</h1>
      <h2 className="text-lg font-semibold mt-2">Items Purchased:</h2>
      {products.map((product) => (
        <div key={product.id} className="flex justify-between">
          <p>
            {product.name} - ${product.price.toFixed(2)} x {product.qty}
          </p>
        </div>
      ))}
      <h2 className="text-lg font-semibold mt-2">
        Total Amount: ${totalAmount.toFixed(2)}
      </h2>
      <h2 className="text-lg font-semibold">
        Gross Price (Inc Tax): ${grossPrice.toFixed(2)}
      </h2>
    </div>
  ),
);

export default function Page() {
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [productId, setProductId] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [receiptData, setReceiptData] = useState<any>(null);
  const contentRef = useRef<HTMLDivElement>(null); // Ref for printing the receipt
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
    contentRef,
    documentTitle: "Receipt",
    onAfterPrint: () => alert("Print successful"),
  });
  const handlePrintClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    handlePrint();
  };
  return (
    <div className="bg-gray-300 min-h-screen">
      <Navbar />
      <div className="flex flex-col md:flex-row p-2 gap-2">
        <div className="bg-white rounded-lg shadow-md p-3 w-full md:w-1/3">
          <div className="flex gap-2 mb-4">
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
          <div className="overflow-x-auto">
            <table className="w-full mb-4">
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
              onClick={handlePrintClick}
              className="bg-yellow-500 hover:bg-yellow-600 text-white p-3 rounded-lg flex items-center justify-center gap-2 col-span-2"
            >
              <IoPrintSharp className="text-xl" />
              <span className="text-sm">Print Receipt</span>
            </button>
          </div>

          {error && (
            <p className="text-red-600 text-center mt-4 font-bold">{error}</p>
          )}
        </div>

        {/* Right Panel */}
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

        {/* Receipt - Hidden until printed */}
        <div className="hidden">
          {receiptData && (
            <Receipt
              ref={contentRef}
              products={receiptData.items}
              totalAmount={totalAmount}
              grossPrice={grossPrice}
            />
          )}
        </div>
      </div>
    </div>
  );
}
