import React, { useState, useEffect } from "react";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/api";
import Navbar from "../components/Navbar";

function Home() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // ✅ linked to Navbar
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    stock: "",
    description: "",
  });
  const [editingProduct, setEditingProduct] = useState(null);

  // Fetch products from backend
  const fetchProducts = async () => {
    try {
      const response = await getProducts();
      setProducts(response.data || []); // Always safe as array
    } catch (error) {
      console.error("Failed to load products!", error);
      setProducts([]);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Add or Update Product
  const handleSaveProduct = async (e) => {
    e.preventDefault();
    const { name, price, stock } = newProduct;

    if (!name || !price || !stock) {
      alert("Please fill all required fields");
      return;
    }

    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, newProduct);
        setEditingProduct(null);
      } else {
        await createProduct(newProduct);
      }
      setNewProduct({ name: "", price: "", stock: "", description: "" });
      fetchProducts();
    } catch (error) {
      console.error("Failed to save product!", error);
      alert("Failed to save product!");
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setNewProduct(product);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id);
        fetchProducts();
      } catch (error) {
        console.error("Failed to delete product!", error);
        alert("Failed to delete product!");
      }
    }
  };

  // Filter products based on search
  const filteredProducts = Array.isArray(products)
    ? products.filter((product) =>
        product.name?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div>
      {/* ✅ Pass props to Navbar */}
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <div className="container mx-auto p-6">
        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                className="border p-4 rounded-lg shadow hover:shadow-lg transition"
              >
                <h2 className="text-xl font-bold mb-2">{product.name}</h2>
                <p>Price: ${product.price}</p>
                <p>Stock: {product.stock}</p>
                {product.description && (
                  <p className="text-gray-500">{product.description}</p>
                )}
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-3 text-center text-gray-500">
              No products found
            </p>
          )}
        </div>

        {/* Add/Edit Product Form */}
        <div className="mt-6 max-w-md">
          <h2 className="text-2xl font-bold mb-4">
            {editingProduct ? "Edit Product" : "Add Product"}
          </h2>
          <form onSubmit={handleSaveProduct} className="space-y-4">
            <input
              type="text"
              placeholder="Product Name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
              className="w-full p-2 border rounded-lg"
              required
            />
            <input
              type="number"
              placeholder="Price"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
              className="w-full p-2 border rounded-lg"
              required
            />
            <input
              type="number"
              placeholder="Stock"
              value={newProduct.stock}
              onChange={(e) =>
                setNewProduct({ ...newProduct, stock: e.target.value })
              }
              className="w-full p-2 border rounded-lg"
              required
            />
            <input
              type="text"
              placeholder="Description (optional)"
              value={newProduct.description}
              onChange={(e) =>
                setNewProduct({ ...newProduct, description: e.target.value })
              }
              className="w-full p-2 border rounded-lg"
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
            >
              {editingProduct ? "Update Product" : "Add Product"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Home;
