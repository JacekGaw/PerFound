import { RequestHandler } from "express";
import {
  getAccountsByUserId,
  createUserAccountInDb,
  NewAccountType,
} from "../services/accountService.js";
import { CustomRequest } from "../middleware/protectedRoute.js";

export const getUserAccounts: RequestHandler = async (req, res) => {
  try {
    const userAccounts = await getAccountsByUserId(parseInt(req.params.userId));
    console.log("Getting user accounts", userAccounts);
    res.status(200).json({
      message: "Getting user accounts",
      accounts: userAccounts,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error",
      error: (err as Error).message || "Unknown error",
    });
  }
};

export const addUserAccount: RequestHandler = async (
  req: CustomRequest,
  res
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "No decoded user object in request",
      });
    }
    const userId = req.user.id;
    const data: NewAccountType = req.body;
    data.userId = parseInt(userId);
    const userNewAccount = await createUserAccountInDb(data);
    console.log("Creating user account", userNewAccount);
    return res.status(200).json({
      message: "Creating user new account",
      accounts: userNewAccount,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error",
      error: (err as Error).message || "Unknown error",
    });
  }
};
