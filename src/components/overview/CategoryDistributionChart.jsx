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

const Category_Data = [
  { name: "Điện tử", value: 4500 },
  { name: "Quần áo", value: 3200 },
  { name: "Nhà & Vườn", value: 2800 },
  { name: "Sách", value: 2100 },
  { name: "Thể thao & Ngoài trời", value: 1800 },
];

const COLORS = ["#6366f1", "#6b8afa", "#ec4899", "#10b981", "#f59e0b"];

const CategoryDistributionChart = () => {
  return (
    <motion.div
      // THAY ĐỔI: bg-white, shadow-sm, border-gray-200
      className="bg-white shadow-sm rounded-xl p-5 border border-gray-200"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {/* THAY ĐỔI: text-gray-800 */}
      <h2 className="text-lg font-medium mb-4 text-gray-800">
        Phân bố danh mục sản phẩm
      </h2>

      <div className="h-80">
        <ResponsiveContainer width={"100%"} height={"100%"}>
          <PieChart>
            <Pie
              data={Category_Data}
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
              {Category_Data.map((item, index) => (
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
              formatter={(value, name) => [`${value} sản phẩm`, name]}
              labelFormatter={() => "Chi tiết"}
            />
            <Legend
              formatter={(value) => (
                // THAY ĐỔI: Legend chữ đậm
                <span style={{ color: "#374151" }}>{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default CategoryDistributionChart;