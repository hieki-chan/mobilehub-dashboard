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

const SalesbyCategory = [
  { name: "Điện tử", Value: 400 },
  { name: "Quần áo", Value: 300 },
  { name: "Nhà & Vườn", Value: 200 },
  { name: "Sách", Value: 100 },
  { name: "Khác", Value: 160 },
];

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088fe"];

const SalesbyCategoryChart = () => {
  return (
    <motion.div
      // THAY ĐỔI: bg-white, shadow-sm, border-gray-200
      className="bg-white shadow-sm rounded-xl p-5 border border-gray-200"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.3, delay: 0.7 }}
    >
      {/* THAY ĐỔI: text-gray-800 */}
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Doanh thu theo danh mục
      </h2>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={SalesbyCategory}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="Value"
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
            >
              {SalesbyCategory.map((item, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => [
                `${value.toLocaleString()} ₫`,
                "Doanh thu",
              ]}
              // THAY ĐỔI: Tooltip style
              contentStyle={{
                backgroundColor: "#fff",
                borderColor: "#e5e7eb",
              }}
              itemStyle={{ color: "#374151" }}
            />
            <Legend
              formatter={() => "Doanh thu"}
              // THAY ĐỔI: Legend style
              wrapperStyle={{ color: "#374151" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default SalesbyCategoryChart;