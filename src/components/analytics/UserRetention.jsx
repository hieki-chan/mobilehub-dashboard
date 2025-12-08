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
import { motion } from "framer-motion";

const duLieuGiuChanNguoiDung = [
  { name: "Tuần 1", GiuChan: 100 },
  { name: "Tuần 2", GiuChan: 76 },
  { name: "Tuần 3", GiuChan: 60 },
  { name: "Tuần 4", GiuChan: 50 },
  { name: "Tuần 5", GiuChan: 45 },
  { name: "Tuần 6", GiuChan: 40 },
  { name: "Tuần 7", GiuChan: 35 },
  { name: "Tuần 8", GiuChan: 30 },
];

const GiuChanNguoiDung = () => {
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
        Tỷ lệ giữ chân người dùng
      </h2>

      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <LineChart data={duLieuGiuChanNguoiDung}>
            {/* THAY ĐỔI: stroke lưới */}
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="name" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip
              // THAY ĐỔI: Tooltip nền trắng
              contentStyle={{
                backgroundColor: "#fff",
                borderColor: "#e5e7eb",
              }}
              itemStyle={{ color: "#374151" }}
              formatter={(value) => [`${value}%`, "Tỷ lệ giữ chân"]}
            />
            <Legend
              formatter={() => "Tỷ lệ giữ chân"}
              // THAY ĐỔI: Màu chữ legend
              wrapperStyle={{ color: "#374151" }}
            />
            <Line
              type="monotone"
              dataKey="GiuChan"
              stroke="#8B5CF6"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default GiuChanNguoiDung;