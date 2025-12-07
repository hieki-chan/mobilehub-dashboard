import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";

const Monthly_Sales_Data = [
  { month: "Tháng 1", Sales: 4000 },
  { month: "Tháng 2", Sales: 3000 },
  { month: "Tháng 3", Sales: 5000 },
  { month: "Tháng 4", Sales: 4500 },
  { month: "Tháng 5", Sales: 6000 },
  { month: "Tháng 6", Sales: 5500 },
  { month: "Tháng 7", Sales: 7000 },
];

const OverviewSalesChart = () => {
  const [SelectedTimeRange, setSelectedTimeRange] = useState("Quý này");

  return (
    <motion.div
      className="bg-white shadow-lg rounded-xl p-5 text-center lg:col-span-2 border-2 border-black"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: 0.2 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-900">
          Tổng quan doanh thu
        </h2>

        <select
          className="bg-gray-100 text-gray-900 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400 border border-black"
          value={SelectedTimeRange}
          onChange={(e) => setSelectedTimeRange(e.target.value)}
        >
          <option>Tuần này</option>
          <option>Tháng này</option>
          <option>Quý này</option>
          <option>Năm nay</option>
        </select>
      </div>

      <div className="w-full h-80">
        <ResponsiveContainer>
          <AreaChart data={Monthly_Sales_Data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" stroke="#111827" />
            <YAxis stroke="#111827" />
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
            <Area
              type="monotone"
              dataKey="Sales"
              stroke="#4c1d95"
              fill="#4c1d95"
              fillOpacity={0.5}
            />
            <Legend
              formatter={() => "Doanh thu"}
              wrapperStyle={{ color: "#111827" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default OverviewSalesChart;
