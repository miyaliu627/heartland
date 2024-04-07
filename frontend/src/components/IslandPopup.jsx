import "../output.css"
import "./IslandPopup.css"

import { useState } from "react";
import MemoryOrb from "./MemoryOrb";
import Modal from "./MemoryModal";
import MemoryCard from "./MemoryCard";
import NewMemoryModal from "./NewMemoryModal";


function OrbData(input_key, input_x, input_y)
{
    this.key = input_key;
    this.x = input_x;
    this.y = input_y;
}

function MemoryData(title, image, text)
{
    this.title = title;
    this.image = image;
    this.text = text;
}

export default function IslandPopup({memories})
{ 
    const xs = [200, 430];
    const ys = [120, 260];

    const [displayModal, setDisplayModal] = useState(-1);

    
      const handleArchive = () => {
        // Handle archive action here
        console.log('Memory archived');
      };

    const memoryCards = [];

    for(let i = 0; i < memories.length; i++)
    {
        memoryCards.push(<MemoryCard 
                                    key={i}
                                    index={i}
                                    x={xs[i]}
                                    y={ys[i]}
                                    handleOpen={(index) => {setDisplayModal(i); console.log(i);}}/>);
        
    }

    return (
        <>
        <div class="container">
    <div class="large-image-container">
        <img src="island1.png" alt="Large Image" class="large-image"></img>
        </div>
        
        {memoryCards}
        
        <div class="absolute">
            {displayModal != -1 && 
            <Modal  isOpen={displayModal} 
                    onClose={() => setDisplayModal(-1)} 
                    title={memories[displayModal].memory_name} 
                    date={memories[displayModal].memory_date}
                    image={memories[displayModal].artifact_url} 
                    text={memories[displayModal].entry_detail}/>}
            </div>
            </div>
        </>
    );
}

/*

{(displayModal != -1 && <NewMemoryModal   title={memories[0].memory_name} 
                                                    date={memories[0].memory_date} 
                                                    imageUrl={memories[0].artifact_url} 
                                                    details={memories[0].entry_detail} 
                                                    handleClose={() => setDisplayModal(-1)} 
                                                    handleArchive={handleArchive}
            />)}

<div class="absolute">
            {displayModal != -1 && 
            <Modal  isOpen={displayModal} 
                    onClose={() => setDisplayModal(-1)} 
                    title={memories[displayModal].memory_name} 
                    image={memories[displayModal].artifact_url} 
                    text={memories[displayModal].entry_detail}/>}
        </div>

        */