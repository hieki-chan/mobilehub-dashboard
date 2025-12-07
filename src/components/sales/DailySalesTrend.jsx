import React from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Daily_Sales_Data = [
  { name: "Thứ 2", Sales: 800 },
  { name: "Thứ 3", Sales: 1250 },
  { name: "Thứ 4", Sales: 500 },
  { name: "Thứ 5", Sales: 1000 },
  { name: "Thứ 6", Sales: 1300 },
  { name: "Thứ 7", Sales: 1550 },
  { name: "Chủ nhật", Sales: 1150 },
];

const DailySalesTrend = () => {
  return (
    <motion.div
      className="bg-white shadow-lg rounded-xl p-5 border-2 border-black"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.7 }}
    >
      <h2 className="text-xl font-semibold mb-4 text-gray-900">
        Xu hướng doanh thu hàng ngày
      </h2>

      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={Daily_Sales_Data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="name" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
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
            <Bar dataKey="Sales" fill="#10b981" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default DailySalesTrend;
