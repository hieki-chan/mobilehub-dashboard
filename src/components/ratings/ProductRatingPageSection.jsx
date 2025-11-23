import React, { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { MessageCircle, Filter, Star, Search } from "lucide-react";
import RatingItem from "./RatingItem";
import { getRatings, replyRating, updateRating, deleteRatingReply } from "../../api/ratingApi";

const ProductRatingListSection = () => {
  const [ratings, setRatings] = useState([]);

  const [replyingId, setReplyingId] = useState(null);
  const [replyText, setReplyText] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [editStars, setEditStars] = useState(0);

  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);

  const productId = searchParams.get("product");
  const filterStar = searchParams.get("stars") || "ALL";
  const filterReply = searchParams.get("replyStatus") || "ALL";
  const sortBy = searchParams.get("sortBy") || "newest";
  const searchBy = searchParams.get("searchBy") || "product";
  const searchQuery = searchParams.get("searchQuery") || "";

  const [searchInput, setSearchInput] = useState(searchQuery);
  useEffect(() => setSearchInput(searchQuery), [searchQuery]);

  const updateParam = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    setSearchParams(params);
  };

  const handleSearch = () => updateParam("searchQuery", searchInput.trim());
  const handleSearchByChange = (newSearchBy) => {
    updateParam("searchBy", newSearchBy);
    if (searchQuery.trim()) updateParam("searchQuery", searchInput.trim());
  };

  useEffect(() => {
    const fetchRatings = async () => {
      setLoading(true);
      try {
        const data = await getRatings({
          page: 0,
          size: 50,
          sortBy,
          stars: filterStar !== "ALL" ? filterStar : undefined,
          replyStatus: filterReply !== "ALL" ? filterReply : undefined,
          searchBy,
          searchQuery,
          productId,
        });
        setRatings(data.content ?? data ?? []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRatings();
  }, [productId, filterStar, filterReply, sortBy, searchBy, searchQuery]);

  const handleStartReply = (id, currentReply = "") => {
    setReplyingId(id);
    setReplyText(currentReply);
    setEditingId(null);
  };
  const handleCancelReply = () => {
    setReplyingId(null);
    setReplyText("");
  };
  const handleSubmitReply = async (id) => {
    if (!replyText.trim()) return;
    try {
      const updated = await replyRating(id, replyText.trim());
      setRatings((prev) =>
        prev.map((r) => (r.id === id ? { ...r, reply: updated.reply } : r))
      );
      handleCancelReply();
    } catch (err) {
      console.error(err);
      alert("Có lỗi khi gửi phản hồi!");
    }
  };

  const handleStartEdit = (rating) => {
    setEditingId(rating.id);
    setEditText(rating.comment);
    setEditStars(rating.stars);
    setReplyingId(null);
  };
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditText("");
    setEditStars(0);
  };
  const handleSubmitEdit = async (id) => {
    if (!editText.trim()) return;
    try {
      const updated = await updateRating(id, { comment: editText.trim(), stars: editStars });
      setRatings((prev) =>
        prev.map((r) => (r.id === id ? { ...r, comment: updated.comment, stars: updated.stars } : r))
      );
      handleCancelEdit();
    } catch (err) {
      console.error(err);
      alert("Có lỗi khi cập nhật đánh giá!");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xoá phản hồi này?")) return;
    try {
      await deleteRatingReply(id);
      setRatings((prev) =>
        prev.map((r) => (r.id === id ? { ...r, reply: null } : r))
      );
    } catch (err) {
      console.error(err);
      alert("Có lỗi khi xoá phản hồi!");
    }
  };

  const productInfo = productId ? ratings[0] : null;

  return (
   <div className="bg-white shadow-sm rounded-2xl p-6 border border-gray-100">
    {productInfo && (
      <div className="flex items-center gap-4 mb-6 border-b pb-4">
        <img
          src={productInfo.productImage}
          alt={productInfo.product}
          className="w-20 h-20 object-cover rounded-lg border"
        />
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{productInfo.product}</h3>
          <div className="flex items-center gap-1 mt-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className={i < productInfo.stars ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
              />
            ))}
            <span className="ml-2 text-sm text-gray-600">{ratings.length} đánh giá</span>
          </div>
        </div>
      </div>
    )}

    {/* BỎ ĐIỀU KIỆN !productId - LUÔN HIỂN THỊ FILTERS */}
    <div className="flex flex-col gap-3 mb-5">
      {!productId && (
        <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <MessageCircle size={18} /> Danh sách đánh giá
        </h2>
      )}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 w-full">
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-1/2">
          <div className="flex items-center gap-1">
            <Filter size={14} className="text-gray-500" />
            <span className="font-medium text-gray-600">Lọc:</span>
          </div>
          <select value={filterStar} onChange={(e) => updateParam("stars", e.target.value)} className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:ring-1 focus:ring-blue-400">
            <option value="ALL">Tất cả sao</option>
            {[5,4,3,2,1].map((s)=> <option key={s} value={s}>{s} sao</option>)}
          </select>
          <select value={filterReply} onChange={(e) => updateParam("replyStatus", e.target.value)} className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:ring-1 focus:ring-blue-400">
            <option value="ALL">Tất cả phản hồi</option>
            <option value="REPLIED">Đã phản hồi</option>
            <option value="UNREPLIED">Chưa phản hồi</option>
          </select>
          <select value={sortBy} onChange={(e) => updateParam("sortBy", e.target.value)} className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:ring-1 focus:ring-blue-400">
            <option value="newest">Mới nhất</option>
            <option value="oldest">Cũ nhất</option>
            <option value="highest">Điểm cao nhất</option>
            <option value="lowest">Điểm thấp nhất</option>
          </select>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-2 w-full sm:w-1/2 mt-2 sm:mt-0">
          <div className="flex w-full sm:w-auto">
            <input
              type="text"
              placeholder={`Tìm kiếm theo ${searchBy === "product" ? "tên sản phẩm" : "tên người dùng"}...`}
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="flex-1 border border-gray-300 rounded-l-md px-2 py-1 text-sm focus:ring-1 focus:ring-blue-400 h-8"
            />
            <button
              onClick={handleSearch}
              className="w-8 h-8 flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white rounded-r-md"
            >
              <Search size={16} />
            </button>
          </div>
          <select
            value={searchBy}
            onChange={(e) => handleSearchByChange(e.target.value)}
            className="w-full sm:w-auto border border-gray-300 rounded-md px-2 py-1 text-sm focus:ring-1 focus:ring-orange-400 mt-2 sm:mt-0 h-8"
          >
            <option value="product">Theo tên sản phẩm</option>
            <option value="user">Theo tên người dùng</option>
          </select>
        </div>
      </div>
    </div>

      <div className="space-y-5">
        {loading ? (
          <p className="text-gray-500 text-sm italic text-center py-6">Đang tải...</p>
        ) : ratings.length === 0 ? (
          <p className="text-gray-500 text-sm italic text-center py-6">Không có đánh giá nào phù hợp.</p>
        ) : (
          ratings.map((r) => (
            <RatingItem
              key={r.id}
              rating={r}
              replyingId={replyingId}
              replyText={replyText}
              onStartReply={handleStartReply}
              onCancelReply={handleCancelReply}
              onSubmitReply={handleSubmitReply}
              onReplyTextChange={setReplyText}
              editingId={editingId}
              editText={editText}
              editStars={editStars}
              onStartEdit={handleStartEdit}
              onCancelEdit={handleCancelEdit}
              onSubmitEdit={handleSubmitEdit}
              onEditTextChange={setEditText}
              onEditStarsChange={setEditStars}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ProductRatingListSection;
