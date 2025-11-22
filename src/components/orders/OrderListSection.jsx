import React, { useState, useEffect } from "react";
import ListPageLayout from "../common_components/ListPageLayout";
import ListFilterBar from "../common_components/ListFilterBar";

import OrderGridView from "./OrderGridView";
import OrderTableView from "./OrderTableView";

import {
  fetchAdminOrdersPaged,
} from "../../api/orderApi";

import { showPopupConfirm } from "../common_components/PopupConfirm";

const OrderListSection = ({ reloadFlag }) => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);

  const [viewMode, setViewMode] = useState("table");

  // FILTER STATE
  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const [selectedPayment, setSelectedPayment] = useState("ALL");

  // SEARCH STATE
  const [searchField, setSearchField] = useState("code");
  const [searchQuery, setSearchQuery] = useState("");

  const searchOptions = [
    { label: "Mã đơn", value: "code" },
    { label: "Người đặt", value: "customerName" },
    { label: "Email", value: "email" },
  ];

  // PAGINATION
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(15);

  const totalItems = filteredOrders.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  // FETCH ORDERS
  useEffect(() => {
    loadOrders();
  }, [reloadFlag]);

  const loadOrders = async () => {
    try {
      const data = await fetchAdminOrdersPaged({
        page: 0,
        size: 200,
        orderStatus: selectedStatus,
        paymentMethod: selectedPayment,
      });

      if (data?.content) {
        const normalized = data.content.map((o) => ({
          id: o.id,
          code: o.code ?? "—",
          customerName: o.customerName ?? "Khách vãng lai",
          email: o.email ?? "—",
          totalPrice: o.totalPrice ?? 0,
          status: o.status,
          payment: o.paymentMethod,
          createdDate: o.createdAt,
          userId: o.userId
        }));

        setOrders(normalized);
        setFilteredOrders(normalized);
      }
    } catch (err) {
      console.error("❌ Lỗi tải đơn hàng:", err);
    }
  };

  // APPLY LOCAL FILTER
  useEffect(() => {
    handleFilter();
  }, [orders, selectedStatus, selectedPayment, searchField, searchQuery]);

  const handleFilter = () => {
    let result = [...orders];

    if (selectedStatus !== "ALL")
      result = result.filter((o) => o.status === selectedStatus);

    if (selectedPayment !== "ALL")
      result = result.filter((o) => o.payment === selectedPayment);

    if (searchQuery.trim() !== "") {
      result = result.filter((o) =>
        (o[searchField] ?? "")
          .toString()
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
    }

    setFilteredOrders(result);
    setCurrentPage(1);
  };

  const getPageOrders = () => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredOrders.slice(start, start + itemsPerPage);
  };

  const handleEdit = async(id) =>
  {

  }

  // DELETE
  const handleDelete = async (id) => {
    const confirmed = await showPopupConfirm(
      "Xác nhận xoá đơn hàng",
      "Bạn có chắc muốn xoá đơn hàng này?"
    );
    if (!confirmed) return;
    try {
      await deleteAdminOrder(id);
      setOrders((prev) => prev.filter((o) => o.id !== id));
    } catch (err) {
      console.error("❌ Lỗi xoá đơn hàng:", err);
    }
  };

  // CSV EXPORT
  const exportToCSV = () => {
    const csv = [
      ["Mã đơn", "Khách hàng", "Email", "Tổng tiền", "Thanh toán", "Trạng thái"].join(","),
      ...filteredOrders.map((o) =>
        [
          o.code,
          o.customerName,
          o.email,
          o.total,
          o.payment,
          o.status,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "don_hang.csv";
    a.click();
  };

  const handleRefresh = () => {
    setSearchQuery("");
    loadOrders();
    setCurrentPage(1);
  };

  return (
    <ListPageLayout
      title="Đơn hàng"
      addLabel=""
      viewMode={viewMode}
      setViewMode={setViewMode}
      onExport={exportToCSV}
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      searchField={searchField}
      onSearchFieldChange={setSearchField}
      searchOptions={searchOptions}
      currentPage={currentPage}
      totalPages={totalPages}
      itemsPerPage={itemsPerPage}
      totalItems={totalItems}
      startItem={startItem}
      endItem={endItem}
      onPageChange={setCurrentPage}
      onItemsPerPageChange={(num) => {
        setItemsPerPage(num);
        setCurrentPage(1);
      }}
      onRefresh={handleRefresh}
    >
      <ListFilterBar
        filters={[
          {
            label: "Thanh toán",
            value: selectedPayment,
            onChange: setSelectedPayment,
            options: [
              { label: "Tất cả", value: "ALL" },
              { label: "Thanh toán khi giao hàng", value: "COD" },
              { label: "Chuyển khoản qua ngân hàng", value: "BANK_TRANSFER" },
              { label: "Mua trả góp", value: "INSTALLMENT" },
            ],
          },
          {
            label: "Trạng thái",
            value: selectedStatus,
            onChange: setSelectedStatus,
            options: [
              { label: "Tất cả", value: "ALL" },
              { label: "Chờ xác nhận", value: "PENDING" },
              { label: "Đã thanh toán", value: "PAID" },
              { label: "Đang giao hàng", value: "SHIPPING" },
              { label: "Giao hàng thành công", value: "DELIVERED" },
              { label: "Đã huỷ", value: "CANCELLED" },
              { label: "Giao hàng thất bại", value: "FAILED" },
            ],
          },
        ]}
      />

      {viewMode === "table" ? (
        <OrderTableView orders={getPageOrders()} onEdit={handleEdit} onDelete={handleDelete} />
      ) : (
        <OrderGridView orders={getPageOrders()} onDelete={handleDelete} />
      )}
    </ListPageLayout>
  );
};

export default OrderListSection;
