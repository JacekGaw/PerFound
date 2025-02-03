import { RequestHandler } from "express";
import { addCategoriesToDb, getUserCategoriesFromDb, NewCategoryType } from "../services/categoryService.js";
import { CustomRequest } from "../middleware/protectedRoute.js";

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

export const addCategories: RequestHandler = async (req: CustomRequest, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "No decoded user object in request",
      });
    }
    const userId = parseInt(req.user.id);
    const data: string[] = req.body;
    const dataToAdd = data.map(name => ({
      name,
      userId,
    }));
    console.log(dataToAdd);
    const newCategories = await addCategoriesToDb(dataToAdd);
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









