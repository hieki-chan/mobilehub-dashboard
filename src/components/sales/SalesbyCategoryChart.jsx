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
      className="bg-white shadow-lg rounded-xl p-5 border-2 border-black"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.3, delay: 0.7 }}
    >
      <h2 className="text-xl font-semibold mb-4 text-gray-900">
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
              contentStyle={{
                backgroundColor: "#ffffff",
                borderColor: "#d1d5db",
              }}
              itemStyle={{ color: "#111827" }}
            />
            <Legend
              formatter={() => "Doanh thu"}
              wrapperStyle={{ color: "#111827" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default SalesbyCategoryChart;
