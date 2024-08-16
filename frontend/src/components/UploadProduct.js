import React, { useState } from 'react';
import { CgClose } from 'react-icons/cg';
import productCategory from '../helpers/productCategory';
import { FaCloudUploadAlt } from 'react-icons/fa';
import uploadImage from '../helpers/uploadImage';
import DisplayImage from './DisplayImage';
import { MdDelete } from 'react-icons/md';
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const UploadProduct = ({ onClose, fetchData }) => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: ""
  });
  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUploadProduct = async (e) => {
    const file = e.target.files[0];
    const uploadImageCloudinary = await uploadImage(file);

    setData(prev => ({
      ...prev,
      productImage: [...prev.productImage, uploadImageCloudinary.url]
    }));
  };

  const handleDeleteProductImage = async (index) => {
    const newProductImage = [...data.productImage];
    newProductImage.splice(index, 1);

    setData(prev => ({
      ...prev,
      productImage: [...newProductImage]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(SummaryApi.uploadProduct.url, {
      method: SummaryApi.uploadProduct.method,
      credentials: 'include',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const responseData = await response.json();

    if (responseData.success) {
      toast.success(responseData?.message);
      onClose();
      fetchData();
    }

    if (responseData.error) {
      toast.error(responseData?.message);
    }
  };

  return (
    <div className='fixed inset-0 bg-gray-800 bg-opacity-60 flex items-center justify-center'>
      <div className='bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full max-h-[90%] overflow-auto'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-2xl font-bold'>Upload Product</h2>
          <button
            className='text-3xl text-gray-600 hover:text-red-600'
            onClick={onClose}
          >
            <CgClose />
          </button>
        </div>

        <form className='space-y-4' onSubmit={handleSubmit}>
          <div>
            <label htmlFor='productName' className='block text-sm font-medium text-gray-700'>Product Name</label>
            <input
              type='text'
              id='productName'
              name='productName'
              value={data.productName}
              onChange={handleOnChange}
              placeholder='Enter product name'
              className='mt-1 p-2 border rounded-lg w-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500'
              required
            />
          </div>

          <div>
            <label htmlFor='brandName' className='block text-sm font-medium text-gray-700'>Brand Name</label>
            <input
              type='text'
              id='brandName'
              name='brandName'
              value={data.brandName}
              onChange={handleOnChange}
              placeholder='Enter brand name'
              className='mt-1 p-2 border rounded-lg w-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500'
              required
            />
          </div>

          <div>
            <label htmlFor='category' className='block text-sm font-medium text-gray-700'>Category</label>
            <select
              id='category'
              name='category'
              value={data.category}
              onChange={handleOnChange}
              className='mt-1 p-2 border rounded-lg w-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500'
              required
            >
              <option value=''>Select Category</option>
              {productCategory.map((el, index) => (
                <option value={el.value} key={el.value + index}>{el.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor='productImage' className='block text-sm font-medium text-gray-700'>Product Image</label>
            <label htmlFor='uploadImageInput' className='w-full block mt-1'>
              <div className='border rounded-lg p-4 flex flex-col items-center justify-center bg-gray-100 cursor-pointer hover:bg-gray-200'>
                <FaCloudUploadAlt className='text-4xl text-gray-500' />
                <p className='text-sm text-gray-500'>Upload Product Image</p>
                <input
                  type='file'
                  id='uploadImageInput'
                  className='hidden'
                  onChange={handleUploadProduct}
                />
              </div>
            </label>
            {data.productImage.length > 0 && (
              <div className='mt-4 flex flex-wrap gap-2'>
                {data.productImage.map((el, index) => (
                  <div key={index} className='relative group'>
                    <img
                      src={el}
                      alt='Product'
                      className='w-20 h-20 object-cover bg-gray-100 border rounded-lg cursor-pointer hover:opacity-80'
                      onClick={() => {
                        setOpenFullScreenImage(true);
                        setFullScreenImage(el);
                      }}
                    />
                    <button
                      className='absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity'
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteProductImage(index);
                      }}
                    >
                      <MdDelete />
                    </button>
                  </div>
                ))}
              </div>
            )}
            {data.productImage.length === 0 && (
              <p className='text-red-600 text-xs'>*Please upload a product image</p>
            )}
          </div>

          <div>
            <label htmlFor='price' className='block text-sm font-medium text-gray-700'>Price</label>
            <input
              type='number'
              id='price'
              name='price'
              value={data.price}
              onChange={handleOnChange}
              placeholder='Enter price'
              className='mt-1 p-2 border rounded-lg w-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500'
              required
            />
          </div>

          <div>
            <label htmlFor='sellingPrice' className='block text-sm font-medium text-gray-700'>Selling Price</label>
            <input
              type='number'
              id='sellingPrice'
              name='sellingPrice'
              value={data.sellingPrice}
              onChange={handleOnChange}
              placeholder='Enter selling price'
              className='mt-1 p-2 border rounded-lg w-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500'
              required
            />
          </div>

          <div>
            <label htmlFor='description' className='block text-sm font-medium text-gray-700'>Description</label>
            <textarea
              id='description'
              name='description'
              value={data.description}
              onChange={handleOnChange}
              placeholder='Enter product description'
              rows='4'
              className='mt-1 p-2 border rounded-lg w-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500'
            />
          </div>

          <button
            type='submit'
            className='mt-6 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500'
          >
            Upload Product
          </button>
        </form>
      </div>

      {openFullScreenImage && (
        <DisplayImage onClose={() => setOpenFullScreenImage(false)} imgUrl={fullScreenImage} />
      )}
    </div>
  );
};

export default UploadProduct;
