import mongoose from "./Db.js";

const categoriesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "The field is Required"],
    },
    images: String,
    featured: {
      type: Boolean,
      default: true,
    },
    products: [
      {
        type: mongoose.Types.ObjectId,
        ref: "product",
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    collection: "categories",
  }
);

const schema = mongoose.model("categories", categoriesSchema);

export default schema;
