import React from "react";
import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Legend,
  Tooltip,
} from "recharts";

const DuLieuPhanKhucKhachHang = [
  { subject: "Tương tác", NhomA: 120, NhomB: 110, fullMark: 150 },
  { subject: "Trung thành", NhomA: 98, NhomB: 130, fullMark: 150 },
  { subject: "Hài lòng", NhomA: 86, NhomB: 130, fullMark: 150 },
  { subject: "Chi tiêu", NhomA: 99, NhomB: 100, fullMark: 150 },
  { subject: "Tần suất mua", NhomA: 85, NhomB: 90, fullMark: 150 },
  { subject: "Thời gian quay lại", NhomA: 65, NhomB: 85, fullMark: 150 },
];

const PhanKhucKhachHang = () => {
  return (
    <motion.div
      // THAY ĐỔI: bg-white, shadow-sm, border-gray-200
      className="bg-white shadow-sm rounded-xl p-6 border border-gray-200"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
    >
      {/* THAY ĐỔI: text-gray-800 */}
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Phân khúc khách hàng
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <RadarChart
          data={DuLieuPhanKhucKhachHang}
          cx="50%"
          cy="50%"
          outerRadius="80%"
        >
          {/* THAY ĐỔI: stroke lưới */}
          <PolarGrid stroke="#e5e7eb" />
          <PolarAngleAxis dataKey="subject" stroke="#6b7280" />
          <PolarRadiusAxis angle={30} domain={[0, 150]} stroke="#6b7280" />
          <Radar
            name="Nhóm A"
            dataKey="NhomA"
            stroke="#8b5cf6"
            fill="#8b5cf6"
            fillOpacity={0.6}
          />
          <Radar
            name="Nhóm B"
            dataKey="NhomB"
            stroke="#10b981"
            fill="#10b981"
            fillOpacity={0.6}
          />
          <Legend
            formatter={(value) => (value === "NhomA" ? "Nhóm A" : "Nhóm B")}
            // THAY ĐỔI: Màu chữ legend
            wrapperStyle={{ color: "#374151" }}
          />
          <Tooltip
            formatter={(value, name) => [
              value,
              name === "NhomA" ? "Nhóm A" : "Nhóm B",
            ]}
            // THAY ĐỔI: Tooltip nền trắng
            contentStyle={{
              backgroundColor: "#fff",
              borderColor: "#e5e7eb",
            }}
            itemStyle={{ color: "#374151" }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default PhanKhucKhachHang;