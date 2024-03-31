import React, { useContext } from "react";
import { UserContextComponent } from "../Context/UserContext";
import Layout from "./Layout";
import { Card } from "flowbite-react";

function YourOrder() {
  const { user, setUser } = useContext(UserContextComponent);

  return (
    <>
      <Layout>
        <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
          <div
            className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
            aria-hidden="true"
          ></div>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Your Orders
            </h2>
          </div>

          {user?.orders?.map((order) => (
            <>
              {order.orderItem.map((item) => (
                <div className=" m-8 flex justify-center overflow-x-auto">
                  <Card
                    className="max-w-sm "
                    imgSrc={item.product?.images}
                    horizontal
                  >
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {item.product?.name}
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                      Quantity: {item?.quantity}
                    </p>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                      Price:{" "}
                      {+item.product?.price.replace(/,/g, "") * item?.quantity}
                    </p>
                  </Card>
                </div>
              ))}
            </>
          ))}
        </div>
      </Layout>
    </>
  );
}

export default YourOrder;
