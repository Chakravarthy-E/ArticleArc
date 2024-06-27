import React from "react";

function LogoutConfirmModal({
  confirm,
  cancel,
}: {
  confirm: any;
  cancel: any;
}) {
  return (
    <div className="fixed  font-outfit inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-2xl font-bold mb-4">Confirm Logout</h3>
        <p className="text-xl font-semibold">
          Are you sure you want to Logout?
        </p>
        <div className="mt-4 flex justify-end space-x-2">
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={confirm}
          >
            Yes
          </button>
          <button
            className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
            onClick={cancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default LogoutConfirmModal;
