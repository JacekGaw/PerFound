import express from "express";
import { getUserTransactions, addNewTransaction, getAccountTransactions } from "../controllers/transactionController.js";
import { protectedRoute } from "../middleware/protectedRoute.js";

const router = express.Router();

// router.get("/transactions/:userId", getUserTransactions);
router.get("/transactions/:accountName", protectedRoute, getAccountTransactions);
router.post("/transactions/add/:userId", addNewTransaction);

export default router;
