import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AiOutlineShopping } from "react-icons/ai";
import Layout from "../Components/Layout";
import BreadCrumb from "./BreadCrumb";
import { useSelector, useDispatch } from "react-redux";
import { addCart } from "../Redux/cartSlice";
import { toast, Bounce } from "react-toastify";
import AxiosService from "../Utils/AxiosService";
import { BounceLoader } from "react-spinners";

function Products() {
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const cartCount = useSelector((state) => state.cart.list);

  const [products, setProducts] = useState();

  const getData = async () => {
    try {
      setLoading(true);
      const res = await AxiosService.get("/products");
      if (res.status === 200) {
        setProducts(res.data.product);
        setLoading(false);
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

  return (
    <>
      {loading ? (
        <Layout>
          
          <div className="flex justify-center items-center h-screen">
            <BounceLoader color="#00115e" size={60} />
          </div>
        </Layout>
      ) : (
        <>
          {location.pathname === "/shops" ? (
            <>
              <Layout>
                <BreadCrumb />
                <div className="bg-white">
                  <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    {/* start */}
                    <h2 className="text-center text-4xl mb-10 font-bold sm:text-5xl">
                      Products
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {products &&
                        products.map((product, index) => (
                          <div
                            className="relative m-3 md:m-4 flex flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md"
                            key={index}
                          >
                            <Link
                              className="relative flex h-40 md:h-60 overflow-hidden rounded-xl"
                              to={`/shops/${product._id}`}
                            >
                              <img
                                className="object-cover w-full h-full"
                                src={product.images}
                                alt="product image"
                              />
                              {/* <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
                          39% OFF
                        </span> */}
                            </Link>
                            <div className="mt-2 md:mt-4 px-3 md:px-5 pb-3 md:pb-5">
                              <a href="#">
                                <h5 className="text-lg md:text-xl tracking-tight text-slate-900">
                                  {product.name}
                                </h5>
                              </a>
                              <div className="mt-1 md:mt-2 mb-3 md:mb-5 flex items-center justify-between">
                                <p>
                                  <span className="text-xl md:text-3xl font-bold text-slate-900">
                                    ₹ {product.price}
                                  </span>
                                </p>
                                <div className="flex items-center">
                                  <svg
                                    aria-hidden="true"
                                    className="h-4 md:h-5 w-4 md:w-5 text-yellow-300"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                  ></svg>
                                  <span className="mr-1 md:mr-2 ml-2 md:ml-3 rounded bg-yellow-200 px-1.5 md:px-2.5 py-0.5 text-xs md:text-sm font-semibold">
                                    {product.rating}
                                  </span>
                                </div>
                              </div>

                              <button
                                onClick={() => {
                                  dispatch(addCart(product));
                                  notify();
                                }}
                                className="flex items-center justify-center rounded-md bg-slate-900 px-3 md:px-5 py-2 text-center text-sm md:text-base font-medium text-white hover:bg-amber-400 focus:outline-none focus:ring-4 focus:ring-blue-300"
                              >
                                <AiOutlineShopping />
                                &nbsp; Add to Bag
                              </button>
                            </div>
                          </div>
                        ))}
                    </div>

                    {/* End */}
                  </div>
                </div>
              </Layout>{" "}
            </>
          ) : (
            <>
              <div className="bg-white">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                  <div className="flex items-center justify-between pb-4">
                    <div className="flex-1">
                      <h1 className="flex-initia font-bold">Latest Products</h1>
                    </div>
                    <button
                      className="justify-center rounded-md bg-amber-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-amber-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      onClick={() => navigate("/shops")}
                    >
                      View All
                    </button>
                  </div>

                  {/* start */}

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {products &&
                      products.map((product, index) => (
                        <div
                          className="relative m-3 md:m-4 flex flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md"
                          key={index}
                        >
                          <Link
                            className="relative flex h-40 md:h-60 overflow-hidden rounded-xl"
                            to={`/shops/${product._id}`}
                          >
                            <img
                              className="object-cover w-full h-full"
                              src={product.images}
                              alt="product image"
                            />
                            {/* <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
                        39% OFF
                      </span> */}
                          </Link>
                          <div className="mt-2 md:mt-4 px-3 md:px-5 pb-3 md:pb-5">
                            <a href="#">
                              <h5 className="text-lg md:text-xl tracking-tight text-slate-900">
                                {product.name}
                              </h5>
                            </a>
                            <div className="mt-1 md:mt-2 mb-3 md:mb-5 flex items-center justify-between">
                              <p>
                                <span className="text-xl md:text-3xl font-bold text-slate-900">
                                  ₹ {product.price}
                                </span>
                              </p>
                              <div className="flex items-center">
                                <svg
                                  aria-hidden="true"
                                  className="h-4 md:h-5 w-4 md:w-5 text-yellow-300"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                  xmlns="http://www.w3.org/2000/svg"
                                ></svg>
                                <span className="mr-1 md:mr-2 ml-2 md:ml-3 rounded bg-yellow-200 px-1.5 md:px-2.5 py-0.5 text-xs md:text-sm font-semibold">
                                  {product.rating}
                                </span>
                              </div>
                            </div>

                            <button
                              onClick={() => {
                                dispatch(addCart(product));
                                notify();
                              }}
                              className="flex items-center justify-center rounded-md bg-slate-900 px-3 md:px-5 py-2 text-center text-sm md:text-base font-medium text-white hover:bg-amber-400 focus:outline-none focus:ring-4 focus:ring-blue-300"
                            >
                              <AiOutlineShopping />
                              &nbsp; Add to Bag
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>

                  {/* End */}
                </div>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}

export default Products;
