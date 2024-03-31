import React, { useState, useEffect } from "react";
import Topbar from "../Topbar";
import Sidebar from "../Sidebar";
import { useNavigate } from "react-router-dom";
import AxiosService from "../../Utils/AxiosService";
import { toast } from "react-toastify";

function AllCategories() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState([]);

  const getData = async () => {
    try {
      const res = await AxiosService.get("/category");
      if (res.status === 200) {
        console.log(res);
        setCategories(res.data.category);
        setSearch(res.data.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCategory = async (id) => {
    try {
      const res = await AxiosService.delete(`/category/${id}`);
      if (res.status === 200) {
        toast.success(res.data.message);
        getData();
      }
    } catch (error) {
      console.log(error);
      toast.error("Cannot delete category , First Delete Products");
    }
  };


  const handleChange = (event) => {
    setSearch(
      categories.filter((val) =>
        val.name.toLowerCase().includes(event.target.value)
      )
    );
  };

  const updateFeatureStatus = async (id, featured) => {
    try {
      const res = await AxiosService.patch(`/category/${id}/featured`, { featured });
      if (res.status === 200) {
        toast.success('Status Updated Successfully');
        getData(); 
      }
    } catch (error) {
      console.log(error);
      toast.error("Cannot update feature status");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Topbar />
      <Sidebar>
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-2 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
               Categories
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
                onClick={() => navigate("/admin/add-categories")}
              >
                {" "}
                Add New Category +
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
                  Category name
                </th>
                <th scope="col" className="px-6 py-3">
                  Featured
                </th>

                <th scope="col" className="px-11 py-3 ">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {search.length > 0 ? (
                search.map((category, index) => (
                  <tr
                    className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                    key={index}
                  >
                    <td
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {index + 1}
                    </td>
                    <td className="px-6 py-4">{category.name}</td>
                    <td className="px-6 py-4">
                      <label class="inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={category.featured}
                          class="sr-only peer"
                          onChange={(e) => updateFeatureStatus(category._id, e.target.checked)}
                        />
                        <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      </label>
                    </td>

                    <td className="px-6 py-4">
                      <button
                        type="button"
                        className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                        onClick={() =>
                          navigate(`/admin/edit-categories/${category._id}`)
                        }
                      >
                        Edit
                      </button>{" "}
                      &nbsp;
                      <button
                        type="button"
                        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                        onClick={() => deleteCategory(category._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
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
        </div>
      </Sidebar>
    </>
  );
}

export default AllCategories;
