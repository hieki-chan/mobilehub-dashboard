import React from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// 📊 Dữ liệu đơn hàng theo ngày
const DuLieu_DonHang = [
  { ngay: "07/01", DonHang: 48 },
  { ngay: "07/02", DonHang: 42 },
  { ngay: "07/03", DonHang: 49 },
  { ngay: "07/04", DonHang: 62 },
  { ngay: "07/05", DonHang: 55 },
  { ngay: "07/06", DonHang: 52 },
  { ngay: "07/07", DonHang: 62 },
];

const BieuDoDonHangHangNgay = () => {
  return (
    <motion.div
      // THAY ĐỔI: bg-white, shadow-sm, border-gray-200
      className="bg-white shadow-sm rounded-xl p-5 border border-gray-200"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {/* THAY ĐỔI: text-gray-800 */}
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Đơn hàng hàng ngày
      </h2>

      <div className="h-80">
        <ResponsiveContainer width={"100%"} height={"100%"}>
          <LineChart data={DuLieu_DonHang}>
            {/* THAY ĐỔI: stroke lưới nhạt */}
            <CartesianGrid strokeDasharray={"3 3"} stroke="#e5e7eb" />
            <XAxis
              dataKey={"ngay"}
              // THAY ĐỔI: stroke trục đậm hơn
              stroke="#6b7280"
              label={{
                value: "Ngày",
                position: "insideBottom",
                offset: -5,
                fill: "#6b7280", // THAY ĐỔI: fill chữ đậm
              }}
            />
            <YAxis
              stroke="#6b7280"
              label={{
                value: "Số đơn",
                angle: -90,
                position: "insideLeft",
                fill: "#6b7280", // THAY ĐỔI: fill chữ đậm
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff", // THAY ĐỔI: Nền trắng
                borderColor: "#e5e7eb", // THAY ĐỔI: Viền nhạt
              }}
              itemStyle={{ color: "#374151" }} // THAY ĐỔI: Chữ đậm
              labelStyle={{ color: "#374151" }} // THAY ĐỔI: Chữ đậm
              formatter={(value) => [`${value} đơn`, "Số lượng"]}
              labelFormatter={(label) => `Ngày ${label}`}
            />
            <Line
              type="monotone"
              dataKey="DonHang"
              stroke="#6366f1"
              strokeWidth={3}
              dot={{ fill: "#6366f1", strokeWidth: 2, r: 5 }}
              activeDot={{ r: 8, strokeWidth: 2 }}
            />
            <Legend
              formatter={() => "Số lượng đơn hàng"}
              wrapperStyle={{ color: "#374151" }} // THAY ĐỔI: Chữ legend đậm
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default BieuDoDonHangHangNgay;