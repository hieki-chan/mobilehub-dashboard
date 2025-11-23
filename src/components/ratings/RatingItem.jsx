import React from "react";
import { Star, MessageCircle, Send, X, Edit3, Trash2 } from "lucide-react";

const RatingItem = ({
  rating,
  replyingId,
  replyText,
  onStartReply,
  onCancelReply,
  onSubmitReply,
  onReplyTextChange,
  onDeleteReply,
}) => {
  const { id, username, stars, product, comment, createdAt, updatedAt, reply } = rating;

  const isReplying = replyingId === id;
  const icon = username?.charAt(0)?.toUpperCase() || "?";

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const isEdited = (createdAt, updatedAt) => createdAt !== updatedAt;

  return (
    <div className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all bg-white">
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-full bg-orange-500 text-white flex items-center justify-center font-semibold text-sm">
          {icon}
        </div>

        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">{username}</p>
              <p className="text-xs text-gray-500">
                {formatDate(createdAt)}
                {isEdited(createdAt, updatedAt) && (
                  <span className="ml-1 text-gray-400 italic">(đã chỉnh sửa)</span>
                )}
              </p>
            </div>
            <div className="mt-1 sm:mt-0 flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={15}
                  className={i < stars ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                />
              ))}
              <span className="ml-1 text-xs text-gray-600 font-medium">{stars}/5</span>
            </div>
          </div>

          <h3 className="mt-2 font-semibold text-gray-800 text-base">{product}</h3>
          <p className="text-gray-700 mt-2 text-sm leading-relaxed">{comment}</p>

          {/* ==== REPLY MODE ==== */}
          {reply || isReplying ? (
            <div className={`mt-3 ml-4 border-l-4 pl-3 rounded-md py-2 ${reply ? "border-blue-200 bg-blue-50/60" : "border-gray-200 bg-gray-50"}`}>
              {isReplying ? (
                <>
                  <textarea
                    className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-400 outline-none"
                    rows={2}
                    value={replyText}
                    onChange={(e) => onReplyTextChange(e.target.value)}
                    placeholder="Nhập phản hồi của bạn..."
                  />
                  <div className="flex gap-2 justify-end mt-2">
                    <button
                      onClick={onCancelReply}
                      className="px-3 py-1.5 text-sm flex items-center gap-1 text-gray-500 hover:text-gray-700"
                    >
                      <X size={14} /> Hủy
                    </button>
                    <button
                      onClick={() => onSubmitReply(id)}
                      className="px-3 py-1.5 bg-blue-600 text-white rounded-md text-sm flex items-center gap-1 hover:bg-blue-700"
                    >
                      <Send size={14} /> Gửi
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 mb-1">
                      <MessageCircle size={14} className="text-blue-500" />
                      <span className="text-sm font-semibold text-blue-700">Phản hồi của cửa hàng</span>
                    </div>
                    <button
                      onClick={() => onStartReply(id, reply?.content)}
                      className="text-xs text-blue-500 hover:text-blue-700 flex items-center gap-1"
                    >
                      <Edit3 size={12} /> Sửa
                    </button>
                  </div>
                  <p className="text-sm text-gray-700">{reply?.content}</p>
                  <button
                    onClick={() => onDeleteReply(id)}
                    className="mt-2 text-xs text-red-500 hover:text-red-700 flex items-center gap-1"
                  >
                    <Trash2 size={12} /> Xóa phản hồi
                  </button>
                </>
              )}
            </div>
          ) : (
            <button
              onClick={() => onStartReply(id)}
              className="mt-3 ml-4 text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              <MessageCircle size={14} /> Phản hồi
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RatingItem;
