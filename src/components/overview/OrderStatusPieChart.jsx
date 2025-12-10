import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { motion } from "framer-motion";
import { fetchOrderStatusStats } from "../../api/orderApi";

// Ánh xạ trạng thái → tiếng Việt
const STATUS_MAP = {
  PENDING: "Đang chờ xử lý",
  DELIVERED: "Đã giao hàng",
  FAILED: "Thất bại",
  CANCELLED: "Đã hủy",
};

// Màu sắc hợp lý theo ý nghĩa trạng thái
const COLORS = {
  PENDING: "#3b82f6",    // xanh dương nhạt → đang xử lý
  DELIVERED: "#10b981",  // xanh lá → thành công
  FAILED: "#ef4444",     // đỏ → thất bại
  CANCELLED: "#f59e0b",  // vàng cam → hủy
};

const OrderStatusPieChart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchOrderStatusStats()
      .then((data) => {
        const formatted = data.map((item) => ({
          name: STATUS_MAP[item.status] || item.status,
          value: item.count,
          originalStatus: item.status, // để chọn đúng màu
        }));
        setChartData(formatted);
      })
      .catch((err) => console.error("Error loading pie chart data:", err));
  }, []);

  return (
    <motion.div
      className="bg-white bg-opacity-80 shadow-lg backdrop-blur-md rounded-xl p-5 border border-gray-300"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <h2 className="text-lg font-medium mb-4 text-gray-800">Tỷ lệ đơn hàng theo trạng thái</h2>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              outerRadius={110}
              dataKey="value"
              label={({ name, value }) => `${name}: ${value}`}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[entry.originalStatus] || "#8884d8"}
                />
              ))}
            </Pie>

            <Tooltip
              formatter={(value, _, props) => [
                `${value} đơn`,
                props.payload.name,
              ]}
            />

            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default OrderStatusPieChart;
