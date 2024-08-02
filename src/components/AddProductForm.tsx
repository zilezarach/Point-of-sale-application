"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
}

type ProductProps = {
  onProductAdded: () => void;
};

const AddProductForm: React.FC<ProductProps> = ({ onProductAdded }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const handlesubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post("api/products", {
        name: name,
        description: description,
        price: parseFloat(price),
        quantity: parseInt(stock, 10),
      });
      if (response.status === 200) {
        setSuccess("Product added/updated successfully");
        setName("");
        setPrice("");
        setDescription("");
        setStock("");
      } else {
        setError("Failed to add/update product");
        setSuccess("");
      }
    } catch (error) {
      setError("unable to add/update product");
      setSuccess("");
    }
  };

  return (
    <form
      onSubmit={handlesubmit}
      className="bg-white p-6 rounded-lg shadow-md mb-4 min-h-fit"
    >
      <h2 className="text-rose-500 font-bold text-2xl mb-4">
        Add/Update Product
      </h2>
      <div className="mb-3">
        <label className="block text-rose-500 font-bold">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full text-black p-2 border border-rose-500 rounded"
        />
      </div>
      <div className="mb-3">
        <label className="block text-rose-500 font-bold">Price</label>
        <input
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full text-black p-2 border border-rose-500 rounded"
        />
      </div>
      <div className="mb-3">
        <label className="block text-rose-500 font-bold">Stock</label>
        <input
          type="text"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          className="w-full text-black p-2 border border-rose-500 rounded"
        />
      </div>
      <div className="mb-3">
        <label className="block text-rose-500 font-bold">
          Product description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full text-black p-2 border border-rose-500 rounded"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-rose-500 hover:bg-blue-500 rounded px-2 py-5 "
      >
        Add/Update Product
      </button>
    </form>
  );
};

export default AddProductForm;
