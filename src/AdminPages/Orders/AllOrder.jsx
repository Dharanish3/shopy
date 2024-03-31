import React, { useState, useEffect } from "react";
import AxiosService from "../../Utils/AxiosService";
import Topbar from "../Topbar";
import Sidebar from "../Sidebar";
import OrderModal from "./OrderModal";
import { Badge } from "flowbite-react";

function AllOrder() {
  const [orders, setOrders] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [orderHistory, setOrderHistory] = useState([]);

//   const handleShowModal = (orderId) => {
//     setOrderHistory(orderId);
//     setShowModal(true);
//   };
  const handleShowModal = async (orderId) => {
    try {
      const res = await AxiosService.get(`/order/${orderId}`);
      if (res.status === 200) {
        setOrderHistory(res.data.order);
        setShowModal(true);
        console.log(res.data.order)
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  const getData = async () => {
    try {
      const res = await AxiosService.get("/order");
      if (res.status === 200) {
        setOrders(res.data.order);
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
      <Topbar />
      <Sidebar>
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-2 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              All Order
            </h1>
            <br />
          </div>
        </header>

        <div className=" border relative overflow-x-auto p-2 shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  S.No
                </th>
                <th scope="col" className="px-6 py-3">
                  Customer Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Customer Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Order Id
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Quantity
                </th>
                <th scope="col" className="px-6 py-3">
                  Total Price
                </th>

                <th scope="col" className="px-11 py-3 ">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order, index) => (
                  <>
                    <tr
                      className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                      key={index}
                    >
                      <td
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {index + 1}
                      </td>
                      <td className="px-6 py-4">{order.userId.name}</td>
                      <td className="px-6 py-4">{order.userId.email}</td>
                      <td className="px-6 py-4">{order._id}</td>

                      {order.status === "Pending" && (
                        <>
                          {" "}
                          <td className="px-6 py-4 text-red-700">
                          <Badge color="failure">{order.status}</Badge>
                          </td>
                        </>
                      )}
                      {order.status === "Processed" && (
                        <>
                          {" "}
                          <td className="px-6 py-4 text-lime-500">
                          <Badge color="success">{order.status}</Badge>
                          </td>
                        </>
                      )}

                      <td className="px-6 py-4">
                        {order.orderItem.reduce(
                          (total, item) => total + item.quantity,
                          0
                        )}
                      </td>

                      <td className="px-6 py-4">₹{order.totalPrice}</td>

                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleShowModal(order._id)}
                          type="button"
                          className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                        >
                          View 
                        </button>{" "}
                      </td>
                    </tr>

                    <OrderModal
                      showModal={showModal}
                      setShowModal={setShowModal}
                      orderHistory={orderHistory}
                      setOrderHistory={setOrderHistory}
                    />
                  </>
                ))
              ) : (
                <>
                  <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <td
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      No data Found
                    </td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
      </Sidebar>
    </>
  );
}

export default AllOrder;
