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
}