import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Newsletter from "./Newsletter";
import { removeCart, updateQuantity } from "../Redux/cartSlice";
import { toast, Bounce } from "react-toastify";

function Cart() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const cartTotal = useSelector((state) => state.cart);
  const notify = () => {
    toast.success("Item Removed ", {
      position: "top-center",

      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,

      transition: Bounce,
    });
  };
  const cartCount = useSelector((state) => state.cart.list);

  return (
    <>
      <Layout>
        {cartCount.length === 0 ? (
          <>
            {" "}
            <section className="h-screen bg-gray-100 py-12 sm:py-16 lg:py-20 mt-8">
              <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-center">
                  <h1 className="text-2xl font-semibold text-gray-900">
                    Cart Empty{" "}
                  </h1>
                </div>
              </div>
            </section>
          </>
        ) : (
          <>
            {" "}
            <section className="h-screen bg-gray-100 py-12 sm:py-16 lg:py-20 mb-10">
              <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-center">
                  <h1 className="text-2xl font-semibold text-gray-900">
                    {cartCount.length !== 1
                      ? `${cartCount.length} items`
                      : `${cartCount.length} item`}{" "}
                  </h1>
                </div>

                <div className="mx-auto mt-8 max-w-4xl md:mt-12 mb-10">
                  <div className="bg-white shadow">
                    <div className="px-4 py-6 sm:px-8 sm:py-10">
                      <div className="flow-root">
                        <ul className="-my-8 ">
                          {cartCount.map((item, index) => (
                            <li
                              className="flex flex-col space-y-3 border mb-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0"
                              key={index}
                            >
                              <div className="shrink-0">
                                <img
                                  className="h-24 w-24 max-w-full rounded-lg object-cover"
                                  src={item.images}
                                  alt=""
                                />
                              </div>

                              <div className="relative flex flex-1 flex-col justify-between">
                                <div className="sm:col-gap-5 sm:grid sm:grid-cols-2">
                                  <div className="pr-8 sm:pr-5">
                                    <p className="text-base font-semibold text-gray-900">
                                      {item.name} <br />
                                      1*{item.price}
                                    </p>
                                    <p className="mx-0 mt-1 mb-0 text-sm text-black">
                                      {item.rating}
                                    </p>
                                  </div>

                                  <div className="mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
                                    <p className="shrink-0 w-20 text-base font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right">
                                      ₹ {+item.price.replace(/₹/g, '').replace(/,/g, '') * item.quantity}
                                    </p>

                                    <div className="sm:order-1">
                                      <div className="mx-auto flex h-8 items-stretch text-gray-600">
                                        <button
                                          className="flex items-center justify-center rounded-l-md bg-gray-200 px-4 transition hover:bg-black hover:text-white"
                                          onClick={() => {
                                            if (item.quantity > 0) {
                                              dispatch(
                                                updateQuantity({
                                                  _id: item._id,
                                                  quantity: item.quantity - 1,
                                                })
                                              );
                                            }
                                          }}
                                        >
                                          -
                                        </button>
                                        <div className="flex w-full items-center justify-center bg-gray-100 px-4 text-xs uppercase transition">
                                          <input
                                            type="number"
                                            value={item.quantity}
                                            id="price"
                                            className="block w-24 rounded-md border-0 py-1 pl-10 pr-1 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                            onChange={(e) =>
                                              dispatch(
                                                updateQuantity({
                                                  _id: item._id,
                                                  quantity: e.target.value,
                                                })
                                              )
                                            }
                                          />
                                        </div>
                                        <button
                                          className="flex items-center justify-center rounded-r-md bg-gray-200 px-4 transition hover:bg-black hover:text-white"
                                          onClick={() => {
                                            if (item.quantity < 9) {
                                              dispatch(
                                                updateQuantity({
                                                  _id: item._id,
                                                  quantity: item.quantity + 1,
                                                })
                                              );
                                            }
                                          }}
                                        >
                                          +
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="absolute top-0 right-0 flex sm:bottom-0 sm:top-auto">
                                  <button
                                    type="button"
                                    className="flex rounded p-2 text-center text-gray-500 transition-all duration-200 ease-in-out focus:shadow hover:text-gray-900"
                                    onClick={() => {
                                      dispatch(removeCart({ _id: item._id }));
                                      notify();
                                    }}
                                  >
                                    <svg
                                      className="h-5 w-5"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M6 18L18 6M6 6l12 12"
                                        className=""
                                      ></path>
                                    </svg>
                                  </button>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-6 border-t border-b py-2">
                        {/* <div className="flex items-center justify-between">
                          <p className="text-sm text-gray-400">Subtotal</p>
                          <p className="text-lg font-semibold text-gray-900">
                            $399.00
                          </p>
                        </div> */}
                        {/* <div className="flex items-center justify-between">
                          <p className="text-sm text-gray-400">Shipping</p>
                          <p className="text-lg font-semibold text-gray-900">
                            $8.00
                          </p>
                        </div> */}
                      </div>
                      <div className="mt-6 flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">
                          Total Price
                        </p>
                        <p className="text-2xl font-semibold text-gray-900">
                          <span className="text-xs font-normal text-gray-400">
                            ₹
                          </span>{" "}
                          {cartTotal.totalPrice}
                        </p>
                      </div>

                      <div className="mt-6 text-center">
                        <button
                          type="button"
                          className="group inline-flex w-full items-center justify-center rounded-md bg-gray-900 px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800"
                          onClick={() => navigate("/checkout")}
                        >
                          Checkout
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="group-hover:ml-8 ml-4 h-6 w-6 transition-all"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            stroke-width="2"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M13 7l5 5m0 0l-5 5m5-5H6"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
        <Newsletter />
      </Layout>
    </>
  );
}

export default Cart;
