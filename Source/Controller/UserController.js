import UserModel from "../Models/User.js";
import Authnticate from "../Auth/Authentication.js";
import Emailservice from "../Auth/EmailService.js";

const getUser = async (req, res) => {
  try {
    const user = await UserModel.find({}, { password: 0 });
    res.status(200).send({
      message: "User find Successfully",
      user,
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      Sucess: false,
    });
  }
};

const getUserID = async (req, res) => {
  try {
    // At this point, req.user should be defined
    const user = await UserModel.findById(req.params._id).populate({
      path: "orders",
      populate: {
        path: "orderItem.product",
        select: "name images price rating category", // Add more fields as needed
      },
    });
    if (user) {
      res.status(200).send({
        message: "User found successfully",
        user,
      });
    } else {
      res.status(404).send({
        message: "User not found",
        success: false,
      });
    }
  } catch (error) {
    console.error("Error retrieving user:", error);
    res.status(500).send({
      message: "Internal Server Error",
      success: false,
    });
  }
};



const createUser = async (req, res) => {
  try {
    const { email, name, phone } = req.body;
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      req.body.password = await Authnticate.createHash(req.body.password);
      const createUser = await UserModel.create(req.body);
      await Emailservice.sendWelcomeEmail(email, name);
      await Emailservice.sendAdminEmail(email, name);
      res.status(200).send({
        message: " SignUp Successfully",
      });
    } else {
      res.status(500).send({
        message: "User Already Exist",
        user,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      Sucess: false,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email: email });
    if (user) {
      if (await Authnticate.getHash(password, user.password)) {
        const token = await Authnticate.createToken({
          name: user.name,
          email: user.email,
          role: user.role,
          _id: user._id,
        });
        res.status(200).send({
          message: "Login Successful",
          token,
          role: user.role,
          email: user.email,
          _id: user._id,
        });
      } else {
        res.status(500).send({
          message: "Incorrect Password",
        });
      }
    } else {
      res.status(500).send({
        message: "User Not Find , Kindly Sign up",
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};


// Edit User
const editUserID = async (req, res) => {
  try {
    const user = await UserModel.findOneAndUpdate(
      { _id: req.params._id },
      req.body,
      { new: true }
    );
    if (user) {
      res.status(200).send({
        message: "Updated Successfully",
        user,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      Sucess: false,
    });
  }
};


// Delete User
const deleteUser = async (req, res) => {
  try {
    const user = await UserModel.findOneAndDelete({ _id: req.params._id });
    if (user) {
      res.status(200).send({
        message: " Deleted Successfully",
        user,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      Sucess: false,
    });
  }
};

export default {
  getUser,
  createUser,
  login,
  editUserID,
  deleteUser,
  getUserID,
};
