import "../output.css"
import "./IslandPopup.css"

import { useState } from "react";
import MemoryOrb from "./MemoryOrb";
import MemoryModal from "./MemoryModal";


function OrbData(input_key, input_x, input_y)
{
    this.key = input_key;
    this.x = input_x;
    this.y = input_y;
}

export default function IslandPopup()
{ 
    const memoryOrbs = [new OrbData(1, 200, 200), new OrbData(3, 300, 90), new OrbData(2, 430, 370)];

    const [shouldDisplayModal, setShouldDisplayModal] = useState(false);

    function closeModal()
    {
        setShouldDisplayModal(false);
    }

    return (
        <>
        <div class="container">
    <div class="large-image-container">
        <img src="https://i.pinimg.com/originals/7d/12/60/7d1260bff315dff2b41a0c2fc7d6fcd0.gif" alt="Large Image" class="large-image"></img>
        </div>
        <div class="absolute">
            <MemoryModal displayModal={shouldDisplayModal} closeModalFunc={closeModal}/>
        </div>
        {
            memoryOrbs.map((orb) => 
            {
                return <MemoryOrb key={orb.key} x={orb.x} y={orb.y} detectClicked={() => setShouldDisplayModal(true)}/>
            })
        }
    </div>
        </>
    );
//<img src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcS4xUj-NDnoBSVGCWbLx5tNSwEOdYEX8E1786dErjlUujqp3ZnV" alt="Small Image" class="small-image"></img>

    /*

    <img src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcS4xUj-NDnoBSVGCWbLx5tNSwEOdYEX8E1786dErjlUujqp3ZnV" alt="Small Image" class="small-image"></img>
    <div class="flex justify-center items-center h-screen">
            <div class="relative w-96 h-80 bg-orange-100">
                <img    src="https://i.pinimg.com/originals/7d/12/60/7d1260bff315dff2b41a0c2fc7d6fcd0.gif" 
                        alt="island modal" 
                        class="absolute object-contain bottom-0 left-0"
                        ></img>
                {
                    
                }
                
            </div>
            
            <div class="absolute">
                <MemoryModal displayModal={shouldDisplayModal} closeModalFunc={closeModal}/>
            </div>
        </div>
    <img    src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcS4xUj-NDnoBSVGCWbLx5tNSwEOdYEX8E1786dErjlUujqp3ZnV" 
                    alt="memory orb" 
                    width="70px"
                    class="absolute top-20 left-50"></img>

    return (
        <div class="relative h-screen">
            <div class="w-10 bg-blue-100">
                <img    src="https://i.pinimg.com/originals/7d/12/60/7d1260bff315dff2b41a0c2fc7d6fcd0.gif" 
                        alt="island popup"
                        className="container"
                        class="absolute bottom-0 left-0">
                </img>
            </div>    
                
        </div>
    );*/
}

/*
{
                    memoryOrbs.map(function(orb) {
                        console.log(orb.key);
                        return <MemoryOrb key={orb.key} x={orb.x} y={orb.y}/>
                    })
                }
*/