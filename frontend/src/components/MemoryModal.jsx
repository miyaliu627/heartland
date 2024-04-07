import "./MemoryModal.css"
import React from 'react';
import { getAuth, getIdToken } from "firebase/auth";

const Modal = ({ isOpen, onClose, image, title, date, text, memory_id }) => {
  const handleModalClose = () => {
    onClose();
  };

  const archiveMemory = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    const token = await getIdToken(user);

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        memoryId: memory_id,
      }),
    };

    try {
      const response = await fetch('http://127.0.0.1:5000/archiveMemory', requestOptions);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      console.log("Memory archived successfully");
      onClose(); // Close the modal on successful archiving
    } catch (error) {
      console.error("Error archiving memory:", error);
    }
  };

  return (
    <div>  
        <div className={`modal-overlay ${isOpen != -1 ? 'open' : ''}`} onClick={handleModalClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                {image && <img src={image} alt="Memory"/>}
                <h3 className="modal-title">{title}</h3>
                <h3 className="modal-date">{date}</h3>
                <br/>
                <p className="modal-details">{text}</p>
                <button onClick={handleModalClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300 focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
                <button onClick={archiveMemory} className="archive-button">Archive</button>
            </div>
        </div>
    </div>
  );
};

export default Modal;