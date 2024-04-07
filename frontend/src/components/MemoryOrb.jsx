export default function MemoryOrb({key, x, y})
{
    return (
        <img    key={key}
                src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcS4xUj-NDnoBSVGCWbLx5tNSwEOdYEX8E1786dErjlUujqp3ZnV"
                width="70px"
                alt="map pin"
                class={`absolute left-${x} bottom-${y} bg-gray-300 hover:scale-125 transition-transform duration-300`}></img>
    );
}