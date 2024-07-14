"use client"
import React, {useState} from 'react';


const AddProductForm = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');

  return (
   <form className="bg-white p-6 rounded-lg shadow-md mb-4">
     <h2 className="text-rose-500 font-bold text-2xl mb-4">Add New Product</h2>
      <div className="mb-3">
        <label className="block text-rose-500 font-bold">Name</label>
        <input type="text" value={name}className="w-full text-black p-2 border border-rose-500 rounded"/>
      </div>
      <div className="mb-3">
        <label className="block text-rose-500 font-bold">Price</label>
        <input type="text" value={price} className="w-full text-black p-2 border border-rose-500 rounded" />
      </div>
      <div className="mb-3">
        <label className="block text-rose-500 font-bold">Stock</label>
        <input type="text"value={stock} className="w-full text-black p-2 border border-rose-500 rounded" />
      </div>
      <button type="submit" className="w-full bg-rose-500 hover:bg-blue-500 rounded px-2 py-5 ">Add New Product</button> 
    </form>
  )

}


export default AddProductForm;
