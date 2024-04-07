import IslandPopup from "./IslandPopup";
import jsonData from "./testMemData.json"
import yellowGif from '../assets/animations/yellow.gif';
import { getAuth, getIdToken } from "firebase/auth";
import React, { useState, useEffect } from 'react';

function Memory(artifact_url, entry_detail, memory_date, memory_id, memory_name)
{
    this.artifact_url = artifact_url;
    this.entry_detail = entry_detail;
    this.memory_date = memory_date;
    this.memory_id = memory_id;
    this.memory_name = memory_name;
}


export default function IslandMapView() {
    const [memories, setMemories] = useState([]);
    const islandId = 1; // Assuming this is determined elsewhere in your app

    useEffect(() => {
        const fetchMemories = async () => {
            const auth = getAuth();
            const user = auth.currentUser;

            const token = await getIdToken(user);
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: user.uid, // Use the user's UID as userId
                    islandId: islandId
                }),
            };
            //console.log(requestOptions);

            try {
                const response = await fetch('http://127.0.0.1:5000/getIsland', requestOptions);
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

    return (
        <div className="island">
            <IslandPopup memories={memories}/>
        </div>
    );
}