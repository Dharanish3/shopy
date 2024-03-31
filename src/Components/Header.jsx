import React, { useEffect, useState } from "react";
import logo from "../assets/shop.svg";
import { useLogout } from "./useLogout";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { useSelector, useDispatch } from "react-redux";
import { Dropdown } from "flowbite-react";
import AxiosService from "../Utils/AxiosService";

function Header() {
  const navigate = useNavigate();
  const logout = useLogout();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState();

  const getData = async () => {
    try {
      let _id = sessionStorage.getItem("userId");
      const res = await AxiosService.get(`/user/${_id}`);
      if (res.status === 200) {
        setUser(res.data.user);
        console.log(res.data.user)
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  const cartCount = useSelector((state) => state.cart.list.length);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };
  const isLogged =
    sessionStorage.getItem("token") && sessionStorage.getItem("role");
  return (
    <>
      <nav className="bg-slate-900 dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src={logo} className="h-8" alt="Flowbite Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
              Shopy
            </span>
          </Link>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <div className="ml-4 flow-root lg:mr-8">
              <Link to="/cart" className="group -m-2 flex items-center p-3">
                <ShoppingBagIcon
                  className="h-6 w-6 flex-shrink-0 text-amber-400 group-hover:text-amber-500"
                  aria-hidden="true"
                />
                <span className="ml-1 text-sm font-medium text-amber-400 group-hover:text-amber-400">
                  {cartCount}
                </span>
              </Link>
            </div>
            {isLogged ? (
              <>
                <img
                  id="avatarButton"
                  onClick={toggleMobileMenu} // Trigger toggle on avatar click
                  className="w-10 h-10 rounded-full cursor-pointer px-1"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="User dropdown"
                />
                {/* Dropdown content */}
                <div className="hidden md:block">
                <Dropdown  label={user?.name} className="px-1 text-white "  >
                  <Dropdown.Item onClick={() => navigate("/profile")}>Profile</Dropdown.Item>
                  <Dropdown.Item onClick={() => navigate("/your-order")}> Your Order</Dropdown.Item>
                 
                  <Dropdown.Item onClick={() => navigate(logout())}>Sign out</Dropdown.Item>
                </Dropdown>
                </div>
                
               
                {/* <button
                  type="button"
                  className="text-white bg-amber-400 hover:bg-amber-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={() => navigate(logout())}
                >
                  Logout
                </button> */}
              </>
            ) : (
              <>
                <button
                  type="button"
                  className="text-white bg-amber-400 hover:bg-amber-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
              </>
            )}

            <button
              onClick={toggleMobileMenu}
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-expanded={isMobileMenuOpen ? "true" : "false"}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className={`${
              isMobileMenuOpen ? "block" : "hidden"
            } md:block md:items-center md:w-auto md:order-1`}
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 ">
              <li>
                <Link
                  to="/"
                  className="py-2 px-3 text-slate-50  rounded md:bg-transparent md:hover:text-amber-400 md:text-white-700 md:p-0 md:dark:text-white-500"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              {/* <li>
                <Link
                  to="/about"
                  className="py-2 px-3 text-slate-50 rounded md:bg-transparent md:hover:text-amber-400 md:text-white-700 md:p-0 md:dark:text-white-500 active:text-amber-400"
                >
                  About
                </Link>
              </li> */}

              <li>
                <Link
                  to="/shops"
                  className="py-2 px-3 text-slate-50 rounded md:bg-transparent md:hover:text-amber-400 md:text-white-700 md:p-0 md:dark:text-white-500 active:text-amber-400"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="py-2 px-3 text-slate-50 rounded md:bg-transparent md:hover:text-amber-400 md:text-white-700 md:p-0 md:dark:text-white-500 active:text-amber-400"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
