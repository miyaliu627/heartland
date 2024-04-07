import "./MemoryOrb.css"

export default function MemoryOrb({x, y, detectClicked})
{
    return (
        <>
            <img    src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcS4xUj-NDnoBSVGCWbLx5tNSwEOdYEX8E1786dErjlUujqp3ZnV" 
                    alt="Small Image" 
                    class={`absolute left-${x} bottom-${y} bg-gray-300 hover:scale-125 transition-transform duration-300`}
                    style={{ top: `${y}px`, left: `${x}px`, width: '70px' }}
                    onClick={() => detectClicked()}></img>
        </>
    );
    /*

    <img    src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcS4xUj-NDnoBSVGCWbLx5tNSwEOdYEX8E1786dErjlUujqp3ZnV" 
                    alt="memory orb" 
                    width="70px"
                    class={`absolute left-30 top-${y} hover:scale-125 transition-transform duration-300`}
                    onClick={() => detectClicked()}
                    ></img>
    
    return (
        <img    src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcS4xUj-NDnoBSVGCWbLx5tNSwEOdYEX8E1786dErjlUujqp3ZnV"
                width="70px"
                alt="map pin"
                class={`absolute left-${x} bottom-${y} bg-gray-300 hover:scale-125 transition-transform duration-300`}></img>
    );*/
}