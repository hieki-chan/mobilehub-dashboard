import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, ThumbsUp, MessageSquare, AlertCircle } from "lucide-react";

import Header from "../components/common_components/Header";
import StatCards from "../components/common_components/StatCards";
import ProductRatingListSection from "../components/ratings/ProductRatingPageSection";

import { getRatings } from "../api/ratingApi";

const Rating_Stat = {
  totalReviews: "1,245",
  averageRating: "4.3",
  positiveFeedback: "86%",
  reportedReviews: "12",
};

const ProductRatingPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchBy, setSearchBy] = useState("product");


  const [totalReviews, setTotalReviews] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [positivePercent, setPositivePercent] = useState(0);
  const [replyCount, setReplyCount] = useState(0);

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

      const positive = reviews.filter(r => r.stars >= 4).length;
      const percent = total > 0 ? (positive / total) * 100 : 0;
      setPositivePercent(percent.toFixed(1));

      const replied = reviews.filter(r => r.reply != null).length;
      setReplyCount(replied);
    });
  }, []);


  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  return (
    <div className="flex-1 overflow-auto relative z-10 bg-gray-50 text-gray-900">
      <Header
        path={[
          { label: "Mobilehub", to: "/" },
          { label: "Đánh giá", to: "/reviews" },
        ]}
        userName="Admin"
      />

      <main className="py-6 px-4 lg:px-4">
        {/* Thống kê tổng quan */}
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-7"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCards
            name="Tổng số đánh giá"
            icon={MessageSquare}
            value={totalReviews.toLocaleString()}
            color="#6366f1"
          />

          <StatCards
            name="Điểm trung bình"
            icon={Star}
            value={averageRating}
            color="#f59e0b"
          />

          <StatCards
            name="Tích cực (%)"
            icon={ThumbsUp}
            value={`${positivePercent}%`}
            color="#10b981"
          />

          <StatCards
            name="Đánh giá có phản hồi"
            icon={AlertCircle}
            value={replyCount.toLocaleString()}
            color="#ef4444"
          />
        </motion.div>

        {/* Danh sách đánh giá */}
        <ProductRatingListSection searchQuery={searchQuery} searchBy={searchBy} />
      </main>
    </div>
  );
};

export default ProductRatingPage;
