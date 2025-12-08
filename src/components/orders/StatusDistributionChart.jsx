import React from "react";
import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const Status_Distribution_Data = [
  { name: "Chờ xử lý", value: 60 },
  { name: "Đang xử lý", value: 105 },
  { name: "Đã gửi hàng", value: 80 },
  { name: "Đã giao", value: 210 },
];

const COLORS = ["#ff6b6b", "#4ecdc4", "#45b7d1", "#fed766", "#2ab7ca"];

const StatusDistributionChart = () => {
  return (
    <motion.div
      // THAY ĐỔI: bg-white, shadow-sm, border-gray-200
      className="bg-white shadow-sm rounded-xl p-5 border border-gray-200"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {/* THAY ĐỔI: text-gray-800 */}
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Phân bố trạng thái đơn hàng
      </h2>

      <div className="h-80">
        <ResponsiveContainer width={"100%"} height={"100%"}>
          <PieChart>
            <Pie
              data={Status_Distribution_Data}
              cx={"50%"}
              cy={"50%"}
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
            >
              {Status_Distribution_Data.map((item, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              // THAY ĐỔI: Tooltip nền trắng, chữ đậm
              contentStyle={{
                backgroundColor: "#fff",
                borderColor: "#e5e7eb",
              }}
              itemStyle={{ color: "#374151" }}
              formatter={(value, name) => [`${value} đơn hàng`, name]}
              labelFormatter={() => "Chi tiết"}
            />
            <Legend
              // THAY ĐỔI: Màu chữ legend đậm
              formatter={(value) => (
                <span style={{ color: "#374151" }}>{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default StatusDistributionChart;