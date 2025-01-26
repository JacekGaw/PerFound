import { RequestHandler } from "express";
import { getAccountsByUserId, createUserAccountInDb, NewAccountType } from "../services/accountService.js";

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

export const addUserAccount: RequestHandler = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const data: NewAccountType = req.body;
    data.userId = userId;
    const userNewAccount = await createUserAccountInDb(data);
    console.log("Creating user account", userNewAccount);
    res.status(200).json({
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









