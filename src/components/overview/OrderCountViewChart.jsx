import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import { fetchMonthlyOrderCount } from "../../api/orderApi"; // Import API lấy số lượng đơn hàng

const formatCurrency = (value) => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)} triệu`;
  } else if (value >= 1000) {
    return `${(value / 1000).toFixed(1)} nghìn`;
  } else {
    return value.toLocaleString();
  }
};

const OrderCountChart = () => {
  const [orderCountData, setOrderCountData] = useState([]); // State để lưu trữ số lượng đơn hàng
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    fetchMonthlyOrderCount()
      .then((data) => {
        const formattedData = Array.from({ length: 12 }, (_, i) => {
          const monthData = data.find(
            (item) => item.month - 1 === i && item.year === currentYear
          );
          return {
            month: `${i + 1}`, // Đảm bảo tháng dưới dạng chuỗi
            orderCount: monthData ? monthData.orderCount : 0, // Nếu không có dữ liệu, gán số lượng đơn hàng là 0
          };
        });
        setOrderCountData(formattedData); // Cập nhật dữ liệu vào state
      })
      .catch((error) => console.error("Lỗi khi lấy dữ liệu số lượng đơn hàng:", error));
  }, [currentYear]);

  return (
    <motion.div
      className="bg-white bg-opacity-80 shadow-lg backdrop-blur-md rounded-xl p-5 border border-gray-300"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h2 className="text-lg font-medium mb-4 text-gray-800">Tổng quan số lượng đơn hàng</h2>

      <div className="h-80">
        <ResponsiveContainer width={"100%"} height={"100%"}>
          <LineChart data={orderCountData}>
            <CartesianGrid strokeDasharray={"3 3"} stroke="#e5e7eb" />
            <XAxis
              dataKey={"month"}
              stroke="#4b5563"
              tick={{ fontSize: 12 }}
              axisLine={{ stroke: "#d1d5db", strokeWidth: 1 }}
              tickLine={{ stroke: "#d1d5db" }}
            />
            <YAxis
              stroke="#4b5563"
              tickFormatter={(value) => value.toLocaleString()} // Định dạng số lượng đơn hàng
              axisLine={{ stroke: "#d1d5db", strokeWidth: 1 }}
              tickLine={{ stroke: "#d1d5db" }}
            />
            <Tooltip
              formatter={(value) => [`${value.toLocaleString()} đơn`, "Số lượng đơn hàng"]}
              labelFormatter={(label) => `Tháng ${label}`}
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                borderColor: "#d1d5db",
                borderRadius: "8px",
              }}
              itemStyle={{ color: "#4b5563" }}
            />
            <Line
              type="monotone"
              dataKey="orderCount"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{ fill: "#3b82f6", strokeWidth: 2, r: 5 }}
              activeDot={{ r: 8, strokeWidth: 2 }}
              animationDuration={500}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default OrderCountChart;
