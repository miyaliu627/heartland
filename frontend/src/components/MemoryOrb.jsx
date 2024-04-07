export default function MemoryOrb({x, y, detectClicked})
{
    return (
        <>
            <img    src="memory_orb.png" 
                    alt="Small Image" 
                    class={`absolute left-${x} bottom-${y} hover:scale-125 transition-transform duration-300`}
                    style={{ top: `${y}px`, left: `${x}px`, width: '50px' }}
                    onClick={() => detectClicked()}></img>
        </>
    );
}