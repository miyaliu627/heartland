import React from 'react'
import { arrow } from '../assets/icons';

const Popups = ({ currentStage }) => {
    if (currentStage === 1)
        return (
            <div className='font-medium sm:text-xl text-center neo-brutalism-blue py-4 px-8 text-white mx-5'>
                <h1 >
                    Welcome to Heartland
                </h1>
                <p>
                    Scroll to start your journey!
                </p>
            </div>

        );

    if (currentStage === 2)
        return (
            <div className='info-box'>
                <p className='font-medium sm:text-xl text-center'>
                    Welcome to the Island of Community!
                </p>
                <button className='neo-brutalism-white neo-btn'>
                    Enter Island
                    <img src={arrow} alt='arrow' className='w-3 h-3 object-contain' />
                </button>
            </div>
        );

    if (currentStage === 3) {
        return (
            <div className='info-box'>
                <p className='font-medium sm:text-xl text-center'>
                    Welcome to the Island of Growth!
                </p>
                <button className='neo-brutalism-white neo-btn'>
                    Enter Island
                    <img src={arrow} alt='arrow' className='w-3 h-3 object-contain' />
                </button>
            </div>
        );
    }

    if (currentStage === 4) {
        return (
            <div className='info-box'>
                <p className='font-medium sm:text-xl text-center'>
                    Welcome to the Island of Inspiration!
                </p>
                <button className='neo-brutalism-white neo-btn'>
                    Enter Island
                    <img src={arrow} alt='arrow' className='w-3 h-3 object-contain' />
                </button>
            </div>
        );
    }

    if (currentStage === 5) {
        return (
            <div className='info-box'>
                <p className='font-medium sm:text-xl text-center'>
                    Welcome to the Island of Accomplishment!
                </p>
                <button className='neo-brutalism-white neo-btn'>
                    Enter Island
                    <img src={arrow} alt='arrow' className='w-3 h-3 object-contain' />
                </button>
            </div>
        );
    }

    if (currentStage === 6) {
        return (
            <div className='info-box'>
                <p className='font-medium sm:text-xl text-center'>
                    Welcome to the Archival Island!
                </p>
                <button className='neo-brutalism-white neo-btn'>
                    Enter Island
                    <img src={arrow} alt='arrow' className='w-3 h-3 object-contain' />
                </button>
            </div>
        );
    }

    return null;
};

export default Popups

