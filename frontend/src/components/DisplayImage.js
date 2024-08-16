import React from 'react';
import { CgClose } from 'react-icons/cg';

const DisplayImage = ({ imgUrl, onClose }) => {
    return (
        <div className='fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-70'>
            <div className='bg-white shadow-lg rounded max-w-5xl mx-auto p-4 relative'>
                <button
                    className='absolute top-2 right-2 text-2xl text-gray-600 hover:text-red-600'
                    onClick={onClose}
                    aria-label='Close'
                >
                    <CgClose />
                </button>
                <div className='flex justify-center items-center max-w-full max-h-[80vh]'>
                    <img
                        src={imgUrl}
                        alt='Display'
                        className='object-contain w-full h-full'
                    />
                </div>
            </div>
        </div>
    );
};

export default DisplayImage;
