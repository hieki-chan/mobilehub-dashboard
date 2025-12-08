import { motion } from "framer-motion";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const Product_Performance_Data = [
  { name: "Sản phẩm A", Doanh_số: 4000, Doanh_thu: 2650, Lợi_nhuận: 2200 },
  { name: "Sản phẩm B", Doanh_số: 3000, Doanh_thu: 1398, Lợi_nhuận: 2210 },
  { name: "Sản phẩm C", Doanh_số: 2000, Doanh_thu: 5500, Lợi_nhuận: 2290 },
  { name: "Sản phẩm D", Doanh_số: 2780, Doanh_thu: 3908, Lợi_nhuận: 2000 },
  { name: "Sản phẩm E", Doanh_số: 1890, Doanh_thu: 4800, Lợi_nhuận: 2181 },
];

const ProductPerformance = () => {
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
        Hiệu suất sản phẩm
      </h2>

      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={Product_Performance_Data}>
            {/* THAY ĐỔI: stroke lưới */}
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="name" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip
              formatter={(value, name) => [
                `${value} đơn vị`,
                name.replaceAll("_", " "),
              ]}
              // THAY ĐỔI: Tooltip nền trắng
              contentStyle={{
                backgroundColor: "#fff",
                borderColor: "#e5e7eb",
              }}
              itemStyle={{ color: "#374151" }}
            />
            <Legend
              formatter={(value) => value.replaceAll("_", " ")}
              // THAY ĐỔI: Màu chữ legend
              wrapperStyle={{ color: "#374151" }}
            />
            <Bar dataKey="Doanh_số" fill="#8B5CF6" />
            <Bar dataKey="Doanh_thu" fill="#10B981" />
            <Bar dataKey="Lợi_nhuận" fill="#F59E0B" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default ProductPerformance;