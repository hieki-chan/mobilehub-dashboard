import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DangerZone = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    setIsModalOpen(false);
    toast.success("Tài khoản của bạn đã được xóa thành công.", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      transition: Bounce,
      theme: "light",
    });
    setTimeout(() => {
      navigate("/");
    }, 3000);
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <motion.div
        // THAY ĐỔI: bg-red-50, border-red-200
        className="bg-red-50 shadow-sm rounded-xl p-6 border border-red-200 mb-6"
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <div className="flex items-center mb-4">
          <Trash2 className="text-red-600 mr-3" size={24} />
          <h2 className="text-xl font-semibold text-red-700">
            Khu vực nguy hiểm
          </h2>
        </div>

        {/* THAY ĐỔI: text-gray-700 */}
        <p className="text-gray-700 mb-6 leading-relaxed">
          Việc xóa tài khoản sẽ <strong>vĩnh viễn</strong> xóa toàn bộ dữ liệu và nội dung
          liên quan. Hãy xác nhận nếu bạn thực sự muốn tiếp tục — hành động này
          không thể hoàn tác.
        </p>
        
        <button
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300 shadow-sm"
          onClick={handleDeleteClick}
        >
          Xóa tài khoản
        </button>

        {/* Hộp thoại xác nhận */}
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="bg-white p-6 rounded-xl shadow-xl max-w-sm w-[90%] text-center border border-gray-200">
              <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                 <Trash2 className="text-red-600" size={24} />
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Xóa tài khoản?
              </h3>
              <p className="text-gray-600 text-sm mb-6">
                Hành động này <strong>không thể hoàn tác</strong>. Toàn bộ dữ liệu của bạn sẽ bị mất vĩnh viễn.
              </p>
              
              <div className="flex gap-3 justify-center">
                <button
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition"
                  onClick={handleCancelDelete}
                >
                  Hủy
                </button>
                <button
                  className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition shadow-sm"
                  onClick={handleConfirmDelete}
                >
                  Xóa vĩnh viễn
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>

      <ToastContainer />
    </>
  );
};

export default DangerZone;