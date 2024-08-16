import React, { useEffect, useState } from 'react'
import UploadProduct from '../components/UploadProduct'
import SummaryApi from '../common'
import AdminProductCard from '../components/AdminProductCard'

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false)
  const [allProduct, setAllProduct] = useState([])

  const fetchAllProduct = async () => {
    const response = await fetch(SummaryApi.allProduct.url)
    const dataResponse = await response.json()

    console.log("product data", dataResponse)

    setAllProduct(dataResponse?.data || [])
  }

  useEffect(() => {
    fetchAllProduct()
  }, [])

  return (
    <div className='min-h-[calc(100vh-120px)] p-4'>
      <div className='bg-white py-4 px-6 shadow-md rounded-lg flex justify-between items-center mb-4'>
        <h2 className='font-bold text-2xl'>All Products</h2>
        <button
          className='border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-2 px-4 rounded-full text-lg'
          onClick={() => setOpenUploadProduct(true)}
        >
          Upload Product
        </button>
      </div>

      <div className='flex items-center flex-wrap gap-6 py-4 h-[calc(100vh-190px)] overflow-y-scroll'>
        {
          allProduct.map((product, index) => (
            <AdminProductCard data={product} key={index + "allProduct"} fetchData={fetchAllProduct} />
          ))
        }
      </div>
      {
        openUploadProduct && (
          <UploadProduct onClose={() => setOpenUploadProduct(false)} fetchData={fetchAllProduct} />
        )
      }
    </div>
  )
}

export default AllProducts
