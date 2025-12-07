// src/components/products/form/ProductViewModal.jsx
import React from "react";
import { X } from "lucide-react";

const ProductViewModal = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg w-11/12 max-w-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>

        <h2 className="text-lg font-semibold mb-3">{product.name}</h2>
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-64 object-cover rounded mb-3"
        />
        <p className="text-sm text-gray-500 mb-1">
          Danh mục: {product.category}
        </p>
        <p className="text-sm text-orange-600 font-bold mb-1">
          Giá: {product.price.toLocaleString("vi-VN")}₫
        </p>
        <p className="text-sm text-gray-500 mb-1">Tồn kho: {product.stock}</p>
        <p className="text-sm text-gray-700 mt-2">{product.description}</p>
      </div>
    </div>
  );
};

export default ProductViewModal;
