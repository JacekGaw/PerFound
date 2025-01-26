import express from "express";
import { getUserTransactions, addNewTransaction } from "../controllers/transactionController.js"

const router = express.Router();

router.get("/transactions/:userId", getUserTransactions);
router.post("/transactions/add/:userId", addNewTransaction);

export default router;
