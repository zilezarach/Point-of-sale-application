"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import axios from "axios";
import Spinner from "./Spinner";
import Link from "next/link";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      console.log("Login Response:", data); // Debugging

      if (response.ok) {
        if (data.role === "admin") {
          console.log("Redirecting to Admin Dashboard...");
          router.push("/admin");
        } else if (data.role === "employee") {
          console.log("Redirecting to POS Page...");
          router.push("/POs");
        } else {
          console.log("Unknown role:", data.role);
          setError("Unknown role. Please contact support.");
        }
      } else {
        console.log("Invalid credentials");
        setError("Invalid username or password");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen md:flex-row">
      <div className="w-full md:w-1/2 flex-1 flex items-center justify-center bg-gray-300 p-4">
        <Image src="/logo2.png" width={100} height={100} alt="logo" />
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 md:p-10 rounded shadow-md w-full max-w-md"
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
            type="submit"
            className=" w-full flex items-center justify-center bg-rose-500 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
          >
            {loading ? (
              <div className="flex justify-center items-center">
                <Spinner />
              </div>
            ) : (
              "Sign In"
            )}
          </button>
          <p className="mt-2 text-center text-black">
            A Customer?{""}
            <Link href="/Shop" className="text-rose-600 underline">
              Visit the Shop
            </Link>
          </p>
        </form>
      </div>
      <div
        className="hidden md:block md:flex-1 bg-cover bg-center"
        style={{ backgroundImage: "url(/background.jpg)" }}
      ></div>
    </div>
  );
};

export default SignIn;
