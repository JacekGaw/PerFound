import { eq } from "drizzle-orm";
import db from "../database/db.js";
import { categories } from "../database/schemas.js";

export type NewCategoryType = typeof categories.$inferInsert;

export const getUserCategoriesFromDb = async (userId: number) => {
  try {
    const categoriesArr = db.select()
      .from(categories)
      .where(eq(categories.userId, userId));
    return categoriesArr;
  } catch (err) {
    console.error("Error getting categories by user id from db: ", err);
    throw err;
  }
};


export const addCategoriesToDb = async (data: NewCategoryType[]) => {
  try {
    const categoriesArr = db.insert(categories).values(data).returning();
    return categoriesArr;
  } catch (err) {
    console.error("Error adding categories to db: ", err);
    throw err;
  }
};


