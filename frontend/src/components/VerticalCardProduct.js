import React, { useContext, useEffect, useRef, useState } from 'react';
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct';
import displayINRCurrency from '../helpers/displayCurrency';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import addToCart from '../helpers/addToCart';
import Context from '../context';

const VerticalCardProduct = ({ category, heading }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const loadingList = new Array(13).fill(null);

    const scrollElement = useRef();

    const { fetchUserAddToCart } = useContext(Context);

    const handleAddToCart = async (e, id) => {
        e.preventDefault();
        await addToCart(e, id);
        fetchUserAddToCart();
    };

    const fetchData = async () => {
        setLoading(true);
        const categoryProduct = await fetchCategoryWiseProduct(category);
        setLoading(false);
        setData(categoryProduct?.data || []);
    };

    useEffect(() => {
        fetchData();
    }, [category]);

    const scrollRight = () => {
        scrollElement.current.scrollLeft += 300;
    };

    const scrollLeft = () => {
        scrollElement.current.scrollLeft -= 300;
    };

    return (
        <div className='relative container mx-auto px-4 my-6'>
            <h2 className='text-2xl font-semibold mb-4'>{heading}</h2>
            <div className='flex items-center overflow-x-auto gap-4 scrollbar-none' ref={scrollElement}>
                <button
                    className='absolute left-0 text-lg bg-white rounded-full shadow-md p-2 hidden md:block'
                    onClick={scrollLeft}
                >
                    <FaAngleLeft />
                </button>
                <button
                    className='absolute right-0 text-lg bg-white rounded-full shadow-md p-2 hidden md:block'
                    onClick={scrollRight}
                >
                    <FaAngleRight />
                </button>
                {loading ? (
                    loadingList.map((_, index) => (
                        <div key={index} className='bg-white rounded-lg shadow-lg overflow-hidden min-w-[280px] max-w-[320px]'>
                            <div className='bg-gray-200 h-48 flex justify-center items-center animate-pulse'>
                                {/* Placeholder for image */}
                            </div>
                            <div className='p-4'>
                                <h2 className='bg-gray-200 h-6 w-3/4 mb-2 rounded-full animate-pulse'></h2>
                                <p className='bg-gray-200 h-4 w-1/2 mb-4 rounded-full animate-pulse'></p>
                                <div className='flex gap-3'>
                                    <p className='bg-gray-200 h-4 w-1/2 rounded-full animate-pulse'></p>
                                    <p className='bg-gray-200 h-4 w-1/2 rounded-full animate-pulse'></p>
                                </div>
                                <button className='bg-gray-200 h-8 w-full rounded-full animate-pulse'></button>
                            </div>
                        </div>
                    ))
                ) : (
                    data.map((product) => (
                        <Link
                            key={product._id}
                            to={`/product/${product._id}`}
                            className='bg-white rounded-lg shadow-lg overflow-hidden min-w-[280px] max-w-[320px]'
                        >
                            <div className='bg-gray-200 h-48 flex justify-center items-center'>
                                <img
                                    src={product.productImage[0]}
                                    alt={product.productName}
                                    className='object-cover w-full h-full transition-transform hover:scale-105'
                                />
                            </div>
                            <div className='p-4'>
                                <h2 className='text-lg font-medium text-gray-800 truncate'>{product.productName}</h2>
                                <p className='text-gray-500 capitalize'>{product.category}</p>
                                <div className='flex gap-3 mt-2'>
                                    <p className='text-red-600 font-medium'>{displayINRCurrency(product.sellingPrice)}</p>
                                    <p className='text-gray-500 line-through'>{displayINRCurrency(product.price)}</p>
                                </div>
                                <button
                                    className='mt-4 bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700'
                                    onClick={(e) => handleAddToCart(e, product._id)}
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
};

export default VerticalCardProduct;
