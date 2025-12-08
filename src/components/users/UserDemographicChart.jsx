import React from "react";
import { motion } from "framer-motion";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

// Màu sắc biểu đồ
const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088fe"];

// Dữ liệu nhân khẩu học người dùng
const DuLieuNhanKhauHoc = [
  { name: "18-24 tuổi", value: 20 },
  { name: "25-34 tuổi", value: 30 },
  { name: "35-44 tuổi", value: 25 },
  { name: "45-54 tuổi", value: 15 },
  { name: "55 tuổi trở lên", value: 10 },
];

const UserDemographicChart = () => {
  return (
    <motion.div
      // THAY ĐỔI: bg-white, shadow-sm, border-gray-200
      className="bg-white shadow-sm rounded-xl p-5 lg:col-span-2 border border-gray-200"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.8, delay: 1.2 }}
    >
      {/* THAY ĐỔI: text-gray-800 */}
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Nhân khẩu học người dùng
      </h2>

      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={DuLieuNhanKhauHoc}
              cx={"50%"}
              cy={"50%"}
              outerRadius={100}
              fill="#8884d8"
              labelLine={false}
              dataKey="value"
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
            >
              {DuLieuNhanKhauHoc.map((items, index) => (
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
              formatter={(value, name) => [`${value}%`, `${name}`]}
              labelFormatter={(label) => `Nhóm tuổi: ${label}`}
            />
            <Legend
              formatter={(value) => (
                // THAY ĐỔI: Màu chữ legend đậm
                <span style={{ color: "#374151" }}>{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default UserDemographicChart;