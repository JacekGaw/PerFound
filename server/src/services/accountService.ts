import { eq } from "drizzle-orm";
import db from "../database/db.js";
import { accounts } from "../database/schemas.js";

export type NewAccountType = typeof accounts.$inferInsert;

export const getAccountsByUserId = async (userId: number) => {
  try {
    const accountsArr = db.select()
      .from(accounts)
      .where(eq(accounts.userId, userId));
    return accountsArr;
  } catch (err) {
    console.error("Error getting accounts by user id from db: ", err);
    throw err;
  }
};


export const createUserAccountInDb = async (data: NewAccountType) => {
  try {
    const accountsArr = db.insert(accounts).values(data).returning();
    return accountsArr;
  } catch (err) {
    console.error("Error creating user account in db: ", err);
    throw err;
  }
};


