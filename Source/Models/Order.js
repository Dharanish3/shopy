import mongoose from "./Db.js";

const orderSchema = new mongoose.Schema(
  {
    orderItem: [
      {
        product: {
          type: mongoose.Types.ObjectId,
          ref: "product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          default: 1, 
        },
      },
    ],
    orderDate:{
      type: Date,
      default: Date.now()
    },
    status: {
      type: String,
      required: true,
      default: "Pending",
      enum: ["Pending", "Processed", "Shipped", "Delivered", "Cancelled",'ordered'] // Enum set for possible statuses
    },
    totalPrice: {
      type: Number,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    collection: "order",
  }
);

const schema = mongoose.model("order", orderSchema);

export default schema;
