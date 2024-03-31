import React, { useContext, useState, useEffect } from "react";
import { UserContextComponent } from "../Context/UserContext";
import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";

import Layout from "./Layout";
import { Link } from "react-router-dom";

function UserProfile() {
  const [openModal, setOpenModal] = useState(false);
  const { user, setUser } = useContext(UserContextComponent);

  const getData = async () => {
    try {
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Layout>
        <div className="h-screen bg-gray-200  dark:bg-gray-800   flex flex-wrap items-center  justify-center  ">
          <div className="container lg:w-2/6 xl:w-2/7 sm:w-full md:w-2/3    bg-white  shadow-lg    transform   duration-200 easy-in-out">
            <div className=" h-32 overflow-hidden">
              <img
                className="w-full"
                src="https://images.unsplash.com/photo-1605379399642-870262d3d051?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
                alt=""
              />
            </div>
            <div className="flex justify-center px-5  -mt-12">
              <img
                className="h-32 w-32 bg-white p-2 rounded-full   "
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
                alt=""
              />
            </div>
            <div className=" ">
              <div className="text-center px-14">
                <h2 className="text-gray-800 text-3xl font-bold">
                  {user?.name}
                </h2>
                <a
                  className="text-gray-400 mt-2 hover:text-blue-500"
                  href="https://www.instagram.com/immohitdhiman/"
                  target="BLANK()"
                >
                  {user?.email}
                </a>
                {/* <div className="mt-4 ">
                  <button
                    onClick={() => setOpenModal(true)}
                    className="inline-flex items-center rounded-lg bg-cyan-700 px-4 py-2 justify-items-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
                  >
                    Edit
                  </button>
                </div> */}
              </div>
              <hr className="mt-6" />
            </div>
          </div>
        </div>

        <Modal
          show={openModal}
          size="md"
          popup
          onClose={() => setOpenModal(false)}
        >
          <Modal.Header />
          <Modal.Body>
            <div className="space-y-6">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                Edit Profile
              </h3>

              <div>
                <div className="mb-2 block">
                  <Label htmlFor="name" value="Name" />
                </div>
                <TextInput id="name" type="text" name="name" required />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="mobile" value="Mobile" />
                </div>
                <TextInput id="mobile" type="text" name="phone" required />
              </div>

              <div className="text-center flex justify-center">
                <Button>Save</Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </Layout>
    </>
  );
}

export default UserProfile;
