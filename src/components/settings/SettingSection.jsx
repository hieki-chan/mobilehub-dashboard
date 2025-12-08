import React from "react";
import { motion } from "framer-motion";

const SettingSection = ({ icon: Icon, title, children }) => {
  return (
    <motion.div
      // THAY ĐỔI: bg-white, shadow-sm, border-gray-200
      className="bg-white shadow-sm rounded-xl border border-gray-200 p-6 mb-4"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center mb-4">
        <Icon className="text-indigo-600 mr-2" size={22} />
        {/* THAY ĐỔI: text-gray-800 */}
        <h2 className="text-xl tracking-wide font-semibold text-gray-800">
          {title}
        </h2>
      </div>

      {children}
    </motion.div>
  );
};

export default SettingSection;