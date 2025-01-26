import express from "express";
import { addCategories, getUserCategories } from "../controllers/categoryController.js";

const router = express.Router();

router.get("/categories/:userId", getUserCategories);
router.post("/categories/add/:userId", addCategories);

export default router;
