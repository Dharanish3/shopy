import mongoose from "./Db.js";

const validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "The field is Required"],
    },
    email: {
      type: String,
      required: [true, "The email field is Required"],
      unique: true,
      validate: [validateEmail, "Please fill a valid email address"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    phone: {
      type: Number,
      required: [true, "Phone field is required"],
    },
    password: {
      type: String,
      required: [true, "Password is Required"],
    },
    status: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      default: "User",
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    orders: [{ type: mongoose.Types.ObjectId, ref: "order" }],
  },
  {
    collection: "user",
  }
);

const schema = mongoose.model("user", userSchema);

export default schema;
