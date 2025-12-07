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
      className="bg-white shadow-lg rounded-xl p-6 border-2 border-black mt-7"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.4 }}
    >
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Hiệu suất sản phẩm
      </h2>

      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={Product_Performance_Data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="name" stroke="#111827" />
            <YAxis stroke="#111827" />
            <Tooltip
              formatter={(value, name) => [
                `${value} đơn vị`,
                name.replaceAll("_", " "),
              ]}
              contentStyle={{
                backgroundColor: "#ffffff",
                borderColor: "#000",
              }}
              itemStyle={{ color: "#111827" }}
            />
            <Legend formatter={(value) => value.replaceAll("_", " ")} />
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
