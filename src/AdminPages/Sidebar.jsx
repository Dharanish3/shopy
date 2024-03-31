import React, { useState ,useEffect} from "react";
import { HomeIcon, ShoppingCartIcon ,ListBulletIcon} from "@heroicons/react/24/outline";
import { FaUsers } from "react-icons/fa";
import { GiReceiveMoney } from "react-icons/gi";
import { useLogout } from "../Components/useLogout";
import { Link, NavLink, useNavigate ,  useLocation } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

function Sidebar({ children }) {
  const location = useLocation;
  const logout = useLogout()

  const navigate = useNavigate()
  return (
    <>
      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-slate-950 border-r border-gray-200 sm:translate-x-0 bg-gray-800 border-gray-700"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-slate-950 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                to="/admin/dashboard"
                className="flex items-center p-2 text-gray-900 rounded-lg text-slate-300 hover:bg-gray-900 dark:hover:bg-gray-700 group"
              >
                <HomeIcon className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-500 dark:group-hover:text-white" />

                <span className="ms-3">Dashboard</span>
              </Link>
            </li>

            <li>
              <Link
                to="/admin/all-categories"
                className="flex items-center p-2 text-gray-900 rounded-lg text-slate-300 hover:bg-gray-900 dark:hover:bg-gray-700 group"
              >
                <ListBulletIcon className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-500 dark:group-hover:text-white" />

                <span className="ms-3">Categories</span>
              </Link>
            </li>

            <li>
              <Link
                to="/admin/all-products"
                className="flex items-center p-2 text-gray-900 rounded-lg text-slate-300 hover:bg-gray-900 dark:hover:bg-gray-700 group"
              >
                <ShoppingCartIcon className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-500 dark:group-hover:text-white" />

                <span className="ms-3">Products</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/order"
                className="flex items-center p-2 text-gray-900 rounded-lg text-slate-300 hover:bg-gray-900 dark:hover:bg-gray-700 group"
              >
                <GiReceiveMoney className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-500 dark:group-hover:text-white" />

                <span className="ms-3">Orders</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/user"
                className="flex items-center p-2 text-gray-900 rounded-lg text-slate-300 hover:bg-gray-900 dark:hover:bg-gray-700 group"
              >
                <FaUsers className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-500 dark:group-hover:text-white" />

                <span className="ms-3">Customers</span>
              </Link>
            </li>
         
            <li>
              <button
                onClick={() => (logout())}
                className="flex items-center p-2 text-gray-900 rounded-lg text-slate-300 hover:bg-gray-900 dark:hover:bg-gray-700 group"
              >
                <FiLogOut className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-500 dark:group-hover:text-white" />

                <span className="ms-3">Logout</span>
              </button>
            </li>
         
           
          </ul>
        </div>
      </aside>
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          {children}
        </div>
      </div>
    </>
  );
}

export default Sidebar;
