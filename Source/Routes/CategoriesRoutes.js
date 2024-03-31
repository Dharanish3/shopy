import express from "express";
import CategoryController from "../Controller/CategoriesController.js";
const router = express.Router();

router.get("/", CategoryController.getCategories);
router.post("/add", CategoryController.createCategory);

router.get("/:_id", CategoryController.getCategoryById);

router.patch("/:_id/featured", CategoryController.updateFeaturedState);
router.put("/:_id", CategoryController.editCategory);
router.delete("/:_id", CategoryController.deletetCategory);
router.get("/:name", CategoryController.getCategoryByName);

export default router;
