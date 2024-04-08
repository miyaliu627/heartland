import React, { useState } from 'react';
import NewMemoryModal from './NewMemoryModal';
import blueGif from '../assets/animations/blue.gif';
import yellowGif from '../assets/animations/yellow.gif';
import beigeGif from '../assets/animations/baige.gif';
import greenGif from '../assets/animations/green.gif';
import orangeGif from '../assets/animations/orange.gif';
import purpleGif from '../assets/animations/purple.gif';
import redGif from '../assets/animations/red.gif';

function MemoryCard({ memoryIndex, x, y, handleOpen}) {
  const [isOpen, setIsOpen] = useState(false);

  const colors = [
    blueGif, yellowGif, beigeGif, greenGif, orangeGif, purpleGif, redGif
  ];

  console.log(memoryIndex % colors.length)

  return (
    <div>
      <button onClick={() => {handleOpen(memoryIndex); console.log}} 
              className="absolute transitiona-all bg-transparent hover:scale-110 transition-transform duration-300 rounded-md"
              style={{ top: `${y}px`, left: `${x}px`, width: '80px' }}>
        <img src={colors[memoryIndex % colors.length]} alt="memory card" className="object-cover object-center w-full h-full rounded-md" />
      </button>
    </div>
  );
}

export default MemoryCard;
