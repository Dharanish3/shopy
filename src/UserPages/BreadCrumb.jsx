import React from "react";

function BreadCrumb() {
  return (
    <>
      <div  >
        <div className=" w-ful relative mx-auto  overflow-hidden rounded-t-xl bg-emerald-400/60 py-32 text-center shadow-xl shadow-gray-300">
          <h1 className="mt-2 px-8 text-3xl font-bold text-white md:text-5xl">
            Best Shopy World
          </h1>
          {/* <p className="mt-6 text-lg text-white">1
            Get an appointment with our experienced accountants
          </p> */}
          <img
            className="absolute top-0 left-0 -z-10 h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1504672281656-e4981d70414b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            alt=""
          />
        </div>

        
      </div>
    
    </>
  );
}

export default BreadCrumb;
