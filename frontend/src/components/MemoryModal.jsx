import "./MemoryModal.css"

import React, { useState } from 'react';

const Modal = ({ isOpen, onClose, image, title, date, text }) => {
  const handleModalClose = () => {
    onClose();
  };

  return (
    <div>  
        <div className={`modal-overlay ${isOpen != -1 ? 'open' : ''}`} onClick={handleModalClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                {
                    (image != null &&
                    <img src={image}></img>)
                }
                <h3 class="modal-title">{title}</h3>
                <h3 class="modal-date">{date}</h3>
                <br/>
                <p class="modal-details">{text}</p>
            </div>
        </div>
    </div>
  );
};

export default Modal;