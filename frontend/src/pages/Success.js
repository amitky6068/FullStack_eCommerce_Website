import React from "react";
import SuccessImg from "../assest/success.gif";
import {Link} from 'react-router-dom'

function Success() {
  return (
    <div className="bg-slate-200 w-full max-w-md  mx-auto flex justify-center items-center flex-col p-4 m-4 rounded">
      <img src={SuccessImg} width={150} height={150} />
      <p className="text-green-600 font-bold text-xl">Payment Successfully</p>
      <Link to={"/order"} className="p-2 mt-5 px-3 rounded font-semibold text-green-600 hover:bg-green-600 hover:text-white border-2 border-green-600">See Order</Link>
    </div>
  );
}

export default Success;
