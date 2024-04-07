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
{   //<MemoryOrb key={memoryOrbs[0].key} x={memoryOrbs[0].x} y={memoryOrbs[0].y}/>
    const memoryOrbs = [new OrbData(1, 80, 20), new OrbData(3, 80, 40)];

    const [shouldDisplayModal, setShouldDisplayModal] = useState(false);

    function closeModal()
    {
        setShouldDisplayModal(false);
    }

    return (
        <>
        <div class="flex justify-center items-center h-screen">
        <div class="relative w-auto h-auto">
            <img    src="https://i.pinimg.com/originals/7d/12/60/7d1260bff315dff2b41a0c2fc7d6fcd0.gif" 
                    alt="island modal" 
                    width="800px"
                    ></img>
            {
                memoryOrbs.map((orb) => 
                {
                    return <MemoryOrb key={orb.key} x={orb.x} y={orb.y} detectClicked={() => setShouldDisplayModal(true)}/>
                })
            }
            
        </div>
            
        <div class="relative flex justify-center">
            <MemoryModal displayModal={shouldDisplayModal} closeModalFunc={closeModal}/>
        </div>
        </div>
        </>
    );


    /*

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