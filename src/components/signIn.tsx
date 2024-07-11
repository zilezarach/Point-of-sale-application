
'use client'
import Image from "next/image";
import { useRouter } from "next/navigation";
import react, { useState } from "react";



const signIn = () => {
  const router = useRouter();
  const [username, setUsername] = useState('')
  const [error, setError] = useState('')
  const [password, setPassword] = useState('')

  const handlesubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      router.push("admin/dashboard")
    } else {
      if (username === 'employ' && password === 'user') {
        router.push("/employee/checkout")
      } else {
        setError("Wrong password or username")
      }
    }
  }


  return (
    <div className="flex flex-col h-screen md:flex-row">
      <div className=" md:w-1/2 flex items-center justify-center bg-gray-300">
        <Image
          src="/logo2.png"
          width={100}
          height={100}
          alt="logo"
        />
        <form className="bg-white p-10 rounded shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-red-600 no-underline hover:underline">Welcome to Zacc</h2>
          <h2 className="text-lg font-bold mb-4 text-red-600 no-underline hover:underline">Sign In</h2>
          {error && <p className="text-red-800 mb-4">{error}</p>}
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 font-bold mb-2">Username</label>
            <input type="text" id="username" name="username" value={username} className="px-3 py-2 w-full border-2 border-rose-500 text-black" onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-bold">Password</label>
            <input type="password" id="password" name="password" value={password} className="px-3 py-2 w-full border-2 border-rose-500 text-black" onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className=" flex items-center justify-center bg-rose-500 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded">Sign In</button>
        </form>
      </div>
      <div className=" hidden md:block md:flex-1 bg-cover bg-center" style={{ backgroundImage: 'url(/background.jpg)' }}>
      </div>
    </div >
  )
}



export default signIn
