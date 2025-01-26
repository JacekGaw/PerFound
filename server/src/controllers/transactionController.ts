import { RequestHandler } from "express";
import { getTransactionsByUserId, addNewTransactionToDb, NewTransactionType } from "../services/transactionsService.js"




export const getUserTransactions: RequestHandler = async (req, res) => {
  try {
    const userTransactions = await getTransactionsByUserId(parseInt(req.params.userId));
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










