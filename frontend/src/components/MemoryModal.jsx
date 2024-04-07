import "./MemoryModal.css"
import blueGif from '../assets/animations/blue.gif';

import React, { useState } from 'react';

//{title = 'Memory Title', date = 'January 1, 2022', imageUrl = blueGif, details = 'Memory details'}

const Modal = ({ isOpen = 2, onClose = () => console.log("blah"), image = {blueGif}, title = 'Memory Title', date = 'January 1, 2022', text ='Memory details', mem_id, handleArchive}) => {
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
                <div className="modal-archive">
                  <button
                      onClick={() => handleArchive(mem_id)}
                      className="p-2 text-sm font-bold tracking-wide uppercase rounded bg-gray-800 text-white hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300"
                    >
                      Archive
                </button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Modal;