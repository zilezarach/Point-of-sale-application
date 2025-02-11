"use client";

import React, { useState, useEffect, useRef } from "react";

import axios from "axios";
import { RecursiveKeyValuePair } from "tailwindcss/types/config";
import { MdDeleteForever } from "react-icons/md";
import Image from "next/image";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
}

type ProductListProps = {
  productsUpdated: boolean;
};

const ProductList: React.FC<ProductListProps> = ({ productsUpdated }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    fetchProducts();
  }, [productsUpdated]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get<Product[]>("/api/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error Fetching Product", error);
    }
  };

  const handleRemoveProduct = async (id: string) => {
    try {
      await axios.delete(`/api/products/${id}`);
      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      setError("Failed removing products");
    }
  };

  return (
    <div>
      <h1 className="text-rose-600 font-bold mb-6 mt-6 text-2xl">
        Product List
      </h1>
      {error && <p className="mb-5 text-rose-600 font-bold">{error}</p>}
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="font-bold text-rose-600">Name</th>
            <th className="font-bold text-rose-600">Stock</th>
            <th className="font-bold text-rose-600">Price</th>
            <th className="font-bold text-rose-600">Description</th>
            <th className="font-bold text-rose-600">Image</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td className="border font-bold text-rose-600 text-center">
                {product.name}
              </td>
              <td className="border font-bold text-rose-600 text-center">
                {product.stock}
              </td>
              <td className="border text-black font-bold text-center">
                ${Number(product.price).toFixed(2)}
              </td>
              <td className="border font-bold text-rose-600 text-center">
                {product.description}
              </td>
              <td className="border font-bold text-rose-600">
                <img
                  src={`data:image/png;base64,${product.image}`}
                  alt={product.name}
                  className="w-27 h-16 object-cover"
                />
              </td>
              <td>
                <button
                  onClick={() => handleRemoveProduct(product._id)}
                  className="bg-rose-600 text-white hover:bg-indigo-700"
                >
                  <MdDeleteForever />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
