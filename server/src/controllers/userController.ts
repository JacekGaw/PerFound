import { RequestHandler } from "express";
import {
  getUsersFromDB,
  createUserInDB,
  deleteUserFromDb,
  updateUserInDB,
  getUserInfoFromDB,
  changeUserPasswordInDB,
} from "../services/userServices.js";

export const getUsers: RequestHandler = async (req, res) => {
  try {
    const usersList = await getUsersFromDB();
    console.log("Getting all users ", usersList);
    res.status(200).json({
      message: "Getting all users",
      users: usersList,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error",
      error: (err as Error).message || "Unknown error",
    });
  }
};

export const getUser: RequestHandler = async (req, res) => {
  try {
    const singleUser = await getUsersFromDB(parseInt(req.params.id));
    console.log("Getting single user ", singleUser);
    res.status(200).json({
      message: "Getting single user",
      user: singleUser,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error",
      error: (err as Error).message || "Unknown error",
    });
  }
};

export const getUserInfo: RequestHandler = async (req, res) => {
  try {
    const singleUser = await getUserInfoFromDB(parseInt(req.params.id));
    console.log("Getting user detailed info", singleUser);
    res.status(200).json({
      message: "Getting user detailed info",
      user: singleUser,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error",
      error: (err as Error).message || "Unknown error",
    });
  }
};


export const createUser: RequestHandler = async (req, res) => {
  try {
    const { email, password, role, name, surname } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Did not provide all requested user informations",
      });
    }
    const newUser = await createUserInDB(
      email,
      password,
      role as
        | "Developer"
        | "Tester"
        | "Product Owner"
        | "Project Manager"
        | "Other",
      name,
      surname
    );
    console.log("Created user", newUser);
    return res.status(200).json({
      message: "Created single user",
      user: newUser,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error",
      error: (err as Error).message || "Unknown error",
    });
  }
};

export const deleteUser: RequestHandler = async (req, res) => {
  try {
    const deletedUser = await deleteUserFromDb(parseInt(req.params.id));
    res.status(200).json({
      message: "Deleted single user",
      user: deletedUser,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error",
      error: (err as Error).message || "Unknown error",
    });
  }
};

export const updateUser: RequestHandler = async (req, res) => {
  try {
    const data = req.body;
    const updatedUser = await updateUserInDB(data, parseInt(req.params.id));
    res.status(200).json({
      message: "Updated single user",
      data: updatedUser,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error",
      error: (err as Error).message || "Unknown error",
    });
  }
};

interface ChangePasswordData {
  oldPassword: string;
  newPassword: string;
}

export const changeUserPassword: RequestHandler = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body as ChangePasswordData;
    if (!oldPassword || !newPassword) {
      return res
        .status(400)
        .json({ message: "Old and new passwords are required" });
    }
    const updatedUser = await changeUserPasswordInDB(
      { oldPassword, newPassword },
      parseInt(req.params.id)
    );
    if (!updatedUser) {
      return res.status(400).json({ message: "Incorrect old password" });
    }
    res.status(200).json({
      message: "Password updated successfully",
      data: updatedUser,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error",
      error: (err as Error).message || "Unknown error",
    });
  }
};


