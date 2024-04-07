import "./MemoryModal.css"

export default function MemoryModal({displayModal, closeModalFunc})
{
    return (
        <>
            <div className={`Overlay ${displayModal ? 'Show' : ''}`}
                 onClick={() => {closeModalFunc()}} />
            <div className={`Modal ${displayModal ? 'Show' : ''}`}>...modal content</div>
        </>
    );
}   