import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { motion } from "framer-motion";
import { fetchBestSellers } from "../../api/orderApi";

const BestSellingProductChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchBestSellers().then((res) => setData(res));
  }, []);

  return (
    <motion.div
      className="bg-white bg-opacity-80 shadow-lg backdrop-blur-md rounded-xl p-5 border border-gray-300"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.25 }}
    >
      <h2 className="text-lg font-medium mb-4 text-gray-800">
        Top sản phẩm bán chạy
      </h2>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={data}
            margin={{ left: 20, right: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

            <XAxis type="number" stroke="#4b5563" />
            <YAxis
              dataKey="productName"
              type="category"
              width={150}
              tick={{ fontSize: 12 }}
              stroke="#4b5563"
            />

            <Tooltip
              formatter={(value) => [`${value} sản phẩm`, "Đã bán"]}
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                borderColor: "#d1d5db",
                borderRadius: "8px",
              }}
              itemStyle={{ color: "#4b5563" }}
            />

            <Bar
              dataKey="totalSold"
              animationDuration={600}
              radius={[6, 6, 6, 6]}
              fill="url(#colorSales)"
            />

            {/* Gradient đẹp hơn */}
            <defs>
              <linearGradient id="colorSales" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#60a5fa" />
                <stop offset="100%" stopColor="#2563eb" />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default BestSellingProductChart;
