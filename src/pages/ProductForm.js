import React, { useState } from "react";
import api from "../services/api";

export default function ProductForm({ onSuccess }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !price) {
      setError("All fields are required!");
      return;
    }

    try {
      await api.post("/products", { name, price });
      setName("");
      setPrice("");
      setError("");
      onSuccess();
    } catch (err) {
      setError("Failed to add product!");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-100 p-6 rounded-lg shadow-md"
    >
      <h2 className="text-lg font-bold mb-4">Add Product</h2>
      {error && <p className="text-red-500">{error}</p>}
      <input
        type="text"
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border px-3 py-2 w-full mb-3 rounded"
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="border px-3 py-2 w-full mb-3 rounded"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Save
      </button>
    </form>
  );
}
