import React from "react";
import { motion } from "framer-motion";
import { DollarSign, ShoppingBag, TrendingUp, Users } from "lucide-react";

const INSIGHTS = [
  {
    icon: TrendingUp,
    color: "text-green-500",
    insight:
      "Doanh thu tăng 15% so với tháng trước, chủ yếu nhờ chiến dịch email thành công.",
  },
  {
    icon: Users,
    color: "text-blue-500",
    insight:
      "Tỷ lệ giữ chân khách hàng tăng 8% sau khi ra mắt chương trình khách hàng thân thiết mới.",
  },
  {
    icon: ShoppingBag,
    color: "text-purple-500",
    insight:
      'Danh mục sản phẩm "Điện tử" cho thấy tiềm năng tăng trưởng cao nhất dựa trên xu hướng thị trường gần đây.',
  },
  {
    icon: DollarSign,
    color: "text-yellow-500",
    insight:
      "Tối ưu hóa chiến lược giá có thể giúp tăng lợi nhuận tổng thể thêm 5-7%.",
  },
];

const AIPoweredInsights = () => {
  return (
    <motion.div
      // THAY ĐỔI: bg-white, shadow-sm, border-gray-200
      className="bg-white shadow-sm rounded-xl p-6 border border-gray-200"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
    >
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Thông Tin Phân Tích Từ AI
      </h2>

      <div className="space-y-4">
        {INSIGHTS.map((item, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div className={`p-2 rounded-full bg-opacity-10 ${item.color.replace('text-', 'bg-')}`}>
              <item.icon className={`size-[22px] ${item.color}`} />
            </div>
            {/* THAY ĐỔI: text-gray-600 */}
            <p className="text-gray-600">{item.insight}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default AIPoweredInsights;