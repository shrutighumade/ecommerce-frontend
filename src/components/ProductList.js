import React from "react";
import ProductCard from "./ProductCard";

const ProductList = ({ products, onEdit, onDelete }) => {
  if (!products || products.length === 0) {
    return <div className="text-center text-gray-500 mt-10">No products found!</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default ProductList;
