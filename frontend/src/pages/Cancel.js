import React from 'react'
import cancelImg from '../assest/cancel.gif'
import { Link } from 'react-router-dom';

function Cancel() {
    return (
        <div className="bg-slate-200 w-full max-w-md  mx-auto flex justify-center items-center flex-col p-4 m-4 rounded">
          <img src={cancelImg} width={150} height={150} className='mix-blend-muliply' />
          <p className="text-red-600 font-bold text-xl">Payment Cancelled</p>
          <Link to={"/cart"} className="p-2 mt-5 px-3 rounded font-semibold text-red-600 hover:bg-red-600 hover:text-white border-2 border-red-600">Go to Cart</Link>
        </div>
      );
}

export default Cancel