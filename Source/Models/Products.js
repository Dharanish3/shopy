import mongoose from "./Db.js";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "The field is Required"],
    },
    price: {
      type: String,
      default: 0,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    rating: {
      type: Number,
      required: [true, "Rating Is Required"],
    },
    description: {
      type: String,
      required: [true, "The field is Required"],
    },
    images:String,

    gallery: [
      {
        type: String,
      },
    ],
    status: {
      type: Boolean,
      default: true,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "categories",
   
    },
    isFeatured: {
      type: Boolean,
      default: true,
    },
  
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    collection: "product",
  }
);

const schema = mongoose.model("product", productSchema);

export default schema;
