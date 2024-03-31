import ProductModel from "../Models/Products.js";
import CategoryModel from "../Models/Categories.js";
import uploadToCloudinary from "../Utils/config.js";

const getProduct = async (req, res) => {
  try {
    const product = await ProductModel.find().populate("category");
    res.status(200).send({
      message: "Product Find Successfully",
      product,
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      success: false,
    });
  }
};

const getProductPage = async (req, res) => {
  const { page } = req.query;
  try {
    const Limit = 3;
    const startIndex = (Number(page) - 1) * Limit;
    const totalDocument = await ProductModel.countDocuments({});

    const product = await ProductModel.find()
      .populate("category")
      .sort({ _id: -1 })
      .limit(Limit)
      .skip(startIndex);
    res.status(200).send({
      message: "Product Find Successfully",
      product,
      currentPage: Number(page),
      numberOfPages: Math.ceil(totalDocument / Limit),
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Internal Server Error",
      success: false,
    });
  }
};

const createProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      stock,
      rating,
      description,
      images,
      gallery,
      category,
    } = req.body;

    const cat = await CategoryModel.findById(category);
    if (!cat) {
      res.status(500).send({ message: "Category not Exist" });
    }

    // const result = await uploadToCloudinary(req.file);
    const product = await ProductModel.findOne({ name: req.body.name });
    if (!product) {
      const prod = new ProductModel({
        name,
        price,
        stock,
        rating,
        description,
        images,
        gallery,
        category,
      });
      cat.products.push(prod);

      // Save the category and product
      await cat.save();
      await prod.save();
      res.status(201).send({
        message: "New Product created Successfully",
        prod,
      });
    }
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).send({
      message: "Internal Server error",
      success: false,
    });
  }
};

// Get Category By Id
const getProductById = async (req, res) => {
  try {
    const product = await ProductModel.findOne({
      _id: req.params._id,
    }).populate("category");

    if (product) {
      res.status(200).send({
        message: "Product found successfully",
        product,
      });
    } else {
      res.status(404).send({
        message: "Product not found",
        success: false,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Internal Server Error",
      success: false,
      error: error.message,
    });
  }
};

// Get Category By Name
const getProductByName = async (req, res) => {
  try {
    const product = await ProductModel.findOne({
      name: req.params.name,
    }).populate("category");
    if (product) {
      res.status(200).send({
        message: "Product Find Successfully",
        product,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Internal Server error",
      success: false,
    });
  }
};

// Edit Product
const editProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      stock,
      rating,
      description,
      images,
      gallery,
      category,
    } = req.body;

    // Check if the category exists
    const cat = await CategoryModel.findById(category);
    /*if (!cat) {
      res.status(400).send({ message: "Category not Exist" });
    }*/

 
    // const imageUrl = req.file.path;

    const product = await ProductModel.findOneAndUpdate(
      { _id: req.params._id },
      {
        name,
        price,
        stock,
        rating,
        description,
        images,
        gallery,
        category,
      },
      { new: true }
    );

    if (product) {
      return res.status(200).send({
        message: "Product Updated Successfully",
        product,
      });
    } else {
      // Handle the case where the product with the given ID is not found
      return res.status(404).send({ message: "Product not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      message: "Internal Server error",
      success: false,
    });
  }
};

// Delete product
const deletetProduct = async (req, res) => {
  try {
    const product = await ProductModel.findOneAndDelete({
      _id: req.params._id,
    });
    const categoryId = product.category;
    const category = await CategoryModel.findById(categoryId);
    category.products.pull(product);

    // Save the category after removing the product
    await category.save();

    if (product) {
      res.status(200).send({
        message: "Product Deleted Successfully",
        product,
      });
    } else {
      return res.status(404).send({
        message: "Product not found",
        success: false,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Internal Server error",
      success: false,
    });
  }
};

export default {
  getProduct,
  createProduct,
  editProduct,
  deletetProduct,
  getProductById,
  getProductByName,
  getProductPage,
};
