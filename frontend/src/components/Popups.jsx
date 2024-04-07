import React, { useState } from 'react';
import arrow from '../assets/icons/arrow.svg'; // Correct import if needed
import IslandMapView from './IslandMapView';
import AddMemory from './AddMemory/AddMemory';

const Popups = ({ currentStage }) => {
    const [showIsland, setShowIsland] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    
 
    const handleEnterIsland = () => {
        console.log('Opening IslandMapView');
        setShowIsland(true);
    };

    // Define welcome messages for each stage
    const welcomeMessages = {
        1: 'Welcome to Heartland',
        2: 'Welcome to the Island of Community!',
        3: 'Welcome to the Island of Growth!',
        4: 'Welcome to the Island of Inspiration!',
        5: 'Welcome to the Island of Accomplishment!',
        6: 'Welcome to Archival Island!',
    };

    // Button text varies based on the stage
    const buttonText = currentStage === 1 ? "Scroll" : 'Enter Island';

    return (
        <>
            {!showIsland && (
                <div className='info-box'>
                    <p className='font-medium sm:text-xl text-center'>
                        {welcomeMessages[currentStage]}
                    </p>
                    <button className='neo-brutalism-white neo-btn' onClick={handleEnterIsland}>
                        {buttonText}
                        <img src={arrow} alt='arrow' className='w-3 h-3 object-contain' />
                    </button>
                    <AddMemory isDialogOpen={isDialogOpen} setIsDialogOpen={isDialogOpen} />
                </div>
            )}

            {showIsland && currentStage !== 0 && (
                <>
                    <IslandMapView islandId={currentStage}/>
                    <button onClick={() => setShowIsland(false)} className='neo-brutalism-white neo-btn'>
                        Close
                    </button>
                </>
            )}
            
        </>
    );
};

export default Popups;