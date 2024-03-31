import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout";
import { useSelector, useDispatch } from "react-redux";
import { addCart, updateQuantity } from "../Redux/cartSlice";
import AxiosService from "../Utils/AxiosService";
import { useParams } from "react-router-dom";
import { toast, Bounce } from "react-toastify";
import { Rating } from "flowbite-react";

function ProductDetails() {
  let { _id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [product, setProducts] = useState([]);
  const getData = async () => {
    try {
      const res = await AxiosService.get(`/products/${_id}`);

      if (res.status === 200) {
        setProducts(res.data.product);
        console.log(res.data.product);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const notify = () => {
    toast.success("Item Added Successfully", {
      position: "top-center",

      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,

      transition: Bounce,
    });
  };

  const dispatch = useDispatch();
  const cartCount = useSelector((state) => state.cart.list);
  return (
    <>
      <Layout>
        <section className="py-12 sm:py-16">
          <div className="container mx-auto px-12">
            <div className=" lg:col-gap-12 xl:col-gap-16 mt-8 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-5 lg:gap-16">
              <div className="lg:col-span-3 lg:row-end-1">
                <div className="lg:flex lg:items-start">
                  <div className="lg:order-2 lg:ml-5">
                    <div className="max-w-xl overflow-hidden rounded-lg">
                      <img
                        className="h-full w-full max-w-full object-cover"
                        src={product.images}
                        alt=""
                      />
                    </div>
                  </div>

                  {/* <div className="mt-2 w-full lg:order-1 lg:w-32 lg:flex-shrink-0">
                    <div className="flex flex-row items-start lg:flex-col">
                      <button
                        type="button"
                        className="flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 border-gray-900 text-center"
                      >
                        <img
                          className="h-full w-full object-cover"
                          src="/images/JHxMnVrtPMdcNU1s_7g7f.png"
                          alt=""
                        />
                      </button>
                      <button
                        type="button"
                        className="flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 border-transparent text-center"
                      >
                        <img
                          className="h-full w-full object-cover"
                          src="/images/JHxMnVrtPMdcNU1s_7g7f.png"
                          alt=""
                        />
                      </button>
                      <button
                        type="button"
                        className="flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 border-transparent text-center"
                      >
                        <img
                          className="h-full w-full object-cover"
                          src="/images/JHxMnVrtPMdcNU1s_7g7f.png"
                          alt=""
                        />
                      </button>
                    </div>
                  </div> */}
                </div>
              </div>

              <div className="lg:col-span-2 lg:row-span-2 lg:row-end-2">
                <h1 className="sm: text-2xl font-bold text-gray-900 sm:text-3xl">
                  {product.name}
                </h1>

                <div className="mt-5 flex items-center">
                  <div className="flex items-center">
                   
                      <svg
                       
                        className="block h-4 w-4 align-middle text-yellow-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                          className=""
                        ></path>
                      </svg>
                   
                  </div>
                  <p className="ml-2 text-sm font-medium text-gray-500">
                    {product.rating} Ratings
                  </p>
                </div>

                <div className="mt-3 flex select-none flex-wrap items-center gap-1">
                  <p>{product.description}</p>
                </div>

                <h2 className="mt-8 text-base text-gray-900 pb-4">Quantity</h2>
                <div className="sm:order-1">
                  <div className="mx-auto flex h-8 items-stretch text-gray-600">
                    <button
                      className="flex items-center justify-center rounded-l-md bg-gray-200 px-4 transition hover:bg-black hover:text-white"
                      onClick={() =>
                        setQuantity(quantity > 0 ? quantity - 1 : 0)
                      }
                    >
                      -
                    </button>
                    <div className="flex  items-center justify-center bg-gray-100 px-4 text-xs uppercase transition">
                      <input
                        type="number"
                        value={quantity}
                        id="price"
                        className="block w-24 rounded-md border-0 py-1 pl-10 pr-1 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                        onChange={(e) =>
                          dispatch(
                            updateQuantity({
                              _id: product._id,
                              quantity: e.target.value,
                            })
                          )
                        }
                      />
                    </div>
                    <button
                      className="flex items-center justify-center rounded-r-md bg-gray-200 px-4 transition hover:bg-black hover:text-white"
                      onClick={() =>
                        setQuantity(
                          quantity < product.stock ? quantity + 1 : quantity
                        )
                      }
                    >
                      +
                    </button>
                    {product.stock !== 0 ? (
                      <>
                        <div className="flex  items-center justify-center bg-lime-300 mx-9 px-5 text-xs  transition">
                          <h6>In stock</h6>
                        </div>
                      </>
                    ) : (
                      <div className="flex  items-center justify-center bg-red-500 mx-9 px-5 text-xs  transition">
                        <h6>Out Of Stock</h6>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-10 flex flex-col items-center justify-between space-y-4 border-t border-b py-4 sm:flex-row sm:space-y-0">
                  <div className="flex items-end">
                    <h1 className="text-3xl font-bold">₹{product.price}</h1>
                  </div>

                  <button
                    className="inline-flex items-center justify-center rounded-md border-2 border-transparent bg-gray-900 bg-none px-12 py-3 text-center text-base font-bold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800"
                    onClick={() => {
                      dispatch(addCart(product));
                      notify();
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="shrink-0 mr-3 h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    Add to Bag
                  </button>
                </div>

                {/* <ul className="mt-8 space-y-2">
                  <li className="flex items-center text-left text-sm font-medium text-gray-600">
                    <svg
                      className="mr-2 block h-5 w-5 align-middle text-gray-500"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        stroke-width="2"
                        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        className=""
                      ></path>
                    </svg>
                    Free shipping worldwide
                  </li>

                  <li className="flex items-center text-left text-sm font-medium text-gray-600">
                    <svg
                      className="mr-2 block h-5 w-5 align-middle text-gray-500"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                        className=""
                      ></path>
                    </svg>
                    Cancel Anytime
                  </li>
                </ul> */}
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}

export default ProductDetails;
