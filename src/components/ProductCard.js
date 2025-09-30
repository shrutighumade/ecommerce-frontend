import React from "react";

function ProductCard({ product, onDelete, onUpdate }) {
  return (
    <div className="p-4 border border-gray-200 rounded shadow-sm bg-white hover:shadow-md transition relative">
      <h3 className="text-lg font-bold">{product.name}</h3>
      <p className="text-gray-700">Price: ${product.price}</p>
      <p className="text-gray-700">Stock: {product.stock}</p>
      {product.description && (
        <p className="text-gray-500 text-sm mt-2">{product.description}</p>
      )}
      <div className="mt-3 flex space-x-2">
        <button
          onClick={() => onUpdate(product)}
          className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
        >
          Update
        </button>
        <button
          onClick={() => onDelete(product.id)}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
