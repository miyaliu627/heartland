import IslandPopup from "./IslandPopup";
import jsonData from "./testMemData.json"
import yellowGif from '../assets/animations/yellow.gif';

function Memory(artifact_url, entry_detail, memory_date, memory_id, memory_name)
{
    this.artifact_url = artifact_url;
    this.entry_detail = entry_detail;
    this.memory_date = memory_date;
    this.memory_id = memory_id;
    this.memory_name = memory_name;
}

export default function IslandMapView()
{
    //output of a hypothetical GetIsland request for island 1
    const memories = jsonData;

    return (
        <>
            <IslandPopup memories={memories}/>
        </>
    );
}