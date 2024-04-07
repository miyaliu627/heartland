import React, { useState } from 'react';

function SelectCategory({ setIsDialogOpen }) {
  const [isPopupMenuOpen, setIsPopupMenuOpen] = useState(false);
  const [selectedcategoryId, setSelectedCategoryId] = useState(null);

  const handleCategorySelect = (categoryId) => {
    setSelectedCategoryId(categoryId);
    setIsPopupMenuOpen(false);
    setIsDialogOpen(true, categoryId);
  };

  const handleAddMemoryClick = () => {
    setIsPopupMenuOpen(true);
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
  };

  return (
    <div className="relative">
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
        onClick={handleAddMemoryClick}
      >
        Add Memory
      </button>

      {/* Popup Menu */}
      {isPopupMenuOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Choose Category</h2>
            <div className="grid grid-cols-2 gap-4">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => handleCategorySelect('personal')}
              >
                Personal
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => handleCategorySelect('family')}
              >
                Family
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => handleCategorySelect('work')}
              >
                Work
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => handleCategorySelect('community')}
              >
                Community
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SelectCategory;
