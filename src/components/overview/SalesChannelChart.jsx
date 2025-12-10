import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
} from "recharts";

import { fetchBrandSales } from "../../api/ProductApi";

const COLORS = [
  "#3b82f6",
  "#9333ea",
  "#ec4899",
  "#10b981",
  "#f59e0b",
  "#34d399",
];

const SalesChannelChart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchBrandSales().then((res) => {
      console.log(res)
      const formatted = res.map(item => ({
        name: item.brand,
        Value: item.totalSold, // dùng totalSold
      }));
      setChartData(formatted);
    });
  }, []);

  return (
    <motion.div
      className="bg-white bg-opacity-80 shadow-lg backdrop-blur-md rounded-xl p-5 lg:col-span-2 border border-gray-300"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
    >
      <h2 className="text-lg font-medium mb-4 text-gray-800">
        Phân bố số lượng sản phẩm theo hãng
      </h2>

      <div className="h-80">
        <ResponsiveContainer>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#d1d5db" />
            <XAxis dataKey="name" stroke="#4b5563" />

            {/* ✅ Trục Y làm tròn max value lên số đẹp */}
            <YAxis
              stroke="#4b5563"
              domain={[0, (dataMax) => dataMax * 1.2]}
              allowDecimals={false}
            />

            <Tooltip
              formatter={(value) => [`${value.toLocaleString()} sản phẩm`, "Số lượng"]}
            />

            <Legend />

            <Bar dataKey="Value" name="Số lượng sản phẩm">
              {chartData.map((item, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default SalesChannelChart;
