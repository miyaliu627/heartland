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


export default function IslandMapView({islandId, islandImage}) {
    const [memories, setMemories] = useState([]);

    useEffect(() => {
        const fetchMemories = async () => {
            const auth = getAuth();
            const user = auth.currentUser;

            // Choose the API endpoint and prepare the body accordingly
            let apiUrl;
            let body;
            if (islandId === 6) {
                apiUrl = 'http://127.0.0.1:5000/getArchived';
                // For /getArchived, we only need userId
                body = JSON.stringify({ userId: user.uid });
            } else {
                apiUrl = 'http://127.0.0.1:5000/getIsland';
                // For /getIsland, we need both userId and islandId
                body = JSON.stringify({ userId: user.uid, islandId: islandId });
            }

            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: body,
            };

            try {
                const response = await fetch(apiUrl, requestOptions);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setMemories(data); // Update the state with the fetched memories
            } catch (error) {
                console.error("Error fetching memories:", error);
            }
        };

       
        fetchMemories();

    }, [islandId]); // This effect runs whenever islandId changes

    return (
        <div className="island">
            <IslandPopup memories={memories} islandImage={islandImage}/>
        </div>
    );
}
