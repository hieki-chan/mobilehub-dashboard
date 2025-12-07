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
      className="bg-white shadow-lg rounded-xl p-5 border-2 border-black"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h2 className="text-xl font-semibold mb-4 text-black">
        Đơn hàng hàng ngày
      </h2>

      <div className="h-80">
        <ResponsiveContainer width={"100%"} height={"100%"}>
          <LineChart data={DuLieu_DonHang}>
            <CartesianGrid strokeDasharray={"3 3"} stroke="#4b5563" />
            <XAxis
              dataKey={"ngay"}
              stroke="#000"
              label={{
                value: "Ngày",
                position: "insideBottom",
                offset: -5,
                fill: "#000",
              }}
            />
            <YAxis
              stroke="#000"
              label={{
                value: "Số đơn",
                angle: -90,
                position: "insideLeft",
                fill: "#000",
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(31, 45, 55, 0.8)",
                borderColor: "#4b5563",
              }}
              itemStyle={{ color: "#000" }}
              labelStyle={{ color: "#000" }}
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
              wrapperStyle={{ color: "#000" }}
              formatter={() => "Số lượng đơn hàng"}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default BieuDoDonHangHangNgay;
