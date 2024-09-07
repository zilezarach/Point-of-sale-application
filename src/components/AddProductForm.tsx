"use client";
import axios from "axios";
import React, { useState, useEffect, ChangeEvent } from "react";
import Image from "next/image";
import { imageOptimizer } from "next/dist/server/image-optimizer";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  image?: string;
}

type ProductProps = {
  onProductAdded: () => void;
};

const AddProductForm: React.FC<ProductProps> = ({ onProductAdded }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get<Product[]>("/api/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching Products:", error);
    }
  };
  const handlesubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image!);
    formData.append("stock", stock.toString());
    formData.append("price", price);
    formData.append("description", description);

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Product added successfully!");
      } else {
        alert("Failed to add product.");
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      console.error("No file detected");
      return;
    }
    // Save the uploaded image URL
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
        <label htmlFor="description" className="block text-rose-500 font-bold">
          Product description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full text-black p-2 border border-rose-500 rounded"
          required
        />
      </div>
      <div className="mb-3">
        <label className="block text-rose-500 font-bold mb-3">
          Product Image
        </label>
        <input
          name="image"
          accept="image/*"
          type="file"
          onChange={handleImageUpload}
          required
        />
        {products.image && (
          <Image
            src={products.image}
            alt="Product Preview"
            className="mt-2 w-32 h-32 object-cover"
          />
        )}
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
