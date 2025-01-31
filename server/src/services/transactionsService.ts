import { eq, and } from "drizzle-orm";
import db from "../database/db.js";
import { transactions, categories, accounts } from "../database/schemas.js";

export type NewTransactionType = typeof transactions.$inferInsert;


export const getTransactionsFromDB = async (userId: number, accountName?: string) => {
  try {
    const baseQuery = db.select({
      id: transactions.id,
      userId: transactions.userId,
      amount: transactions.amount,
      categoryId: transactions.categoryId,
      type: transactions.type,
      description: transactions.description,
      date: transactions.date,
      createdAt: transactions.createdAt,
      categoryName: categories.name,
      accountName: accounts.name,
    })
    .from(transactions)
    .leftJoin(categories, eq(transactions.categoryId, categories.id))
    .leftJoin(accounts, eq(transactions.accountId, accounts.id))
    .where(
      and(
        eq(transactions.userId, userId),
        accountName ? eq(accounts.name, accountName) : undefined
      )
    );

    const transactionsArr = await baseQuery;
    return transactionsArr;
  } catch (err) {
    console.error("Error getting transactions by user id from db: ", err);
    throw err;
  }
};

export const addNewTransactionToDb = async (data: NewTransactionType) => {
  try {
    const transaction = db.insert(transactions).values(data).returning();
    return transaction;
  } catch (err) {
    console.error("Error adding transaction to db: ", err);
    throw err;
  }
};



