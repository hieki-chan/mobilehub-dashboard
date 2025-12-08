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

const DuLieuDoanhThu = [
  { month: "Tháng 1", DoanhThu: 4200, MucTieu: 5000 },
  { month: "Tháng 2", DoanhThu: 3000, MucTieu: 3200 },
  { month: "Tháng 3", DoanhThu: 5500, MucTieu: 4500 },
  { month: "Tháng 4", DoanhThu: 4500, MucTieu: 4200 },
  { month: "Tháng 5", DoanhThu: 5500, MucTieu: 6000 },
  { month: "Tháng 6", DoanhThu: 4500, MucTieu: 4800 },
  { month: "Tháng 7", DoanhThu: 7000, MucTieu: 6500 },
];

const RevenueChart = () => {
  const [KhoangThoiGian, setKhoangThoiGian] = useState("Quý này");

  return (
    <motion.div
      // THAY ĐỔI: bg-white, border-gray-200
      className="bg-white shadow-sm rounded-xl p-5 text-center lg:col-span-2 border border-gray-200 mb-2"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: 0.2 }}
    >
      <div className="flex items-center justify-between mb-6">
        {/* THAY ĐỔI: text-gray-800 */}
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Doanh thu so với Mục tiêu
        </h2>

        <select
          // THAY ĐỔI: bg-white, text-gray-700, border-gray-300
          className="bg-white border border-gray-300 text-gray-700 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-600"
          value={KhoangThoiGian}
          onChange={(e) => setKhoangThoiGian(e.target.value)}
        >
          <option>Tuần này</option>
          <option>Tháng này</option>
          <option>Quý này</option>
          <option>Năm nay</option>
        </select>
      </div>

      <div className="w-full h-80">
        <ResponsiveContainer>
          <AreaChart data={DuLieuDoanhThu}>
            {/* THAY ĐỔI: stroke lưới */}
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip
              // THAY ĐỔI: Tooltip sáng
              contentStyle={{
                backgroundColor: "#fff",
                borderColor: "#e5e7eb",
              }}
              itemStyle={{ color: "#374151" }}
              formatter={(value, name) =>
                name === "DoanhThu"
                  ? [`${value} USD`, "Doanh thu"]
                  : [`${value} USD`, "Mục tiêu"]
              }
            />
            <Legend
              // THAY ĐỔI: Màu chữ legend
              wrapperStyle={{ color: "#374151" }}
              formatter={(value) =>
                value === "DoanhThu" ? "Doanh thu" : "Mục tiêu"
              }
            />
            <Area
              type="monotone"
              dataKey="DoanhThu"
              stroke="#8b5cf6"
              fill="#8b5cf6"
              fillOpacity={0.3}
            />
            <Area
              type="monotone"
              dataKey="MucTieu"
              stroke="#10b981"
              fill="#10b981"
              fillOpacity={0.3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default RevenueChart;