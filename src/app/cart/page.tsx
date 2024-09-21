"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { RiDeleteBin2Line } from "react-icons/ri";

interface Product {
  _id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  qty: number;
}






export default function Page() {
  const [cart, setCart] = useState<Product[]>

    ([]);

  const router = useRouter();
  const [deliveryOption, setDeliveryOption] = useState('standard');
  const [deliveryFee, setDeliveryFee] = useState(100);


  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const clearCart = storedCart.map((product: any) => ({
      ...product,
      price: parseFloat(product.price.toString().replace(/^0+/, '')),
    }))
    setCart(clearCart)
  }, []);





  const removeFromCart = (productId: number) => {
    const updatedCart = cart.filter((product) => product._id !== productId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handlePayment = () => {
    const total = getTotalItems();
    router.push(`/Payment?total=${total}&deliveryFee=${deliveryFee}&deliveryOption=${deliveryOption}`);
  };

  const getTotalItems = (): number => {
    return cart.reduce((total, item) => total + item.price, 0);
  }

  const formattedTotal = getTotalItems().toLocaleString('en-KE', { style: 'currency', currency: 'KES' });

  return (
    <div className="bg-gray-300 min-h-screen">
      <h1 className="text-center text-rose-600 p-4 no-underline hover:underline text-lg">
        Your Cart
      </h1>
      {cart.length === 0 ? (
        <p className="text-center text-rose-600 font-bold mb-4">
          Your cart is empty
        </p>
      ) : (
        <div className="flex flex-wrap gap-4">
          {cart.map((product, index) => (
            <div
              key={index}
              className="container mx-auto p-5 border-2 border-rose-600 flex flex-col items-center shadow-md "
            >
              <img
                src={`data:image/png;base64,${product.image}`}
                width={50}
                alt={product.name}
              />
              <h2 className="text-rose-600">{product.name}</h2>

              <p className="font-bold text-black">Delivery Option:
                <select value={deliveryOption} onChange={(e) => { setDeliveryOption(e.target.value); setDeliveryFee(e.target.value === 'standard' ? 50 : 100) }}><option value="standard">Standard Delivery KSh 50</option>
                  <option value="express">Express Delivery KSh 100</option>
                </select>
              </p>
              <p className=" font-bold text-rose-600">Total Price: {formattedTotal}</p>

              <button
                onClick={() => removeFromCart(product._id)}
                className="px-6 py-4 bg-rose-600 rounded-full hover:bg-blue-600"
              >
                <RiDeleteBin2Line />
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="flex justify-center">
        <button
          onClick={handlePayment}
          className="mt-2 bg-rose-600 px-3 py-4 shadow-md rounded-full"
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
}
