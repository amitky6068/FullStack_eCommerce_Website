import React, { useContext, useEffect, useRef, useState } from 'react';
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct';
import displayINRCurrency from '../helpers/displayCurrency';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import addToCart from '../helpers/addToCart';
import Context from '../context';

const HorizontalCardProduct = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadingList = new Array(13).fill(null);

  const [scroll, setScroll] = useState(0);
  const scrollElement = useRef();

  const { fetchUserAddToCart } = useContext(Context);

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
  };

  const fetchData = async () => {
    setLoading(true);
    const categoryProduct = await fetchCategoryWiseProduct(category);
    setLoading(false);

    setData(categoryProduct?.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const scrollRight = () => {
    scrollElement.current.scrollLeft += 300;
  };

  const scrollLeft = () => {
    scrollElement.current.scrollLeft -= 300;
  };

  return (
    <div className='relative mx-auto my-6 px-4'>
      <h2 className='text-3xl font-semibold mb-4'>{heading}</h2>

      <div className='relative flex items-center overflow-x-auto no-scrollbar'>
        <button
          className='absolute left-0 top-1/2 transform -translate-y-1/2 bg-white shadow-md rounded-full p-2 text-xl hover:bg-gray-200'
          onClick={scrollLeft}
        >
          <FaAngleLeft />
        </button>

        <div
          className='flex gap-6 overflow-x-auto no-scrollbar'
          ref={scrollElement}
        >
          {loading ? (
            loadingList.map((_, index) => (
              <div
                key={index}
                className='w-[280px] md:w-[320px] h-40 bg-white rounded-lg shadow-md flex flex-col overflow-hidden'
              >
                <div className='bg-slate-200 h-2/3 p-4 animate-pulse'></div>
                <div className='p-4 flex flex-col gap-2'>
                  <div className='h-6 bg-slate-200 animate-pulse rounded-full'></div>
                  <div className='h-4 bg-slate-200 animate-pulse rounded-full'></div>
                  <div className='flex gap-2'>
                    <div className='h-6 bg-slate-200 animate-pulse rounded-full w-1/2'></div>
                    <div className='h-6 bg-slate-200 animate-pulse rounded-full w-1/2'></div>
                  </div>
                  <div className='h-8 bg-slate-200 animate-pulse rounded-full'></div>
                </div>
              </div>
            ))
          ) : (
            data.map((product) => (
              <Link
                key={product?._id}
                to={`product/${product?._id}`}
                className='w-[280px] md:w-[320px] h-40 bg-white rounded-lg shadow-md flex overflow-hidden'
              >
                <div className='w-1/3 bg-slate-200'>
                  <img
                    src={product.productImage[0]}
                    alt={product.productName}
                    className='object-cover w-full h-full hover:scale-105 transition-transform duration-300'
                  />
                </div>
                <div className='p-4 flex flex-col gap-2'>
                  <h2 className='text-lg font-medium text-black truncate'>{product?.productName}</h2>
                  <p className='text-sm text-slate-500 capitalize'>{product?.category}</p>
                  <div className='flex gap-2 items-center'>
                    <p className='text-red-600 font-medium'>{displayINRCurrency(product?.sellingPrice)}</p>
                    <p className='text-slate-500 line-through'>{displayINRCurrency(product?.price)}</p>
                  </div>
                  <button
                    className='bg-red-600 text-white py-1 px-3 rounded-full hover:bg-red-700 transition-colors duration-300'
                    onClick={(e) => handleAddToCart(e, product?._id)}
                  >
                    Add to Cart
                  </button>
                </div>
              </Link>
            ))
          )}
        </div>

        <button
          className='absolute right-0 top-1/2 transform -translate-y-1/2 bg-white shadow-md rounded-full p-2 text-xl hover:bg-gray-200'
          onClick={scrollRight}
        >
          <FaAngleRight />
        </button>
      </div>
    </div>
  );
};

export default HorizontalCardProduct;
