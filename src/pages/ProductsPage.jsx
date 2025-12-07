import { motion } from "framer-motion";
import { AlertTriangle, DollarSign, Package, TrendingUp } from "lucide-react";
import React, { useState } from "react";
import ProductFormModal from "../components/products/form/ProductFormModal";

import Header from "../components/common_components/Header";
import StatCards from "../components/common_components/StatCards";
import ProductListSection from "../components/products/ProductListSection";

const ProductsPage = () => {
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [reloadFlag, setReloadFlag] = useState(false);
  const [viewingProductId, setViewingProductId] = useState(null);

  const handleView = (product) => {
    setViewingProductId(product.id); // ✅ chỉ cần ID
    setEditingProductId(null); // ✅ tránh trùng mode edit
    setAddModalOpen(true); // ✅ mở full modal
  };

  const handleReload = () => {
    setAddModalOpen(false);
    setEditingProductId(null);
    setReloadFlag((prev) => !prev);
  };

  const openAddModal = () => {
    setEditingProductId(null);
    setAddModalOpen(true);
  };

  const openEditModal = (productId) => {
    setEditingProductId(productId);
    setAddModalOpen(true);
  };

  return (
    <div
      className={`flex-1 overflow-auto relative z-10 bg-white text-gray-900 ${
        isAddModalOpen ? "overflow-visible" : "overflow-auto"
      }`}
    >
      <Header
        path={[
          { label: "Mobilehub", to: "/" },
          { label: "Sản phẩm", to: "/products" },
        ]}
      />

      <main
        className={`relative mx-auto py-6 px-4 lg:px-4 ${
          isAddModalOpen ? "overflow-visible" : "overflow-auto"
        }`}
      >
        {/* ===== Thống kê tổng quan ===== */}
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-7"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75 }}
        >
          <StatCards
            name="Tổng sản phẩm"
            icon={Package}
            value="4,321"
            color="#6366f1"
          />
          <StatCards
            name="Top Selling"
            icon={TrendingUp}
            value="69"
            color="#10b981"
          />
          <StatCards
            name="Low Stock"
            icon={AlertTriangle}
            value="32"
            color="#f59e0b"
          />
          <StatCards
            name="Total Revenue"
            icon={DollarSign}
            value="$654,310"
            color="#ef4444"
          />
        </motion.div>

        {/* ===== Bảng sản phẩm ===== */}
        <ProductListSection
          onAddClick={openAddModal}
          onEditClick={(product) => openEditModal(product.id)}
          onViewClick={handleView}
          reloadFlag={reloadFlag}
        />

        {/* ===== Form Modal (Add / Edit) ===== */}
        <ProductFormModal
          productId={viewingProductId || editingProductId}
          isOpen={isAddModalOpen}
          mode={viewingProductId ? "view" : "edit"} // ✅ QUAN TRỌNG NHẤT
          onClose={() => {
            setAddModalOpen(false);
            setViewingProductId(null);
            setEditingProductId(null);
          }}
        />
      </main>
    </div>
  );
};

export default ProductsPage;
