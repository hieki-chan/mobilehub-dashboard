import React from "react";
import { Package, User, Mail, DollarSign, Calendar, Shield } from "lucide-react";
import GenericTableView from "../common_components/GenericTableView";
import OrderStatusBagde from "../common_components/badges/OrderStatusBagde";

const OrderTableView = ({ orders = [], onEdit, onDelete }) => (
  <GenericTableView
    data={orders}
    entityName="đơn hàng"
    onDelete={onDelete}
    onEdit={onEdit}
    columns={[
      { key: "id", label: "Mã đơn", icon: Package },
      {
        key: "userId",
        label: "Khách hàng",
        icon: User,
      },
      {
        key: "payment",
        label: "Thanh toán",
        icon: Shield,
      },
      {
        key: "totalPrice",
        label: "Tổng tiền",
        icon: DollarSign,
        render: (o) => o.totalPrice?.toLocaleString("vi-VN") + " ₫",
      },
      {
        key: "status",
        label: "Trạng thái",
        icon: Shield,
        render: (o) => <OrderStatusBagde order={o} />,
      },
      {
        key: "createdDate",
        label: "Ngày tạo",
        icon: Calendar,
        render: (o) =>
          new Date(o.createdDate).toLocaleString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }),
      },
    ]}
  />
);

export default OrderTableView;
