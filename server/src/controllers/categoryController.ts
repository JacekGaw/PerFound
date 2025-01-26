import { RequestHandler } from "express";
import { addCategoriesToDb, getUserCategoriesFromDb, NewCategoryType } from "../services/categoryService.js";


export const getUserCategories: RequestHandler = async (req, res) => {
  try {
    const userCategories = await getUserCategoriesFromDb(parseInt(req.params.userId));
    console.log("Getting user accounts", userCategories);
    res.status(200).json({
      message: "Getting user categories",
      accounts: userCategories,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error",
      error: (err as Error).message || "Unknown error",
    });
  }
};

export const addCategories: RequestHandler = async (req, res) => {
  try {
    const data: NewCategoryType[] = req.body;
    const newCategories = await addCategoriesToDb(data);
    console.log("Creating categories", newCategories);
    res.status(200).json({
      message: "Created categories",
      accounts: newCategories,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error",
      error: (err as Error).message || "Unknown error",
    });
  }
};









