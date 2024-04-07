import React from 'react'
import { arrow } from '../assets/icons';

const Popups = ({ currentStage }) => {
    if (currentStage === 1)
        return (
            <div className='info-box'>
                <p className='font-medium sm:text-xl text-center'>
                    Welcome to Heartland
                </p>
                <button className='neo-brutalism-white neo-btn'>
                    Scroll
                    <img src={arrow} alt='arrow' className='w-3 h-3 object-contain' />
                </button>
            </div>
        );

    if (currentStage === 2)
        return (
            <div className='info-box'>
                <p className='font-medium sm:text-xl text-center'>
                    Welcome to Companion Island!
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
                    Welcome to the Family/Relationships Island!
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
                    Welcome to the Education/Career Island!
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
                    Welcome to the Community Island!
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
                    Welcome to the Archive Island!
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

