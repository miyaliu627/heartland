import "../output.css"
import "./IslandPopup.css"

import { useState } from "react";
import MemoryOrb from "./MemoryOrb";
import Modal from "./MemoryModal";


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

export default function IslandPopup()
{ 
    const memoryOrbs = [new OrbData(1, 200, 200), new OrbData(3, 300, 90), new OrbData(2, 430, 370)];

    const testTitle = "My Title";
    const testImage = "https://cdn.britannica.com/70/234870-050-D4D024BB/Orange-colored-cat-yawns-displaying-teeth.jpg";
    const testText = 
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    `;



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
        {
            memoryOrbs.map((orb) => 
            {
                return <MemoryOrb key={orb.key} x={orb.x} y={orb.y} detectClicked={() => setShouldDisplayModal(true)}/>
            })
        }
        <div class="absolute">
            <Modal isOpen={shouldDisplayModal} onClose={() => setShouldDisplayModal(false)} title={testTitle} image={testImage} text={testText}/>
        </div>
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