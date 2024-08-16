import React, { useContext } from 'react';
import scrollTop from '../helpers/scrollTop';
import displayINRCurrency from '../helpers/displayCurrency';
import Context from '../context';
import addToCart from '../helpers/addToCart';
import { Link } from 'react-router-dom';

const VerticalCard = ({ loading, data = [] }) => {
    const loadingList = new Array(13).fill(null);
    const { fetchUserAddToCart } = useContext(Context);

    const handleAddToCart = async (e, id) => {
        e.preventDefault();
        await addToCart(e, id);
        fetchUserAddToCart();
    };

    return (
        <div className='grid grid-cols-[repeat(auto-fit,minmax(260px,300px))] gap-4 p-4 overflow-x-scroll scrollbar-none'>
            {
                loading ? (
                    loadingList.map((_, index) => (
                        <div key={index} className='w-full bg-white rounded-lg shadow-lg overflow-hidden'>
                            <div className='bg-gray-200 h-48 flex justify-center items-center animate-pulse'>
                                <div className='w-full h-full bg-gray-300'></div>
                            </div>
                            <div className='p-4'>
                                <h2 className='font-medium text-lg text-gray-700 bg-gray-200 h-6 w-3/4 mb-2 animate-pulse'></h2>
                                <p className='bg-gray-200 h-4 w-1/2 mb-4 animate-pulse'></p>
                                <div className='flex gap-3'>
                                    <p className='bg-gray-200 h-4 w-1/2 mb-2 animate-pulse'></p>
                                    <p className='bg-gray-200 h-4 w-1/2 mb-2 animate-pulse'></p>
                                </div>
                                <button className='bg-gray-200 h-8 w-3/4 rounded-full animate-pulse'></button>
                            </div>
                        </div>
                    ))
                ) : (
                    data.map((product) => (
                        <Link
                            key={product._id}
                            to={`/product/${product._id}`}
                            className='w-full bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105'
                            onClick={scrollTop}
                        >
                            <div className='bg-gray-200 h-48 flex justify-center items-center'>
                                <img
                                    src={product.productImage[0]}
                                    alt={product.productName}
                                    className='object-cover h-full w-full transition-transform hover:scale-110'
                                />
                            </div>
                            <div className='p-4'>
                                <h2 className='font-medium text-lg text-gray-800 truncate'>{product.productName}</h2>
                                <p className='text-gray-500 capitalize'>{product.category}</p>
                                <div className='flex gap-3 mt-2'>
                                    <p className='text-red-600 font-medium'>{displayINRCurrency(product.sellingPrice)}</p>
                                    <p className='text-gray-500 line-through'>{displayINRCurrency(product.price)}</p>
                                </div>
                                <button
                                    className='mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full'
                                    onClick={(e) => handleAddToCart(e, product._id)}
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </Link>
                    ))
                )
            }
        </div>
    );
};

export default VerticalCard;
