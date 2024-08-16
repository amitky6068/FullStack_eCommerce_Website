import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'

const Home = () => {
  return (
    <div className='container mx-auto p-4'>
 
      <div className='mb-6'>
        <CategoryList />
      </div>
      
      <div className='mb-6'>
        <BannerProduct />
      </div>

      <div className='space-y-6'>
        <HorizontalCardProduct category={"airpodes"} heading={"Top's Airpodes"} />
        <HorizontalCardProduct category={"watches"} heading={"Popular's Watches"} />
      </div>

      <div className='space-y-6 mt-8'>
        <VerticalCardProduct category={"mobiles"} heading={"Mobiles"} />
        <VerticalCardProduct category={"Mouse"} heading={"Mouse"} />
        <VerticalCardProduct category={"televisions"} heading={"Televisions"} />
        <VerticalCardProduct category={"camera"} heading={"Camera & Photography"} />
        <VerticalCardProduct category={"earphones"} heading={"Wired Earphones"} />
        <VerticalCardProduct category={"speakers"} heading={"Bluetooth Speakers"} />
        <VerticalCardProduct category={"refrigerator"} heading={"Refrigerator"} />
        <VerticalCardProduct category={"trimmers"} heading={"Trimmers"} />
      </div>
    </div>
  )
}

export default Home
