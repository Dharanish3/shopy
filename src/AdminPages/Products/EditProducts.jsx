import React, { useState, useEffect } from "react";
import Topbar from "../Topbar";
import Sidebar from "../Sidebar";
import { useNavigate, Link, useParams } from "react-router-dom";
import { useFormik } from "formik";
import AxiosService from "../../Utils/AxiosService";
import { toast } from "react-toastify";

function EditProducts() {
  const navigate = useNavigate();
  const params = useParams();

  const [initialValues, setValues] = useState({ 
    name: "",
    category: "",
    price: "",
    stock: "",
    rating: "",
    description: "",
    images: "",
    gallery: "",
  });

  const getDatas = async () => {
    let { _id } = params;
    try {
      const res = await AxiosService.get(`/products/${_id}`);
      if (res.status === 200) {
        console.log(res)
        setValues({
            name:res.data.product.name,
            price: res.data.product.price,
            category: res.data.product.category._id,
            stock : res.data.product.stock,
            rating: res.data.product.rating,
            description: res.data.product.description,
            images : res.data.product.images,
            gallery : res.data.product.gallery
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  //   Edit Product
  const formik = useFormik({
 
    initialValues: initialValues,

    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        let { _id } = params;

        const res = await AxiosService.put(`/products/${_id}`, values);
        if (res.status === 200) {
          toast.success(res.data.message);
          navigate("/admin/all-products");
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  //   Get Category
  const [categories, setCategories] = useState([]);
  const getData = async () => {
    try {
      const res = await AxiosService.get("/category");
      if (res.status === 200) {
        setCategories(res.data.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Get data
  useEffect(() => {
    getData();
    getDatas();
  }, []);
  return (
    <>
      <Topbar />
      <Sidebar>
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-2 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Add Products
            </h1>
            <br />
          </div>
        </header>

        <form onSubmit={formik.handleSubmit}>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-2">
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Product Name
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
                    htmlFor="country"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Category
                  </label>
                  <div className="mt-2">
                    <select
                      id="category"
                      name="category"
                      onChange={formik.handleChange}
                      value={formik.values.category}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      {categories.map((category) => (
                        <option key={category._id} value={category._id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Stock
                  </label>
                  <div className="mt-2">
                    <input
                      type="number"
                      name="stock"
                      id="stock"
                      onChange={formik.handleChange}
                      value={formik.values.stock}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Price
                  </label>
                  <div className="mt-2">
                    <input
                      id="price"
                      name="price"
                      type="text"
                      onChange={formik.handleChange}
                      value={formik.values.price}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Rating
                  </label>
                  <div className="mt-2">
                    <input
                      id="rating"
                      name="rating"
                      type="number"
                      onChange={formik.handleChange}
                      value={formik.values.rating}
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

                <div className="sm:col-span-3">
                  <label
                    htmlFor="about"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Description
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="description"
                      name="description"
                      rows={3}
                      onChange={formik.handleChange}
                      value={formik.values.description}
                      placeholder="Text-here"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      defaultValue={""}
                    />
                  </div>
                </div>
                <div className="sm:col-span-2 ">
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Gallery
                  </label>
                  <div className="mt-2">
                    <textarea
                      type="text"
                      name="gallery"
                      id="gallery"
                      onChange={formik.handleChange}
                      value={formik.values.gallery}
                      rows={3}
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

export default EditProducts;
