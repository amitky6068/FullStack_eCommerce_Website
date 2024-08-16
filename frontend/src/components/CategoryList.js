import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';
import { Link } from 'react-router-dom';

const CategoryList = () => {
  const [categoryProduct, setCategoryProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  const categoryLoading = new Array(13).fill(null);

  const fetchCategoryProduct = async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.categoryProduct.url);
    const dataResponse = await response.json();
    setLoading(false);
    setCategoryProduct(dataResponse.data);
  };

  useEffect(() => {
    fetchCategoryProduct();
  }, []);

  return (
    <div className='container mx-auto p-4'>
      <div className='flex items-center gap-4 justify-between overflow-x-auto scrollbar-hidden'>
        {loading ? (
          categoryLoading.map((_, index) => (
            <div
              className='h-20 w-20 rounded-full bg-slate-200 animate-pulse'
              key={"categoryLoading" + index}
            ></div>
          ))
        ) : (
          categoryProduct.map((product) => (
            <Link
              to={`/product-category?category=${product?.category}`}
              className='flex flex-col items-center text-center cursor-pointer'
              key={product?.category}
            >
              <div className='w-20 h-20 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden transition-transform hover:scale-110'>
                <img
                  src={product?.productImage[0]}
                  alt={product?.category}
                  className='w-full h-full object-cover'
                />
              </div>
              <p className='mt-2 text-sm md:text-base font-medium capitalize'>{product?.category}</p>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default CategoryList;
