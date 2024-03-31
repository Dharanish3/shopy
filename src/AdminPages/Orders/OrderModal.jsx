import React, { useState, useEffect } from "react";
import { Button, Modal } from "flowbite-react";

import { Card } from "flowbite-react";

function OrderModal({ showModal, setShowModal, orderHistory }) {
  return (
    <>
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <Modal.Header>Order Details</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <h2 className="text-base leading-relaxed ">
              Name : {orderHistory.userId?.name}
            </h2>
            <h6>
              <span>Order Date : </span>
              {new Date(orderHistory.orderDate).toDateString()}
            </h6>
            {orderHistory.orderItem &&
              orderHistory.orderItem.map((order, index) => (
                <Card
                  key={index}
                  className="max-w-sm"
                  imgSrc={order.product?.images}
                  horizontal
                >
                  <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                     {order.product?.name}
                  </h5>
                  <span>Quantity: {order.quantity}</span>
                  <h6>
                    Price :{" "}
                    {+order?.product?.price.replace(/,/g, "") * order?.quantity}
                  </h6>
                </Card>
              ))}
          </div>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button onClick={() => setShowModal(false)}>I accept</Button>
          <Button color="gray" onClick={() => setShowModal(false)}>
            Decline
          </Button>
        </Modal.Footer> */}
      </Modal>
    </>
  );
}

export default OrderModal;
