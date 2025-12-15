import React from "react";
import { X, Mail, User, Shield, Activity, Calendar, Hash } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const UserDetailModal = ({ user, onClose }) => {
  if (!user) return null;

  // Helper để chọn màu cho badge Role/Status
  const getRoleColor = (role) => {
    switch (role) {
      case "ADMIN": return "bg-purple-100 text-purple-700 border-purple-200";
      case "EMPLOYEE": return "bg-blue-100 text-blue-700 border-blue-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getStatusColor = (status) => {
    return status === "ACTIVE" 
      ? "bg-green-100 text-green-700 border-green-200" 
      : "bg-red-100 text-red-700 border-red-200";
  };

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none">
      <AnimatePresence>
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/20 backdrop-blur-[2px] cursor-pointer pointer-events-auto"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.2 }}
          className="pointer-events-auto relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100"
        >
          {/* Decorative Header */}
          <div className="h-24 bg-gradient-to-r from-orange-400 to-red-500 relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1 bg-white/20 hover:bg-white/40 rounded-full text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* User Info Container */}
          <div className="px-8 pb-8">
            {/* Avatar & Name - Negative margin to pull up */}
            <div className="relative -mt-12 mb-6 flex flex-col items-center">
              <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg bg-orange-500 flex items-center justify-center text-3xl font-bold text-white mb-3">
                {user.avatar || user.username?.charAt(0).toUpperCase()}
              </div>
              <h2 className="text-2xl font-bold text-gray-800">{user.username}</h2>
              <span className="text-sm text-gray-500">ID: {user.id}</span>
            </div>

            {/* Grid Details */}
            <div className="grid gap-4">
              <DetailItem icon={Mail} label="Email" value={user.email} />
              
              <div className="grid grid-cols-2 gap-4">
                <DetailItem 
                  icon={Shield} 
                  label="Vai trò" 
                  customContent={
                    <span className={`px-2 py-1 rounded-md text-xs font-semibold border ${getRoleColor(user.role)}`}>
                      {user.role}
                    </span>
                  }
                />
                <DetailItem 
                  icon={Activity} 
                  label="Trạng thái" 
                  customContent={
                    <span className={`px-2 py-1 rounded-md text-xs font-semibold border ${getStatusColor(user.status)}`}>
                      {user.status}
                    </span>
                  }
                />
              </div>

              <DetailItem icon={Calendar} label="Ngày tham gia" value={user.createdDate} />
            </div>

            {/* Footer Button */}
            <div className="mt-8 flex justify-center">
              <button
                onClick={onClose}
                className="px-8 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full font-medium transition-all"
              >
                Đóng
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

// Component con để hiển thị từng dòng
const DetailItem = ({ icon: Icon, label, value, customContent }) => (
  <div className="flex items-center p-3 rounded-xl bg-gray-50 border border-gray-100">
    <div className="p-2 bg-white rounded-lg shadow-sm text-gray-400 mr-4">
      <Icon size={18} />
    </div>
    <div>
      <p className="text-xs font-medium text-gray-500 uppercase">{label}</p>
      {customContent ? customContent : <p className="text-gray-900 font-medium text-sm">{value || "—"}</p>}
    </div>
  </div>
);

export default UserDetailModal;