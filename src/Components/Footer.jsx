import React from "react";
import logo from "../assets/shop.svg";
import { Link } from "react-router-dom";

function Footer() {
  const d = new Date();
  let year = d.getFullYear();
  return (
    <>
      <footer className="bg-slate-900 rounded-lg shadow dark:bg-gray-900  ">
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <Link
              to="/"
              className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
            >
              <img src={logo} className="h-8" alt="Flowbite Logo" />
              <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
                Shopy
              </span>
            </Link>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
              <li>
                <Link to="/about" className="hover:underline me-4 md:me-6">
                  About
                </Link>
              </li>
              <li>
                <Link to="/shops" className="hover:underline me-4 md:me-6">
                 Shop
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:underline me-4 md:me-6">
                Contact
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:underline">
                    Login
                </Link>
              </li>
            </ul>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <span className="block text-sm text-gray-500 sm:text-center dark:text-white-400">
            © {year}{" "}
            <Link href="/" className="hover:underline">
              Shopy
            </Link>
            . All Rights Reserved.
          </span>
        </div>
      </footer>
    </>
  );
}

export default Footer;
