import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Channel_Data = [
  { name: "Tìm kiếm tự nhiên", Value: 4500 },
  { name: "Quảng cáo trả phí", Value: 3000 },
  { name: "Truy cập trực tiếp", Value: 2500 },
  { name: "Mạng xã hội", Value: 2700 },
  { name: "Giới thiệu từ web khác", Value: 1800 },
  { name: "Email marketing", Value: 2400 },
];

const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff8042",
  "#0088FE",
  "#00C49F",
];

const ChannelPerformance = () => {
  return (
    <motion.div
      // THAY ĐỔI: bg-white, shadow-sm, border-gray-200
      className="bg-white shadow-sm rounded-xl p-6 border border-gray-200 mt-7"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.4 }}
    >
      {/* THAY ĐỔI: text-gray-800 */}
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Hiệu suất kênh truy cập
      </h2>

      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={Channel_Data}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              dataKey="Value"
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
            >
              {Channel_Data.map((item, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              // THAY ĐỔI: Tooltip nền trắng
              contentStyle={{
                backgroundColor: "#fff",
                borderColor: "#e5e7eb",
              }}
              itemStyle={{ color: "#374151" }}
              formatter={(value, name) => [`${value} lượt truy cập`, "Kênh"]}
            />
            <Legend
              // THAY ĐỔI: Màu chữ legend
              wrapperStyle={{ color: "#374151" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default ChannelPerformance;