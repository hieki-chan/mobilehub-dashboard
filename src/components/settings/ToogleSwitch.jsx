import React from "react";

const ToogleSwitch = ({ Label, isOn, onToggle }) => {
  return (
    <div className="flex items-center justify-between py-3">
      {/* THAY ĐỔI: text-gray-700 */}
      <span className="text-gray-700 font-medium">{Label}</span>

      <button
        className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none 
            ${isOn ? "bg-indigo-600" : "bg-gray-300"} 
        `}
        // bg-gray-600 -> bg-gray-300 cho trạng thái tắt
        onClick={onToggle}
      >
        <span
          className={`inline-block size-4 transform transition-transform bg-white rounded-full shadow-sm
                ${isOn ? "translate-x-6" : "translate-x-1"}
            `}
        />
      </button>
    </div>
  );
};

export default ToogleSwitch;