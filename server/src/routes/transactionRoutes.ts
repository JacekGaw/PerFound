import express from "express";
import { getUserTransactions } from "../controllers/transactionController.js"

const router = express.Router();

router.get("/transactions/:userId", getUserTransactions);

export default router;
