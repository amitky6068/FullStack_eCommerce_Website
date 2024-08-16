import React, { useContext, useEffect, useState } from 'react';
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct';
import displayINRCurrency from '../helpers/displayCurrency';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import addToCart from '../helpers/addToCart';
import Context from '../context';
import scrollTop from '../helpers/scrollTop';

const CategroyWiseProductDisplay = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadingList = new Array(13).fill(null);

  const { fetchUserAddToCart } = useContext(Context);

  const handleAddToCart = async (e, id) => {
    e.stopPropagation(); // Prevent link click
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

  return (
    <div className='container mx-auto px-4 my-6 relative'>
      <h2 className='text-2xl font-semibold py-4'>{heading}</h2>
      <div className='relative'>
        <div className='grid grid-cols-[repeat(auto-fit,minmax(300px,320px))] gap-6 overflow-x-auto scrollbar-hidden'>
          {loading ? (
            loadingList.map((_, index) => (
              <div
                className='bg-white rounded-md shadow-md overflow-hidden animate-pulse'
                key={index}
              >
                <div className='bg-slate-200 h-48 flex justify-center items-center'>
                  {/* Placeholder for image */}
                </div>
                <div className='p-4'>
                  <div className='h-6 bg-slate-200 rounded-full mb-2'></div>
                  <div className='h-4 bg-slate-200 rounded-full mb-4'></div>
                  <div className='flex gap-2 mb-4'>
                    <div className='h-4 bg-slate-200 rounded-full w-1/2'></div>
                    <div className='h-4 bg-slate-200 rounded-full w-1/2'></div>
                  </div>
                  <div className='bg-slate-200 h-8 rounded-full'></div>
                </div>
              </div>
            ))
          ) : (
            data.map((product) => (
              <Link
                to={`/product/${product?._id}`}
                className='bg-white rounded-md shadow-md overflow-hidden transition-transform transform hover:scale-105'
                key={product?._id}
                onClick={scrollTop}
              >
                <div className='bg-slate-200 h-48 flex justify-center items-center'>
                  <img
                    src={product?.productImage[0]}
                    alt={product?.productName}
                    className='w-full h-full object-cover'
                  />
                </div>
                <div className='p-4'>
                  <h3 className='text-lg font-medium text-black truncate'>{product?.productName}</h3>
                  <p className='text-sm text-slate-500 capitalize'>{product?.category}</p>
                  <div className='flex gap-3 mt-2'>
                    <p className='text-red-600 font-semibold'>{displayINRCurrency(product?.sellingPrice)}</p>
                    <p className='text-slate-500 line-through'>{displayINRCurrency(product?.price)}</p>
                  </div>
                  <button
                    className='w-full mt-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors'
                    onClick={(e) => handleAddToCart(e, product?._id)}
                  >
                    Add to Cart
                  </button>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CategroyWiseProductDisplay;
