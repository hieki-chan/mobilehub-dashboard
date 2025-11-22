import React from "react";
import { confirmOrder, setOrderDelivered, setOrderFailed } from "../../../api/orderApi";

const OrderStatusBadge = ({ order }) => {
  let bgClass = "bg-gray-200 text-gray-600";
  let label = order.status;

  switch (order.status) {
    case "PENDING":
      bgClass = "bg-yellow-100 text-yellow-800";
      label = "Chờ xử lý";
      break;
    case "PAID":
      bgClass = "bg-blue-100 text-blue-700";
      label = "Đã thanh toán";
      break;
    case "SHIPPING":
      bgClass = "bg-purple-100 text-purple-700";
      label = "Đang giao";
      break;
    case "DELIVERED":
      bgClass = "bg-green-100 text-green-700";
      label = "Đã giao";
      break;
    case "CANCELLED":
      bgClass = "bg-red-100 text-red-700";
      label = "Đã huỷ";
      break;
    case "FAILED":
      bgClass = "bg-gray-300 text-gray-800";
      label = "Thanh toán thất bại";
      break;
    default:
      bgClass = "bg-gray-200 text-gray-600";
      label = "Không xác định";
  }

  const handleClick = async (action) => {
    try {
      let updatedOrder = null;
      if (action === "confirm") updatedOrder = await confirmOrder(order.id);
      if (action === "delivered") updatedOrder = await setOrderDelivered(order.id);
      if (action === "failed") updatedOrder = await setOrderFailed(order.id);
      if (updatedOrder) {

      }
    } catch (err) {
      console.error("❌ Lỗi thao tác đơn:", err);
    }
  };

  const getActions = () => {
    if (order.status === "PENDING") return ["confirm", "failed"];
    if (order.status === "PAID" || order.status === "SHIPPING") return ["delivered", "failed"];
    return [];
  };

  const actions = getActions();

  return (
    <div className="flex items-center gap-1">
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${bgClass}`}>
        {label}
      </span>
      {actions.map((a) => (
        <button
          key={a}
          onClick={() => handleClick(a)}
          className={`px-2 py-0.5 rounded text-xs font-medium ${
            a === "confirm"
              ? "bg-blue-500 text-white"
              : a === "delivered"
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          {a === "confirm" ? "Xác nhận" : a === "delivered" ? "Đã giao" : "Hủy"}
        </button>
      ))}
    </div>
  );
};

export default OrderStatusBadge;
