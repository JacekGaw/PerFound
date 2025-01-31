import { RequestHandler } from "express";
import { getTransactionsFromDB, addNewTransactionToDb, NewTransactionType } from "../services/transactionsService.js"
import { CustomRequest } from "../middleware/protectedRoute.js";



export const getUserTransactions: RequestHandler = async (req, res) => {
  try {
    const userTransactions = await getTransactionsFromDB(parseInt(req.params.userId));
    console.log("Getting user transactions", userTransactions);
    res.status(200).json({
      message: "Getting user transactions",
      transactions: userTransactions,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error",
      error: (err as Error).message || "Unknown error",
    });
  }
};

export const getAccountTransactions: RequestHandler = async (req: CustomRequest, res) => {
  try {
    const accountName = req.params.accountName;
    const userId = parseInt(req.user!.id)
    const accountTransactions = await getTransactionsFromDB(userId, accountName);
    console.log("Getting account transactions", accountTransactions);
    res.status(200).json({
      message: "Getting account transactions",
      transactions: accountTransactions,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error",
      error: (err as Error).message || "Unknown error",
    });
  }
};

export const addNewTransaction: RequestHandler = async (req, res) => {
  try {
    const data: NewTransactionType = req.body;
    data.userId = parseInt(req.params.userId)
    const userTransactions = await addNewTransactionToDb(data);
    console.log("Adding new transaction", userTransactions);
    res.status(200).json({
      message: "Added new transaction",
      transactions: userTransactions,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error",
      error: (err as Error).message || "Unknown error",
    });
  }
};










