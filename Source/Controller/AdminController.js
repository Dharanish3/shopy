import AdminModel from "../Models/Admin.js";
import Authnticate from "../Auth/Authentication.js";

const getUser = async (req, res) => {
  try {
    const admin = await AdminModel.find();
    res.status(200).send({
      message: "Admin find successfully",
      admin,
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      Sucess: false,
    });
  }
};

const getUserByID = async (req, res) => {
  try {
    const admin = await AdminModel.findOne({ _id: req.params._id });
    if (admin) {
      res.status(200).send({
        message: "Admin find Successfully",
        admin,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      Sucess: false,
    });
  }
};

const createUser = async (req, res) => {
  try {
    const { email, name, phone } = req.body;
    const admin = await AdminModel.findOne({ email: req.body.email });
    if (!admin) {
      req.body.password = await Authnticate.createHash(req.body.password);
      const createUser = await AdminModel.create(req.body);

      res.status(200).send({
        message: " SignUp Successfully",
      });
    } else {
      res.status(500).send({
        message: "Admin User Already Exist",
        admin,
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
    const admin = await AdminModel.findOne({ email: email });
    if (admin) {
      if (await Authnticate.getHash(password, admin.password)) {
        const token = await Authnticate.createToken({
          name: admin.name,
          email: admin.email,
          role: admin.role,
          _id: admin._id,
        });
        res.status(200).send({
          message: "Login Successful",
          token,
          role: admin.role,
          email: admin.email,
          _id: admin._id,
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

const deleteUser = async (req, res) => {
  try {
    const admin = await AdminModel.findOneAndDelete({ _id: req.params._id });
    if (admin) {
      res.status(200).send({
        message: " Deleted Successfully",
        admin,
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
  getUserByID,
  deleteUser,
};
