import React, { useState } from "react";
import SettingSection from "./SettingSection";
import { User, X } from "lucide-react";
import { motion } from "framer-motion";
import Image from "/src/assests/admin.jpg";

const Profile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("Admin");
  const [email, setEmail] = useState("admin@mobilehub.com");
  const [tempName, setTempName] = useState(name);
  const [tempEmail, setTempEmail] = useState(email);

  const openModal = () => {
    setTempName(name);
    setTempEmail(email);
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  const handleSave = () => {
    setName(tempName);
    setEmail(tempEmail);
    closeModal();
  };

  return (
    <SettingSection icon={User} title="Hồ sơ cá nhân">
      <div className="flex flex-col sm:flex-row items-center mb-6">
        <img
          src={Image}
          alt="Ảnh đại diện"
          className="rounded-full size-28 object-cover mr-4 mb-4 sm:mb-0 border-2 border-indigo-100"
        />
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-1">{name}</h3>
          <p className="text-gray-600">{email}</p>
        </div>
      </div>

      <button
        onClick={openModal}
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded transition duration-300 w-full sm:w-auto shadow-sm"
      >
        Chỉnh sửa hồ sơ
      </button>

      {/* Modal */}
      {isModalOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div 
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="bg-white p-6 rounded-xl shadow-xl w-11/12 sm:w-2/4 relative border border-gray-100"
          >
            <button
              onClick={closeModal}
              className="text-gray-400 hover:text-gray-700 absolute top-4 right-4 transition-colors"
            >
              <X size={20} />
            </button>
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Chỉnh sửa hồ sơ
            </h2>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Họ tên</label>
              <input
                type="text"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="Nhập tên"
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={tempEmail}
                onChange={(e) => setTempEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="Nhập email"
              />
            </div>

            <div className="flex justify-end gap-3">
               <button
                onClick={closeModal}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
              >
                Hủy
              </button>
              <button
                onClick={handleSave}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg shadow-sm transition"
              >
                Lưu thay đổi
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </SettingSection>
  );
};

export default Profile;