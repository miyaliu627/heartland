import "../output.css"
import MemoryOrb from "./MemoryOrb";

export default function IslandPopup()
{
    return (
        <div class="relative h-screen flex items-center justify-center">
            <img    src="https://i.pinimg.com/originals/7d/12/60/7d1260bff315dff2b41a0c2fc7d6fcd0.gif" 
                    width="800" 
                    alt="island popup"
                    class="absolute">
            </img>
            <MemoryOrb x="10" y="20"/>
            
        </div>
    );
}