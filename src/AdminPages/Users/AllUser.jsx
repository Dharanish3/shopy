import React, { useState, useEffect } from "react";
import Topbar from "../Topbar";
import Sidebar from "../Sidebar";
import { useNavigate } from "react-router-dom";
import AxiosService from "../../Utils/AxiosService";
import { toast } from "react-toastify";

function AllUser() {

    const [users,setUser] = useState([])

    const getData= async()=> {
        try {
          const res =  await AxiosService.get('/user/all') 
          if(res.status=200){
            setUser(res.data.user)
          }

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=> {
        getData()
    },[])
  return (
    <>
      <Topbar />
      <Sidebar>
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-2 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              User
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
              </form>{" "}
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
                  Customer name
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Mobile
                </th>

                {/* <th scope="col" className="px-11 py-3 ">
                  Action
                </th> */}
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user, index) => (
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
                    <td className="px-6 py-4">{user.name}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">+{user.phone}</td>
                  

                    {/* <td className="px-6 py-4">
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
                    </td> */}
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

export default AllUser;
