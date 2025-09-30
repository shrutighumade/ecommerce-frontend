import React, { useState } from "react";
import { createProduct } from "../services/api";

function ProductForm({ onSuccess }) {
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    stock: "",
    description: "",
  });

  const [error, setError] = useState("");

  const handleChange = e => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");

    // Simple validation
    if (!productData.name || !productData.price || !productData.stock) {
      setError("Name, price, and stock are required!");
      return;
    }

    try {
      const newProduct = await createProduct(productData);
      onSuccess(newProduct);
      setProductData({ name: "", price: "", stock: "", description: "" });
    } catch (err) {
      console.error(err);
      setError("Failed to add product!");
    }
  };

  return (
    <div className="p-4 border border-gray-200 rounded shadow-sm bg-white">
      <h2 className="text-xl font-semibold mb-4">Add Product</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={productData.name}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={productData.price}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={productData.stock}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={productData.description}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded font-semibold"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}

export default ProductForm;
