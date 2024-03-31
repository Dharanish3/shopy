import React, { useState ,useEffect} from "react";
import logo from "../assets/shop.svg";
import { GlobeAltIcon } from "@heroicons/react/24/outline";
import { useNavigate, Link, NavLink } from "react-router-dom";
import { Avatar, Dropdown } from "flowbite-react";
import AxiosService from "../Utils/AxiosService";
import { useLogout } from "../Components/useLogout";

function Topbar() {
  const navigate = useNavigate();
  const logout = useLogout()
  const [admin, setAdmin] = useState()
  const getData = async () => {
    try {
      let _id = sessionStorage.getItem("userId");
      const res = await AxiosService.get(`/admin/${_id}`);
      if (res.status === 200) {
        setAdmin(res.data.admin);
        console.log(res.data.admin)
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-slate-950 border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clip-rule="evenodd"
                    fill-rule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
              <Link to="/admin/dashboard" className="flex ms-2 md:me-24">
                <img src={logo} className="h-8 me-3" alt="FlowBite Logo" />
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap text-white">
                  Shopy
                </span>
              </Link>
            </div>
            <div className="flex items-center">
              <div className="flex items-center ms-3">
                <NavLink
                  to="/"
                  className="h-6 w-6 mx-6 text-gray-500"
                  target="blank"
                >
                  <GlobeAltIcon />
                </NavLink>
                <Dropdown
                  label={
                    <Avatar
                      alt="User settings"
                      img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                      rounded
                    />
                  }
                  arrowIcon={false}
                  inline
                >
                  <Dropdown.Header>
                    <span className="block text-sm">  {admin?.name}</span>
                    <span className="block truncate text-sm font-medium">
                    {admin?.email}
                    </span>
                  </Dropdown.Header>
                  <Dropdown.Item>Admin Profile</Dropdown.Item>
                  <Dropdown.Item>Settings</Dropdown.Item>
                 
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={() => (logout())}>Sign out</Dropdown.Item>
                </Dropdown>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Topbar;
