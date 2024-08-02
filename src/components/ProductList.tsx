"use client";

import React, { useState, useEffect } from "react";

import axios from "axios";
import { RecursiveKeyValuePair } from "tailwindcss/types/config";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
}

type ProductListProps = {
  productsUpdated: boolean;
};

const ProductList: React.FC<ProductListProps> = ({ productsUpdated }) => {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get<Product[]>("api/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error Fetching Product", error);
    }
  };

  return (
    <div>
      <h1 className="text-rose-600 font-bold mb-6 mt-6 text-2xl">
        Product List
      </h1>
      <table className="min-w-full bg-white rounde">
        <thead>
          <tr>
            <th className="font-bold text-rose-600">Name</th>
            <th className="font-bold text-rose-600">Stock</th>
            <th className="font-bold text-rose-600">Price</th>
            <th className="font-bold text-rose-600">Description</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td className="border font-bold text-rose-600">{product.name}</td>
              <td className="border font-bold text-rose-600">
                {product.stock}
              </td>
              <td className="border text-rose-600 font-bold">
                {product.price}
              </td>
              <td className="border font-bold text-rose-600">
                {product.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
