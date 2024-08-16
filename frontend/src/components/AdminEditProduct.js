import React, { useState } from 'react';
import { CgClose } from "react-icons/cg";
import productCategory from '../helpers/productCategory';
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from '../helpers/uploadImage';
import DisplayImage from './DisplayImage';
import { MdDelete } from "react-icons/md";
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const AdminEditProduct = ({
  onClose,
  productData,
  fetchdata
}) => {
  const [data, setData] = useState({
    ...productData,
    productName: productData?.productName,
    brandName: productData?.brandName,
    category: productData?.category,
    productImage: productData?.productImage || [],
    description: productData?.description,
    price: productData?.price,
    sellingPrice: productData?.sellingPrice
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

    const response = await fetch(SummaryApi.updateProduct.url, {
      method: SummaryApi.updateProduct.method,
      credentials: 'include',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const responseData = await response.json();

    if (responseData.success) {
      toast.success(responseData.message);
      onClose();
      fetchdata();
    } else {
      toast.error(responseData.message);
    }
  };

  return (
    <div className='fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center'>
      <div className='bg-white p-6 rounded-lg w-full max-w-3xl max-h-[90%] overflow-auto shadow-lg'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-xl font-semibold'>Edit Product</h2>
          <button
            className='text-2xl text-gray-600 hover:text-red-600 focus:outline-none'
            onClick={onClose}
          >
            <CgClose />
          </button>
        </div>

        <form className='space-y-4' onSubmit={handleSubmit}>
          <div>
            <label htmlFor='productName' className='block text-sm font-medium text-gray-700'>Product Name:</label>
            <input
              type='text'
              id='productName'
              placeholder='Enter product name'
              name='productName'
              value={data.productName}
              onChange={handleOnChange}
              className='mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500'
              required
            />
          </div>

          <div>
            <label htmlFor='brandName' className='block text-sm font-medium text-gray-700'>Brand Name:</label>
            <input
              type='text'
              id='brandName'
              placeholder='Enter brand name'
              value={data.brandName}
              name='brandName'
              onChange={handleOnChange}
              className='mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500'
              required
            />
          </div>

          <div>
            <label htmlFor='category' className='block text-sm font-medium text-gray-700'>Category:</label>
            <select
              required
              value={data.category}
              name='category'
              onChange={handleOnChange}
              className='mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500'
            >
              <option value="">Select Category</option>
              {productCategory.map((el, index) => (
                <option value={el.value} key={el.value + index}>{el.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor='productImage' className='block text-sm font-medium text-gray-700'>Product Image:</label>
            <label htmlFor='uploadImageInput'>
              <div className='mt-1 p-4 bg-gray-100 border border-gray-300 rounded-md flex justify-center items-center cursor-pointer hover:bg-gray-200'>
                <div className='text-gray-500 text-center'>
                  <FaCloudUploadAlt className='text-3xl' />
                  <p className='text-sm mt-1'>Upload Product Image</p>
                  <input
                    type='file'
                    id='uploadImageInput'
                    className='hidden'
                    onChange={handleUploadProduct}
                  />
                </div>
              </div>
            </label>

            <div className='mt-2 flex flex-wrap gap-2'>
              {data.productImage.length > 0 ? (
                data.productImage.map((el, index) => (
                  <div key={index} className='relative group'>
                    <img
                      src={el}
                      alt={`Product Image ${index}`}
                      width={80}
                      height={80}
                      className='bg-gray-100 border border-gray-300 rounded-md cursor-pointer object-cover'
                      onClick={() => {
                        setOpenFullScreenImage(true);
                        setFullScreenImage(el);
                      }}
                    />
                    <button
                      className='absolute top-1 right-1 text-white bg-red-600 rounded-full p-1 opacity-0 group-hover:opacity-100'
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteProductImage(index);
                      }}
                    >
                      <MdDelete />
                    </button>
                  </div>
                ))
              ) : (
                <p className='text-red-600 text-xs'>*Please upload a product image</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor='price' className='block text-sm font-medium text-gray-700'>Price:</label>
            <input
              type='number'
              id='price'
              placeholder='Enter price'
              value={data.price}
              name='price'
              onChange={handleOnChange}
              className='mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500'
              required
            />
          </div>

          <div>
            <label htmlFor='sellingPrice' className='block text-sm font-medium text-gray-700'>Selling Price:</label>
            <input
              type='number'
              id='sellingPrice'
              placeholder='Enter selling price'
              value={data.sellingPrice}
              name='sellingPrice'
              onChange={handleOnChange}
              className='mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500'
              required
            />
          </div>

          <div>
            <label htmlFor='description' className='block text-sm font-medium text-gray-700'>Description:</label>
            <textarea
              id='description'
              placeholder='Enter product description'
              rows={4}
              name='description'
              onChange={handleOnChange}
              value={data.description}
              className='mt-1 w-full border border-gray-300 rounded-md shadow-sm p-2 resize-none focus:outline-none focus:ring-2 focus:ring-red-500'
            />
          </div>

          <button
            type='submit'
            className='mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500'
          >
            Update Product
          </button>
        </form>
      </div>

      {openFullScreenImage && (
        <DisplayImage onClose={() => setOpenFullScreenImage(false)} imgUrl={fullScreenImage} />
      )}
    </div>
  );
};

export default AdminEditProduct;
