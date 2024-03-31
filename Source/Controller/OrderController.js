import OrderModel from "../Models/Order.js";
import ProductModel from "../Models/Products.js";
import UserModel from "../Models/User.js";
import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();

// Get All Order
const getOrder = async (req, res) => {
  try {
    const order = await OrderModel.find().populate("userId");
    res.status(200).send({
      message: "Order find Successfully",
      order,
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      Sucess: false,
    });
  }
};

// Create Order
const newOrder = async (req, res) => {
  try {
    const {orderItem,userId,totalPrice} = req.body
    const stripe = new Stripe(process.env.SECRET_KEY);

    // Stripe checkout session
    const lineItems = orderItem.map((item) => ({
      price_data: {
        currency: "usd",

        product_data: {
          name: item.name,
         images: [item.images],
        },
        unit_amount: item.price ,
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/checkout-success`,
      cancel_url: `${process.env.CLIENT_URL}/cart`,

      line_items: lineItems,
    });

   
    // if (isNaN(totalPrice)) {
    //   return res.status(400).send({ message: "Invalid totalPrice" });
    // }

    

    const existingUser = await UserModel.findById({ _id: userId });
    if (!existingUser) {
      return res.status(404).send({ message: "User Not Find" });
    }
    const order =  new OrderModel({
      orderItem,
      totalPrice,
      userId,
      sessionId: session.id,
    });

    await order.save();
    existingUser.orders.push(order);
    await existingUser.save();
    res
      .status(201)
      .send({ message: "Orderd Successfully", url: session.url });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Internal Server Error",
      Sucess: false,
    });
  }
};

// Get Order By Id
const getOrderById = async (req, res) => {
  try {
    const order = await OrderModel.findById({ _id: req.params._id })
      .populate({
        path: "userId",
        select: "name email",
      })
      .populate({
        path: "orderItem.product",
        select: "name images price rating category",
      });
    if (!order) {
      return res.status(400).send({ message: "Order Not Find" });
    }
    res.status(200).send({
      message: "Order find successfully",
      order,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Internal Server Error",
      Sucess: false,
    });
  }
};

// Delete Order
const deleteOrder = async (req, res) => {
  try {
    const order = await OrderModel.findById({ _id: req.params._id });
    const existingUser = await UserModel.findById({ _id: req.params._id });

    if (order && order.status === "canceled") {
      await OrderModel.findByIdAndDelete({ _id: req.params._id });
      existingUser.orders.pop(order);
      await existingUser.save();
      res.status(200).send({
        message: "Order successfully deleted",
        Success: true,
      });
    } else {
      res.status(400).send({
        message: "Order not found or status is not canceled",
        Success: false,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Internal Server Error",
      Success: false,
    });
  }
};

export default {
  getOrder,
  newOrder,
  getOrderById,
  deleteOrder,
};
