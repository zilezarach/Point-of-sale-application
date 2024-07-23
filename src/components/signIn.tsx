"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import axios from "axios";

const signIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        username,
        password,
      });

      setError("Login successful");

      if (response.data.role === "admin") {
        router.push("/admin");
      } else {
        if (response.data.role === "employee") router.push("/checkout");
      }
    } catch (error) {
      setError("Login failed");
    }
  };

  return (
    <div className="flex flex-col h-screen md:flex-row">
      <div className=" md:w-1/2 flex items-center justify-center bg-gray-300">
        <Image src="/logo2.png" width={100} height={100} alt="logo" />
        <form
          onSubmit={handleSubmit}
          className="bg-white p-10 rounded shadow-md"
        >
          <h2 className="text-2xl font-bold mb-4 text-red-600 no-underline hover:underline">
            Welcome to Zacc
          </h2>
          <h2 className="text-lg font-bold mb-4 text-red-600 no-underline hover:underline">
            Sign In
          </h2>
          {error && (
            <p className=" border border-blue-800 rounded bg-rose-500 text-black font-bold mb-4">
              {error}
            </p>
          )}
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 font-bold mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              className="px-3 py-2 w-full border-2 border-rose-500 text-black"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-bold">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              className="px-3 py-2 w-full border-2 border-rose-500 text-black"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            onClick={handleSubmit}
            className=" flex items-center justify-center bg-rose-500 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
          >
            Sign In
          </button>
        </form>
      </div>
      <div
        className=" hidden md:block md:flex-1 bg-cover bg-center"
        style={{ backgroundImage: "url(/background.jpg)" }}
      ></div>
    </div>
  );
};

export default signIn;
