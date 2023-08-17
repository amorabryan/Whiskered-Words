import React from 'react';

export function DeleteCat({ onCancel, onConfirm }) {
  return (
    <div
      id="modalContainer"
      className="modal-container align-center flex justify-center">
      <div className="modal flex flex-wrap">
        <div className="column-full flex justify-center">
          <p>Are you sure you want to delete this cat?</p>
        </div>
        <div className="column-full flex justify-between">
          <button className="modal-button" onClick={onCancel}>
            Cancel
          </button>
          <button
            className="modal-button red-background white-text"
            onClick={onConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
