import React from "react";

function Navbar({ searchTerm, setSearchTerm }) {
  return (
    <nav className="bg-gradient-to-r from-purple-600 to-pink-500 shadow-lg p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">E-Commerce</h1>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}  // ✅ uses function properly
          placeholder="Search products..."
          className="px-4 py-2 rounded-lg w-72 outline-none"
        />
      </div>
    </nav>
  );
}

export default Navbar;
