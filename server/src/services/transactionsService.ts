import { eq } from "drizzle-orm";
import db from "../database/db.js";
import { transactions, categories } from "../database/schemas.js";



export const getTransactionsByUserId = async (userId: number) => {
  try {
    const transactionsArr = db.select({
        id: transactions.id,
        userId: transactions.userId,
        amount: transactions.amount,
        categoryId: transactions.categoryId,
        type: transactions.type,
        description: transactions.description,
        date: transactions.date,
        createdAt: transactions.createdAt,
        categoryName: categories.name, // Add category name
      })
      .from(transactions)
      .leftJoin(categories, eq(transactions.categoryId, categories.id)) // Perform a left join with categories
      .where(eq(transactions.userId, userId)); // Filter by userId
    return transactionsArr;
  } catch (err) {
    console.error("Error getting transactions by user id from db: ", err);
    throw err;
  }
};



