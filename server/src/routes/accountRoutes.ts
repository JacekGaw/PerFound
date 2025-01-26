import express from "express";
import { getUserAccounts, addUserAccount } from "../controllers/accountController.js";

const router = express.Router();

router.get("/accounts/:userId", getUserAccounts);
router.post("/accounts/add/:userId", addUserAccount);

export default router;
