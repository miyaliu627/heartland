import "./MemoryModal.css"

import React, { useState } from 'react';

const Modal = ({ isOpen, onClose, title, image, text }) => {
  const handleModalClose = () => {
    onClose();
  };

  return (
    <div>  
        <div className={`modal-overlay ${isOpen ? 'open' : ''}`} onClick={handleModalClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <h3>{title}</h3>
                <br/>
                {
                    (image != null &&
                    <img src={image}></img>)
                }
                <br/>
                <p>{text}</p>
            </div>
        </div>
    </div>
  );
};

export default Modal;