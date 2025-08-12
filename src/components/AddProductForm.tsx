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
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!name || !price || !stock || !description || !image) {
      setError("Please fill in all fields and select an image.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);
    formData.append("stock", stock);
    formData.append("price", price);
    formData.append("description", description);

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setSuccess("✅ Product added successfully!");
        setName("");
        setPrice("");
        setStock("");
        setDescription("");
        setImage(null);
        setImagePreview(null);
        onProductAdded();
      } else {
        const data = await response.json();
        setError(data.message || "❌ Failed to add product.");
      }
    } catch (err) {
      console.error("Error adding product:", err);
      setError("❌ An error occurred while adding the product.");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImage(null);
      setImagePreview(null);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
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
          className="mb-3"
        />
        {imagePreview && (
          <div className="mt-2">
            <p className="text-sm text-gray-500">Image Preview:</p>
            <img
              src={imagePreview}
              alt="Preview"
              className="w-32 h-32 object-cover rounded border border-gray-300"
            />
          </div>
        )}
      </div>
      <button
        type="submit"
        disabled={loading}
        className={`w-full bg-rose-500 hover:bg-blue-500 rounded px-2 py-3 font-bold text-white transition ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Adding..." : "Add / Update Product"}
      </button>
    </form>
  );
};

export default AddProductForm;
