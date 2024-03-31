import React, { useState, useEffect } from "react";
import Topbar from "../Topbar";
import Sidebar from "../Sidebar";
import { useNavigate, Link ,useParams} from "react-router-dom";
import { useFormik } from "formik";
import AxiosService from "../../Utils/AxiosService";
import { toast } from "react-toastify";

function EditCategories() {
  const navigate = useNavigate();
  const params = useParams();

  const [initialValues, setValues] = useState({
    name: "",
    images: "",
    
  });

  const getData = async () => {
    let { _id } = params;
    try {
      const res = await AxiosService.get(`/category/${_id}`);
      if (res.status === 200) {
        console.log(res)
        setValues({
            name:res.data.category.name,
          
            images : res.data.category.images,
            
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        let {_id} = params
        const res = await AxiosService.put(`/category/${_id}`, values);
        if (res.status === 200) {
          toast.success(res.data.message);
          navigate("/admin/all-categories");
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

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
              Add Categories
            </h1>
            <br />
          </div>
        </header>
        <form onSubmit={formik.handleSubmit}>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Category Name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      onChange={formik.handleChange}
                      value={formik.values.name}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="street-address"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Image
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="images"
                      id="images"
                      onChange={formik.handleChange}
                      value={formik.values.images}
                      placeholder="url-link"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-start gap-x-6">
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save
            </button>
          </div>
        </form>
      </Sidebar>
    </>
  );
}

export default EditCategories;
