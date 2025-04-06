import React from "react";

const ConfirmModal = ({ isOpen, onClose, onConfirm, message, btnmsg }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 w-full bg-[rgba(159,150,150,0.57)] bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-11/12 max-w-md text-center animate-fadeIn">
        <p className="text-gray-800 text-lg mb-6">{message}</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 text-black font-semibold"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold"
          >
            {btnmsg}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
