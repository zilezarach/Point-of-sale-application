"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Image from "next/image";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: File | null;
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
  const handlesubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post("/api/products", {
        name: name,
        description: description,
        price: parseFloat(price),
        stock: parseInt(stock, 10),
        image: imageUrl,
      });
      if (response.status === 200) {
        setSuccess("Product added/updated successfully");
        setName("");
        setPrice("");
        setDescription("");
        setStock("");
        setImage(null);
        setImageUrl("");
      } else {
        setError("Failed to add/update product");
        setSuccess("");
      }
    } catch (error) {
      setError("unable to add/update product");
      setSuccess("");
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null; // Check if files is not null
    if (!file) {
      console.error("No file selected");
      return; // Exit if no file is selected
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch("/api/uploads", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Failed to upload image");
      }

      const data = await res.json(); // Parse the response as JSON
      setImageUrl(data.imageUrl); // Use the URL from the response
    } catch (error) {
      console.error("Error uploading image:", error);
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
      <div className="mb-3">
        <label className="block text-rose-500 font-bold mb-3">
          Product Image
        </label>
        <input name="image" type="file" onChange={handleImageUpload} required />
        {imageUrl && (
          <Image
            src={imageUrl}
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
