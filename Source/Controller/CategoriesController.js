import CategoryModel from "../Models/Categories.js";
import ProductModel from "../Models/Products.js";

// get all Categories
const getCategories = async (req, res) => {
  try {
    const category = await CategoryModel.find();
    res.status(200).send({
      message: "Category Page",
      success: true,
      category,
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server error",
      success: false,
    });
  }
};

// Create Category
const createCategory = async (req, res) => {
  try {
    const category = await CategoryModel.findOne({ name: req.body.name });
    if (!category) {
      const cat = await CategoryModel.create(req.body);
      res.status(201).send({
        message: "Category created Successfully",
        cat,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Internal Server error",
      success: false,
    });
  }
};

// Get Category By Id
const getCategoryById = async (req, res) => {
  try {
    const category = await CategoryModel.findOne({
      _id: req.params._id,
    }).populate("products");
    if (category) {
      res.status(200).send({
        message: "Category Find Successfully",
        category,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Internal Server error",
      success: false,
    });
  }
};

// Get Category By Name
const getCategoryByName = async (req, res) => {
  try {
    const category = await CategoryModel.findOne({ name: req.params.name });
    if (category) {
      res.status(200).send({
        message: "Category Found Successfully",
        category,
      });
    } else {
      res.status(404).send({
        message: "Category not found",
        success: false,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Internal Server error",
      success: false,
    });
  }
};

// Update Featured Category
const updateFeaturedState = async (req, res) => {
  try {
    const category = await CategoryModel.findByIdAndUpdate(
      req.params._id,
      { featured: req.body.featured },
      { new: true }
    );

    if (category) {
      res.status(200).send({
        message: "Featured state updated successfully",
        category,
      });
    } else {
      res.status(404).send({
        message: "Category not found",
        success: false,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Internal Server error",
      success: false,
    });
  }
};

// Edit Category
const editCategory = async (req, res) => {
  try {
    const category = await CategoryModel.findOneAndUpdate(
      { _id: req.params._id },
      req.body,
      { new: true }
    );
    if (category) {
      res.status(200).send({
        message: "Category Updated Successfully",
        category,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Internal Server error",
      success: false,
    });
  }
};

// Delete Category
const deletetCategory = async (req, res) => {
  try {
    const products = await ProductModel.find({ category: req.params._id });
    if (products && products.length > 0) {
      return res.status(400).send({
        message: "Cannot delete category , First Delete Products",
        success: false,
      });
    }

    const category = await CategoryModel.findOneAndDelete({
      _id: req.params._id,
    });
    if (category) {
      res.status(200).send({
        message: "Category Deleted Successfully",
        category,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Internal Server error",
      success: false,
    });
  }
};

export default {
  getCategories,
  createCategory,
  getCategoryByName,
  updateFeaturedState,
  editCategory,
  deletetCategory,
  getCategoryById,
};
