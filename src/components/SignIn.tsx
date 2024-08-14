"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import axios from "axios";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/auth/login", {
        username,
        password,
      });
      const { role } = response.data;

      // Redirect based on user role
      if (role === "Manager") {
        router.push("/admin"); // Admin page
      } else if (role === "employee") {
        router.push("/POs"); // POS page for employees
      }
    } catch (error) {
      setError("Invalid username or password");
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
            <p className="text-rose-600 text-center font-bold mb-4">{error}</p>
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
              placeholder="Username"
              className="px-3 py-2 w-full border-2 rounded border-rose-500 text-black focus:outline-none"
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
              placeholder="Password"
              className="px-3 py-2 w-full border-2 rounded border-rose-500 text-black focus:outline-none"
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

export default SignIn;
