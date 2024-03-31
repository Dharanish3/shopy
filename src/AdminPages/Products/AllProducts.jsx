import React, { useState, useEffect } from "react";
import { Button, Modal } from "flowbite-react";
import { MdDelete } from "react-icons/md";
import Topbar from "../Topbar";
import Sidebar from "../Sidebar";
import { useNavigate } from "react-router-dom";
import AxiosService from "../../Utils/AxiosService";
import { toast } from "react-toastify";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

function AllProducts() {
  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false);
  const [deletingProductId, setDeletingProductId] = useState(null);

  const handleDelete = (productId) => {
    setDeletingProductId(productId);
    setOpenModal(true);
  };

  
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState([]); //search function

  const [currentPage, setCurrentPage] = useState(1); //Current Page
  const [totalPages, setTotalPages] = useState(1); //Total Page
  const Limit = 3; //Limit

  //   Get all Data
  const getData = async () => {
    try {
      const res = await AxiosService.get(
        `/products/paginate?page=${currentPage}`
      );
      if (res.status === 200) {
        console.log(res);
        setProducts(res.data.product);
        setSearch(res.data.product);
        setTotalPages(res.data.numberOfPages);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //   Delete Product
  const deleteProduct = async (id) => {
    try {
      const res = await AxiosService.delete(`/products/${id}`);
      if (res.status === 200) {
        toast.success(res.data.message);
        setOpenModal(false);
        getData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  //   Search Handle
  const handleChange = (event) => {
    setSearch(
      products.filter((val) =>
        val.name.toLowerCase().includes(event.target.value)
      )
    );
  };

  useEffect(() => {
    getData();
  }, [currentPage]);

  return (
    <>
      <Topbar />
      <Sidebar>
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-2 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              All Products
            </h1>
            <br />
            <div className="flex">
              <form className="flex-initial w-72 max-w-md ">
                <label
                  for="default-search"
                  className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                >
                  Search
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                  </div>
                  <input
                    type="search"
                    id="default-search"
                    className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search product"
                    onChange={handleChange}
                  />
                </div>
              </form>{" "}
              &nbsp;
              <button
                type="button"
                className=" flex-row-reverse focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-3 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                onClick={() => navigate("/admin/add-products")}
              >
                {" "}
                Add New Product +
              </button>
            </div>
          </div>
        </header>

        <div className=" border relative overflow-x-auto p-2 shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  S.No
                </th>
                <th scope="col" className="px-6 py-3">
                  Product name
                </th>
                <th scope="col" className="px-6 py-3">
                  Category
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Stock
                </th>
                <th scope="col" className="px-11 py-3 ">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {search.length > 0 ? (
                search.map((product, index) => (
                  <>
                    <tr
                      className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                      key={index}
                    >
                      <td
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {index + 1 + (currentPage - 1) * Limit}
                      </td>
                      <td className="px-6 py-4">{product.name}</td>
                      <td className="px-6 py-4">{product.category.name}</td>
                      <td className="px-6 py-4">{product.price}</td>
                      <td className="px-6 py-4">{product.stock}</td>
                      <td className="px-6 py-4">
                        <button
                          type="button"
                          className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                          onClick={() =>
                            navigate(`/admin/edit-products/${product._id}`)
                          }
                        >
                          Edit
                        </button>{" "}
                        &nbsp;
                        <button
                          type="button"
                          className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                          // onClick={() => deleteProduct(product._id)}
                          onClick={() => handleDelete(product._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>

                    <Modal
                      show={openModal}
                      size="md"
                      onClose={() => setOpenModal(false)}
                      popup
                    >
                      <Modal.Header />
                      <Modal.Body>
                        <div className="text-center">
                          <MdDelete className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Are you sure you want to delete this product?
                          </h3>
                          <div className="flex justify-center gap-4">
                            <Button
                              color="failure"
                              onClick={() => deleteProduct(deletingProductId)}
                            >
                              {"Yes, I'm sure"}
                            </Button>
                            <Button
                              color="gray"
                              onClick={() => setOpenModal(false)}
                            >
                              No, cancel
                            </Button>
                          </div>
                        </div>
                      </Modal.Body>
                    </Modal>
                  </>
                ))
              ) : (
                <>
                  <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <td
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      No data Found
                    </td>
                  </tr>
                </>
              )}
            </tbody>
          </table>

          {/* Paginate Start */}
          <nav aria-label="Page navigation example">
            <ul className="flex justify-end -space-x-px text-base h-10">
              <li>
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <ChevronLeftIcon className="w-5 h-5" />
                  Previous
                </button>
              </li>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <li key={page}>
                    <button
                      onClick={() => setCurrentPage(page)}
                      className={`flex items-center justify-center px-4 h-10 leading-tight text-black border border-gray-300 ${
                        currentPage === page
                          ? "bg-slate-950 text-white  hover:bg-slate-950 hover:text-white dark:border-gray-700 dark:bg-slate-950 dark:text-white"
                          : "bg-gray-100 text-black hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                      }`}
                    >
                      {page}
                    </button>
                  </li>
                )
              )}

              <li>
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Next
                  <ChevronRightIcon className="w-5 h-5" />
                </button>
              </li>
            </ul>
          </nav>

          {/* Paginate End */}
        </div>
      </Sidebar>
    </>
  );
}

export default AllProducts;
