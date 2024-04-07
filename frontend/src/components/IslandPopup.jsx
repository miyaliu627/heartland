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
    const xs = [200, 430, 200, 560];
    const ys = [120, 260, 400, 77];

    console.log(memories)

    const [displayModal, setDisplayModal] = useState(-1);

    

    // const memoryCards = [];

    // for(let i = 0; i < memories.length; i++)
    // {
    //     memoryCards.push(<MemoryCard 
    //                                 key={i}
    //                                 index={i}
    //                                 x={xs[i]}
    //                                 y={ys[i]}
    //                                 handleOpen={() => {setDisplayModal(i); console.log(i);}}/>);
    //     console.log(memoryCards);  
    // }

    const memoryCards = memories.map((memory, i) => (
        <MemoryCard 
            key={i}
            index={i}
            x={xs[i % xs.length]}
            y={ys[i % ys.length]}
            handleOpen={() => setDisplayModal(i)}
        />
    ));

    

    function handleArchiveClicked(memId)
    {
        console.log("what");
        useEffect(() => {
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
                        memoryId: memId
                    }),
                };
                //console.log(requestOptions);
    
                try {
                    const response = await fetch('http://127.0.0.1:5000/archiveMemory', requestOptions);
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const data = await response.json();
                    setMemories(data); // Assuming the response is the array of memories
                } catch (error) {
                    console.error("Error fetching memories:", error);
                }
            };
    
            fetchMemories();
            //console.log(memories);
        }, []); // Empty dependency array means this effect runs once on mount
    }
    
    // console.log(memoryCards[0].props); // This should show the populated array

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
                    text={memories[displayModal].entry_detail}
                    id={memories[displayModal].memory_id}
                    handleArchive={(num) => handleArchiveClicked(num)}
                    />}
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