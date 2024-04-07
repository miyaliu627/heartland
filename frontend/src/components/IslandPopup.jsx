import "../output.css"
import MemoryOrb from "./MemoryOrb";


function OrbData(input_key, input_x, input_y)
{
    this.key = input_key;
    this.x = input_x;
    this.y = input_y;
}

export default function IslandPopup()
{   //<MemoryOrb key={memoryOrbs[0].key} x={memoryOrbs[0].x} y={memoryOrbs[0].y}/>
    const memoryOrbs = [new OrbData(1, 80, 20), new OrbData(2, 50, 0), new OrbData(3, 90, 20)];
    return (
        <div class="relative h-screen">
            <img    src="https://i.pinimg.com/originals/7d/12/60/7d1260bff315dff2b41a0c2fc7d6fcd0.gif" 
                    width="800px" 
                    alt="island popup"
                    class="absolute bottom-0 left-0">
            </img>
                
                {
                    
                    memoryOrbs.map(function(orb) {
                        console.log(orb.key);
                        return <MemoryOrb key={orb.key} x={orb.x} y={orb.y}/>
                    })
                }
        </div>
    );
}