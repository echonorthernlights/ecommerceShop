import express from "express";
import { addOrdersItems } from "../../controllers/orderController.js";
import { protect } from "../../middleware/authMiddleware.js";
const router = express.Router();

router.route("/").post(protect, addOrdersItems);

export default router;
