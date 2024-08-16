import React, { useContext, useEffect, useState } from "react";
import SummaryApi from "../common";
import Context from "../context";
import displayINRCurrency from "../helpers/displayCurrency";
import { MdDelete } from "react-icons/md";
import { loadStripe } from "@stripe/stripe-js";

const Cart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const context = useContext(Context);
  const loadingCart = new Array(4).fill(null);

  const fetchData = async () => {
    const response = await fetch(SummaryApi.addToCartProductView.url, {
      method: SummaryApi.addToCartProductView.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });

    const responseData = await response.json();

    if (responseData.success) {
      setData(responseData.data);
    }
  };

  const handleLoading = async () => {
    await fetchData();
  };

  useEffect(() => {
    setLoading(true);
    handleLoading();
    setLoading(false);
  }, []);

  const increaseQty = async (id, qty) => {
    const response = await fetch(SummaryApi.updateCartProduct.url, {
      method: SummaryApi.updateCartProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
        quantity: qty + 1,
      }),
    });

    const responseData = await response.json();

    if (responseData.success) {
      fetchData();
    }
  };

  const decreaseQty = async (id, qty) => {
    if (qty >= 2) {
      const response = await fetch(SummaryApi.updateCartProduct.url, {
        method: SummaryApi.updateCartProduct.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          _id: id,
          quantity: qty - 1,
        }),
      });

      const responseData = await response.json();

      if (responseData.success) {
        fetchData();
      }
    }
  };

  const deleteCartProduct = async (id) => {
    const response = await fetch(SummaryApi.deleteCartProduct.url, {
      method: SummaryApi.deleteCartProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
      }),
    });

    const responseData = await response.json();

    if (responseData.success) {
      fetchData();
      context.fetchUserAddToCart();
    }
  };

  const handlePayment = async () => {

    const stripePromise = await loadStripe(
      process.env.REACT_APP_STRIPE_PUBLIC_KEY
    );

    const response = await fetch(SummaryApi.payment.url, {
      method: SummaryApi.payment.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        cartItems: data,
      }),
    });
    const responseData = await response.json();
    if (responseData?.id) {
      stripePromise.redirectToCheckout({ sessionId: responseData.id });
    }
    console.log("payment response", responseData);
  };

  const totalQty = data.reduce(
    (previousValue, currentValue) => previousValue + currentValue.quantity,
    0
  );
  const totalPrice = data.reduce(
    (preve, curr) => preve + curr.quantity * curr?.productId?.sellingPrice,
    0
  );

  return (
    <div className="container mx-auto p-4">
      <div className="text-center text-lg my-3">
        {data.length === 0 && !loading && (
          <p className="bg-white py-5 text-gray-500">No items in cart</p>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-10 lg:justify-between">
        <div className="w-full max-w-3xl">
          {loading
            ? loadingCart.map((_, index) => (
                <div
                  key={index}
                  className="w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded-lg"
                ></div>
              ))
            : data.map((product) => (
                <div
                  key={product?._id}
                  className="w-full bg-white h-32 my-2 border border-slate-300 rounded-lg flex items-center"
                >
                  <div className="w-32 h-32 bg-slate-200 flex-shrink-0">
                    <img
                      src={product?.productId?.productImage[0]}
                      alt={product?.productId?.productName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="px-4 py-2 flex-1 relative">
                    <div
                      className="absolute top-2 right-2 text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer"
                      onClick={() => deleteCartProduct(product?._id)}
                    >
                      <MdDelete />
                    </div>

                    <h2 className="text-lg font-semibold truncate">
                      {product?.productId?.productName}
                    </h2>
                    <p className="capitalize text-slate-500">
                      {product?.productId?.category}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-red-600 font-medium text-lg">
                        {displayINRCurrency(product?.productId?.sellingPrice)}
                      </p>
                      <p className="text-slate-600 font-semibold text-lg">
                        {displayINRCurrency(
                          product?.productId?.sellingPrice * product?.quantity
                        )}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 mt-2">
                      <button
                        className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-8 h-8 flex justify-center items-center rounded-full"
                        onClick={() =>
                          decreaseQty(product?._id, product?.quantity)
                        }
                      >
                        -
                      </button>
                      <span>{product?.quantity}</span>
                      <button
                        className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-8 h-8 flex justify-center items-center rounded-full"
                        onClick={() =>
                          increaseQty(product?._id, product?.quantity)
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
        </div>

        {data[0] && (
          <div className="mt-5 lg:mt-0 w-full max-w-sm">
            {loading ? (
              <div className="h-36 bg-slate-200 border border-slate-300 animate-pulse rounded-lg"></div>
            ) : (
              <div className="h-36 bg-white border border-slate-300 rounded-lg p-4">
                <h2 className="text-white bg-red-600 px-4 py-1 text-lg font-semibold">
                  Summary
                </h2>
                <div className="flex items-center justify-between font-medium text-lg text-slate-600 mt-2">
                  <p>Quantity</p>
                  <p>{totalQty}</p>
                </div>
                <div className="flex items-center justify-between font-medium text-lg text-slate-600 mt-2">
                  <p>Total Price</p>
                  <p>{displayINRCurrency(totalPrice)}</p>
                </div>
                <button
                  className="bg-blue-600 text-white p-2 w-full mt-4 rounded-lg hover:bg-blue-700 transition-all"
                  onClick={handlePayment}
                >
                  Proceed to Payment
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
