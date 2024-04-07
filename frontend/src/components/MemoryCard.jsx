import React, { useState } from 'react';
import blueGif from '../assets/animations/blue.gif';
import yellowGif from '../assets/animations/yellow.gif';
import NewMemoryModal from './NewMemoryModal';

function MemoryCard({ memoryIndex, x, y, handleOpen}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => handleOpen(memoryIndex)} 
              className="absolute transitiona-all bg-transparent hover:scale-110 transition-transform duration-300 rounded-md"
              style={{ top: `${y}px`, left: `${x}px`, width: '80px' }}>
        <img src={yellowGif} alt="memory card" className="object-cover object-center w-full h-full rounded-md" />
      </button>
    </div>
  );
}

export default MemoryCard;
