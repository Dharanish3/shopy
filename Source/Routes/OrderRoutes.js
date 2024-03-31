import express from "express";
import OrderController from "../Controller/OrderController.js";
const router = express.Router();

router.get("/", OrderController.getOrder);

router.post("/create-checkout-session", OrderController.newOrder);

router.get("/:_id", OrderController.getOrderById);
router.delete("/:_id", OrderController.deleteOrder);

export default router;
