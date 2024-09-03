"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: string;
  stock: number;
  image: string;
}

export default function Page() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);
  const router = useRouter();

  useEffect(() => {
    axios
      .get("/api/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products: ", error);
      });
  }, []);

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  const handleCheckout = () => {
    router.push({
      pathname: "/cart",
      query: { cart: JSON.stringify(cart) },
    } as any);
  };

  return (
    <div className=" bg-gray-300 container-none mx-auto min-h-screen p-4">
      <h1 className="text-center text-rose-600 font-bold no-underline hover:underline text-lg">
        Shop Our Products
        <Image
          src="/logo2.png"
          alt=""
          height={50}
          width={50}
          className="mb-4"
        />
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product: Product) => (
          <div key={product._id} className="border p-4 rounded shadow-md ">
            <Image
              src={product.image}
              alt={product.name}
              className="w-full object-cover"
              width={40}
              height={40}
            />
            <h2 className="text-lg font-bold text-rose-600">{product.name}</h2>
            <p className="text-sm font-bold text-black">
              {product.description}
            </p>
            <p className="font-bold text-rose-600">Stock:{product.stock}</p>
            <p className="text-lg font-bold text-black">{product.price}</p>
            <button
              onClick={() => addToCart(product)}
              className="bg-rose-600 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
      <button
        onClick={handleCheckout}
        className="bg-rose-600  text-white px-2 py-1 rounded shadow-md mt-3 hover:bg-blue-600 transition"
      >
        Proceed to Checkout
      </button>
    </div>
  );
}
