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
      className="bg-white shadow-lg rounded-xl p-5 border-2 border-black"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h2 className="text-xl font-semibold mb-4 text-black">
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
              contentStyle={{
                backgroundColor: "rgba(31, 41, 55, 0.8)",
                borderColor: "#4b5563",
              }}
              itemStyle={{ color: "#e5e7eb" }}
              formatter={(value, name) => [`${value} đơn hàng`, name]}
              labelFormatter={() => "Chi tiết"}
            />
            <Legend
              formatter={(value) => (
                <span style={{ color: "black" }}>{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default StatusDistributionChart;
