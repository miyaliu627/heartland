import React, { useState } from 'react';
import blueGif from '../assets/animations/blue.gif';

function MemoryCard({ title = 'Memory Title', date = 'January 1, 2022', imageUrl = blueGif, details = 'Memory details' }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleArchive = () => {
    // Handle archive action here
    console.log('Memory archived');
  };

  return (
    <>
      <button onClick={handleOpen} className="w-32 h-32 p-4 bg-transparent hover:scale-110 rounded-md">
        <img src={imageUrl} alt={title} className="object-cover object-center w-full h-full rounded-md" />
      </button>
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-sky-200 bg-opacity-50 flex justify-center items-center z-20">
          <div className="max-w-xs p-6 rounded-md shadow-md bg-sky-200 dark:bg-blue-400 relative overflow-auto">
            <button onClick={handleClose} className="absolute top-2 right-2 text-white hover:text-gray-800 focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img src={imageUrl} alt={title} className="object-cover object-center w-full rounded-md h-72" />
            <div className="mt-6 mb-2">
              <span className="block text-xs font-medium tracking-widest uppercase text-gray-700">Date</span>
              <h2 className="text-xl text-white font-semibold tracking-wide">{title}</h2>
            </div>
            <p className="text-black overflow-auto">{details}</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={handleArchive}
                className="p-2 text-sm font-bold tracking-wide uppercase rounded bg-gray-800 text-white hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300"
              >
                Archive
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default MemoryCard;
