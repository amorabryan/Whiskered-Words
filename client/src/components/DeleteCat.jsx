import React from 'react';

export function DeleteCat({ onCancel, onConfirm }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-90">
      <div className="flex flex-col rounded bg-white p-8 shadow-md">
        <div className="column-full flex justify-center pb-4">
          <p>Are you sure you want to delete this cat?</p>
        </div>
        <div className="column-full flex justify-between">
          <button className="modal-button" onClick={onCancel}>
            Cancel
          </button>
          <button
            className="h-10 w-24 rounded bg-red-700 text-xl text-white"
            onClick={onConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
