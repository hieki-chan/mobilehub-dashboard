import React from "react";
import Header from "../components/common_components/Header";
import AnalyticsStatCards from "../components/analytics/AnalyticsStatCards";
import RevenueChart from "../components/analytics/RevenueChart";
import ChannelPerformance from "../components/analytics/ChannelPerformance";
import ProductPerformance from "../components/analytics/ProductPerformance";
import UserRetention from "../components/analytics/UserRetention";
import CustomerSegmentation from "../components/analytics/CustomerSegmentation";
import AIPoweredInsights from "../components/analytics/AIPoweredInsights";
import UserGrowthChart from "../components/users/UserGrowthChart";
import UserActivityHeatMap from "../components/users/UserActivityHeatMap";
import UserDemographicChart from "../components/users/UserDemographicChart";

import SalesTrendChart from "../components/products/SalesTrendChart";
import CategoryDistributionChart from "../components/overview/CategoryDistributionChart";

import DailyOrdersChart from "../components/orders/DailyOrdersChart";
import StatusDistributionChart from "../components/orders/StatusDistributionChart";

const AnalyticsPage = () => {
  return (
    // THAY ĐỔI: bg-gray-900 -> bg-gray-50, text-gray-900
    <div className="flex-1 overflow-auto relative z-10 bg-gray-50 text-gray-900">
      <Header title="Bảng điều khiển phân tích" />

      <main className='mx-auto py-6 px-4 lg:px-8'>
        <AnalyticsStatCards />

        {/* Biểu đồ doanh thu */}
        <RevenueChart />

        {/* Hiệu suất kênh, sản phẩm, giữ chân người dùng, phân khúc khách hàng */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-7">
          <ChannelPerformance />
          <ProductPerformance />
          <UserRetention />
          <CustomerSegmentation />
        </div>

        {/* BIỂU ĐỒ NGƯỜI DÙNG */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <UserGrowthChart />
          <UserActivityHeatMap />
          <UserDemographicChart />
        </div>

        {/* ===== Biểu đồ ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5  pt-5">
          <SalesTrendChart />
          <CategoryDistributionChart />
        </div>

        {/* Biểu đồ đơn hàng theo ngày và trạng thái đơn hàng */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-7 pt-5">
          <DailyOrdersChart />
          <StatusDistributionChart />
        </div>

        {/* Thông tin chi tiết AI */}
        <AIPoweredInsights />
      </main>
    </div>
  );
};

export default AnalyticsPage;