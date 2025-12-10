import { React, useState, useEffect } from "react";

import Header from "../components/common_components/Header";
import StatCards from "../components/common_components/StatCards";
import SaleOverviewChart from "../components/overview/SaleOverviewChart";
import CategoryDistributionChart from "../components/overview/CategoryDistributionChart";
import SalesChannelChart from "../components/overview/SalesChannelChart";

import { motion } from "framer-motion";
import { BarChart2, ShoppingBag, Users, Zap, MessageSquare } from "lucide-react";
import OrderCountOverviewChart from "../components/overview/OrderCountViewChart";
import OrderStatusPieChart from "../components/overview/OrderStatusPieChart";
import BestSellingProductChart from "../components/overview/BestSellingProductChart";

import { fetchNewUsersThisMonth } from "../api/UserApi";
import { fetchMonthlySales } from "../api/orderApi";
import { fetchTotalSoldQuantity } from "../api/orderApi";
import { getRatings } from "../api/ratingApi";

const OverviewPage = () => {
  const [newUsers, setNewUsers] = useState(0);
  const [currentMonthSales, setCurrentMonthSales] = useState(0);
  const [salesChange, setSalesChange] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);

  useEffect(() => {
    fetchNewUsersThisMonth().then((res) => setNewUsers(res));
  }, []);

  useEffect(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;

    fetchMonthlySales().then((data) => {
      const thisMonth = data.find(item => item.year === year && item.month === month);
      const prevMonth = data.find(item => item.year === year && item.month === month - 1);

      const current = thisMonth ? thisMonth.totalAmount : 0;
      const previous = prevMonth ? prevMonth.totalAmount : 0;

      setCurrentMonthSales(current);

      if (previous > 0) {
        const percentChange = ((current - previous) / previous) * 100;
        setSalesChange(Number(percentChange.toFixed(1)));
      } else {
        setSalesChange(0);
      }
    });
  }, []);

  useEffect(() => {
    getRatings(0, 1000).then(res => {
      const reviews = res.content;
      const total = res.totalElements ?? reviews.length;
      setTotalReviews(total);

      if (total > 0) {
        const avg =
          reviews.reduce((sum, r) => sum + (r.stars || 0), 0) / total;

        setAverageRating(avg.toFixed(1));
      }
    });
  }, []);

  const [totalSold, setTotalSold] = useState(0);

  useEffect(() => {
    fetchTotalSoldQuantity().then(setTotalSold);
  }, []);

  return (
    <div className="flex-1 overflow-auto relative z-10 bg- bg-gray-50 text-gray-900">
      {/* Tiêu đề trang */}
      <Header title="Tổng quan" />

      {/* Dữ liệu thống kê */}
      <main className="mx-auto py-6 px-4 lg:px-8">
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-7"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCards
            name="Doanh thu tháng này"
            icon={Zap}
            value={currentMonthSales.toLocaleString("vi-VN") + " ₫"}
            color="#6366f1"
            change={salesChange}
          />

          <StatCards
            name="Người dùng mới trong tháng"
            icon={Users}
            value={newUsers}
            color="#8b5cf6"
          />

          <StatCards
            name="Tổng số sản phẩm đã bán"
            icon={ShoppingBag}
            value={totalSold.toLocaleString()}
            color="#ec4899"
          />

          <StatCards
            name="Tổng số đánh giá"
            icon={MessageSquare}
            value={totalReviews.toLocaleString()}
            color="#10b981"
          />

        </motion.div>

        {/* Biểu đồ tổng quan */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <SaleOverviewChart />
          <OrderCountOverviewChart />
          <OrderStatusPieChart></OrderStatusPieChart>
          <BestSellingProductChart></BestSellingProductChart>
          <SalesChannelChart />
        </div>
      </main>
    </div>
  );
};

export default OverviewPage;
