// NotificationList.js
import { useEffect, useRef } from "react";

const NotificationList = ({ notifications, onClose, onMarkRead }) => {
  const listRef = useRef(null);

  // 🔹 Đóng popup khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (listRef.current && !listRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div
      ref={listRef}
      className="absolute right-0 mt-3 w-96 bg-white shadow-xl rounded-xl overflow-hidden z-50"
    >
      {/* Header */}
      <div className="p-4 border-b font-semibold text-lg text-gray-800">
        Thông báo
      </div>

      {/* Danh sách thông báo */}
      <div className="max-h-96 overflow-y-auto">
        {notifications.map((item) => (
          <div
            key={item.id}
            className={`flex items-start gap-3 p-4 border-b cursor-pointer transition 
              hover:bg-gray-100 ${!item.read ? "bg-blue-50" : "bg-white"}`}
            onClick={() => onMarkRead(item.id)}
          >
            {/* 🔵 Chấm xanh cho thông báo chưa đọc */}
            {!item.read && (
              <span className="h-3 w-3 mt-1 bg-blue-600 rounded-full flex-shrink-0"></span>
            )}

            {/* Nội dung */}
            <div className="flex-1">
              <div className="font-semibold text-gray-800">{item.title}</div>
              <div className="text-sm text-gray-700 mt-1">{item.content}</div>
              <div className="text-xs text-gray-500 mt-2">{item.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationList;
