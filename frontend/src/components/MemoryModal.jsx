import "./MemoryModal.css"

export default function MemoryModal({displayModal, closeModalFunc})
{
    return (
        <>
            <div className={`Overlay ${displayModal ? 'Show' : ''}`}
                 onClick={() => {closeModalFunc()}} />
            <div className={`Modal modal-content ${displayModal ? 'Show' : ''}`}>
                testing testing 123
            </div>
        </>
    );
}   