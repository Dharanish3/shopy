import React from "react";

function Newsletter() {
  return (
    <div className="mx-auto my-10 max-w-screen-xl rounded-3xl  px-4 py-20">
      <h2 className="text-center text-4xl font-bold sm:text-5xl">
        Subscribe Our NewsLetter
      </h2>
      <p className="mt-8 text-center text-3xl font-light">Never Miss Any Updates</p>
      <div className="mx-auto mt-8 flex max-w-2xl flex-col border-gray-600 bg-white sm:flex-row sm:rounded-full sm:border">
        <input
          className="m-2 h-12 rounded-full px-4 text-gray-500 ring ring-slate-900 sm:w-full sm:ring-0 focus:outline-none focus:ring"
          placeholder="Enter your email"
          type="email"
          name="email"
        />
        <button className="shrink-0 m-2 rounded-full bg-slate-900 px-8 py-3 font-medium text-white focus:bg-amber-400 focus:outline-none hover:bg-amber-400">
          Send
        </button>
      </div>
    </div>
  );
}

export default Newsletter;
