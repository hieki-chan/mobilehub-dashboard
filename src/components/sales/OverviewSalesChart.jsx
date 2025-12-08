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
      // THAY ĐỔI: bg-white, shadow-sm, border-gray-200 (Theme sáng)
      className="bg-white shadow-sm rounded-xl p-5 text-center lg:col-span-2 border border-gray-200"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: 0.2 }}
    >
      <div className="flex items-center justify-between mb-6">
        {/* THAY ĐỔI: text-gray-100 -> text-gray-800 */}
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Tổng quan doanh thu
        </h2>

        <select
          // THAY ĐỔI: bg-white, text-gray-700, border-gray-300
          className="bg-white border border-gray-300 text-gray-700 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-600"
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
            {/* THAY ĐỔI: stroke lưới nhạt hơn cho nền trắng */}
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip
              formatter={(value) => [
                `${value.toLocaleString()} ₫`,
                "Doanh thu",
              ]}
              // THAY ĐỔI: Tooltip nền trắng, chữ đen
              contentStyle={{
                backgroundColor: "#fff",
                borderColor: "#e5e7eb",
              }}
              itemStyle={{ color: "#374151" }}
            />
            <Area
              type="monotone"
              dataKey="Sales"
              stroke="#8b5cf6"
              fill="#8b5cf6"
              fillOpacity={0.3}
            />
            <Legend
              formatter={() => "Doanh thu"}
              // THAY ĐỔI: Legend màu chữ tối
              wrapperStyle={{ color: "#374151" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default OverviewSalesChart;