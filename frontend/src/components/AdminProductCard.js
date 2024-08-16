import React, { useState } from 'react';
import { MdModeEditOutline } from "react-icons/md";
import AdminEditProduct from './AdminEditProduct';
import displayINRCurrency from '../helpers/displayCurrency';

const AdminProductCard = ({
  data,
  fetchdata
}) => {
  const [editProduct, setEditProduct] = useState(false);

  return (
    <div className='bg-white p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105'>
      <div className='flex flex-col items-center'>
        <div className='w-32 h-32 flex justify-center items-center'>
          <img src={data?.productImage[0]} alt={data.productName} className='w-full h-full object-cover rounded-md' />
        </div>
        <h1 className='mt-2 text-lg font-semibold text-gray-800 text-center line-clamp-2'>{data.productName}</h1>

        <div className='mt-2 text-center'>
          <p className='font-semibold text-gray-900'>
            {displayINRCurrency(data.sellingPrice)}
          </p>

          <button
            className='mt-2 p-2 bg-green-500 hover:bg-green-600 text-white rounded-full transition-colors duration-300'
            onClick={() => setEditProduct(true)}
          >
            <MdModeEditOutline className='text-xl' />
          </button>
        </div>
      </div>

      {editProduct && (
        <AdminEditProduct productData={data} onClose={() => setEditProduct(false)} fetchdata={fetchdata} />
      )}
    </div>
  );
};

export default AdminProductCard;
