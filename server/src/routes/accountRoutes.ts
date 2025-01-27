import express from "express";
import { getUserAccounts, addUserAccount } from "../controllers/accountController.js";
import { protectedRoute } from "../middleware/protectedRoute.js";

const router = express.Router();

router.get("/accounts/:userId", getUserAccounts);
router.post("/accounts",protectedRoute, addUserAccount);

export default router;
