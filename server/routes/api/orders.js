import express from "express";
import {
  addOrdersItems,
  getOrderById,
  updateOrderToPaid,
} from "../../controllers/orderController.js";
import { protect } from "../../middleware/authMiddleware.js";
const router = express.Router();

router.route("/").post(protect, addOrdersItems);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").put(protect, updateOrderToPaid);

export default router;
