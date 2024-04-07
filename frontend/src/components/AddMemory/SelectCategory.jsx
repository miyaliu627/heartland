import React, { useState } from 'react';
import * as THREE from 'three';

function SelectCategory({ setIsDialogOpen, setSelectedCategoryId }) {
  const [isPopupMenuOpen, setIsPopupMenuOpen] = useState(false);
  const loader = new THREE.ImageLoader();

  const handleCategorySelect = (categoryId) => {
    console.log(`Selected Category ID: ${categoryId}`);
    setSelectedCategoryId(categoryId); // This will update the state in the parent component
    setIsPopupMenuOpen(false);
    setIsDialogOpen(true); // Assuming you want to open a dialog without passing categoryId here
  };

  const handleAddMemoryClick = () => {
    setIsPopupMenuOpen(true);
  };

  return (
    <div className="relative">
    <button
      className="fixed bottom-8 right-8 bg-lime-500 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg z-20"
      onClick={handleAddMemoryClick}
    >
      <img
        src="src/assets/plussign.png"
        alt="Add Memory"
        className="w-6 h-auto"
      />
    </button>

      {isPopupMenuOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Choose Category</h2>
            <div className="grid grid-cols-2 gap-4">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => handleCategorySelect('2')}
              >
                Community
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => handleCategorySelect('3')}
              >
                Growth
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => handleCategorySelect('4')}
              >
                Inspiration
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => handleCategorySelect('5')}
              >
                Accomplishment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SelectCategory;