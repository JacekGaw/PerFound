import express from "express";
import { addCategories, getUserCategories } from "../controllers/categoryController.js";
import { protectedRoute } from "../middleware/protectedRoute.js";

const router = express.Router();

router.get("/categories/:userId", getUserCategories);
router.post("/categories", protectedRoute, addCategories);

export default router;
