import React, { useState, useEffect } from "react";
import AxiosService from "../Utils/AxiosService";

function Categories() {
  const [categories, setCategories] = useState([]);

  const getData = async () => {
    try {
      const res = await AxiosService.get("/category");
      if (res.status === 200) {
        console.log(res.data.category);
        setCategories(res.data.category);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="bg-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto  py-16 sm:py-24 lg:max-w-none lg:py-32">
          <h2 className="text-2xl font-bold text-gray-900">Categories</h2>

          <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
            {categories.map((category, index) =>
              category.featured === true ? (
                <div key={index} className="group relative" >
                  <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                    <img
                      src={category.images}
                      alt={category.name}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  {/* <h3 className="mt-6 text-sm text-gray-500">
        <a href={category.href}>
          <span className="absolute inset-0" />
          {category.name}
        </a>
      </h3> */}
                  <h3 className="text-base font-semibold pb-5 text-gray-900">
                    {category.name}
                  </h3>
                </div>
              ) : null
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Categories;
