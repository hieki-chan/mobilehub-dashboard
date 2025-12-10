import { motion } from "framer-motion";
import {
  AlertTriangle,
  DollarSign,
  Package,
  TrendingUp,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import ProductFormModal from "../components/products/form/ProductFormModal";

import Header from "../components/common_components/Header";
import StatCards from "../components/common_components/StatCards";
import ProductListSection from "../components/products/ProductListSection";

import { fetchAdminProducts } from "../api/ProductApi";

const ProductsPage = () => {
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [reloadFlag, setReloadFlag] = useState(false);

  const [totalProducts, setTotalProducts] = useState(0);
  const [lowStockCount, setLowStockCount] = useState(0);
  const [discountCount, setDiscountCount] = useState(0);
  const [inactiveCount, setInactiveCount] = useState(0);

  useEffect(() => {
    fetchAdminProducts(0, 50).then((res) => {
      const products = res.content;

      setTotalProducts(res.totalElements ?? products.length);

      const lowStock = products.filter((p) => p.stock !== undefined && p.stock <= 3).length;
      setLowStockCount(lowStock);

      const discountItems = products.filter((p) => {
        return p.discount?.valueInPercent > 0;
      }).length;
      setDiscountCount(discountItems);
      
      setInactiveCount(
      products.filter((p) => p.status === "INACTIVE").length
    );
    });
  }, []);


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
      className={`flex-1 overflow-auto relative z-10 bg-gray-50 text-gray-900 ${isAddModalOpen ? "overflow-visible" : "overflow-auto"
        }`}
    >
      <Header
        path={[
          { label: "Mobilehub", to: "/" },
          { label: "Sản phẩm", to: "/products" },
        ]}
      />

      <main
        className={`relative mx-auto py-6 px-4 lg:px-4 ${isAddModalOpen ? "overflow-visible" : "overflow-auto"
          }`}
      >
        {/* ===== Thống kê tổng quan ===== */}
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-7"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .75 }}
        >
          <StatCards
            name="Tổng sản phẩm"
            icon={Package}
            value={totalProducts.toLocaleString()}
            color="#6366f1"
          />

          <StatCards
            name="Sản phẩm đang khuyến mãi"
            icon={TrendingUp}
            value={discountCount.toLocaleString()}
            color="#10b981"
          />

          <StatCards
            name="Sản phẩm sắp hết hàng"
            icon={AlertTriangle}
            value={lowStockCount.toLocaleString()}
            color="#f59e0b"
          />

          <StatCards
            name="Sản phẩm đang vô hiệu hóa"
            icon={AlertTriangle}
            value={inactiveCount.toLocaleString()}
            color="#ef4444"
          />

        </motion.div>

        {/* ===== Bảng sản phẩm ===== */}
        <ProductListSection
          onAddClick={openAddModal}
          onEditClick={(product) => openEditModal(product.id)}
          reloadFlag={reloadFlag}
        />

        {/* ===== Form Modal (Add / Edit) ===== */}
        <ProductFormModal
          productId={editingProductId}
          isOpen={isAddModalOpen}
          onClose={() => setAddModalOpen(false)}
          onSubmitSuccess={handleReload}
        />
      </main>
    </div>
  );
};

export default ProductsPage;
