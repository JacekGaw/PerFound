import {
  ReactNode,
  createContext,
  useState,
  useEffect,
  useContext,
} from "react";
import { useAuth, UserObj } from "./AuthContext";
import api from "../api/api";


interface UserContextProps {
  user: UserObj | undefined;
  changeUser: (
    data: Partial<UserObj>,
    userId: number | undefined
  ) => Promise<{ status: string; text: string }>;
  userInfo: UserObj | undefined;
  changeUserPassword: (
    data: { oldPassword: string; newPassword: string },
    userId?: number
  ) => Promise<{ status: string; text: string }>;
  deleteUser: (userId?: number) => Promise<{ status: string; text: string }>;
  checkUserAccount: (userId: number) => Promise<{ status: string; text: string }>;
}

export const UserContext = createContext<UserContextProps | undefined>(
  undefined
);

export const useUserCtx = (): UserContextProps => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error(
      "User Context must be used within an UserContextProvider"
    );
  }
  return context;
};

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { user, logOut } = useAuth();
  const [userInfo, setUserInfo] = useState<UserObj>();

  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    if (user) {
      try {
        const response = await api.get(
          `/api/users/${user.id}`
        );
        if (response.data.user[0]) {
          setUserInfo(response.data.user[0]);
          return { status: "Success", text: "Get user info" };
        }
        return { status: "Error", text: "Could't get user info" };
      } catch (err: any) {
        console.log(err);
        const errMessage = err.response?.data.message || err.message;
        return { status: "Error", text: errMessage };
      }
    }
  };


  const changeUser = async (data: Partial<UserObj>, userId: number | undefined) => {
    if (userId === undefined) {
      return { status: "Error", text: "User ID is required" };
    }
    try {
      const userChanged = await api.patch(
        `/api/users/${userId}`,
        data
      );
      if (userChanged) {
        setUserInfo(userChanged.data.data);
        return { status: "Success", text: "User updated successfully" };
      }
      return { status: "Error", text: "Cannot change user" };
    } catch (err: any) {
      const errMessage = err.response?.data.message || err.message;
      return { status: "Error", text: errMessage };
    }
  };

  const changeUserPassword = async (
    data: { oldPassword: string; newPassword: string },
    userId: number | undefined
  ) => {
    try {
      const userChanged = await api.patch(
        `/api/users/${userId}/change-password`,
        data
      );
      if (userChanged) {
        return {
          status: "Success",
          text: "User password updated successfully",
        };
      }
      return { status: "Error", text: "Cannot change user password" };
    } catch (err: any) {
      const errMessage = err.response?.data.message || err.message;
      return { status: "Error", text: errMessage };
    }
  };

  const deleteUser = async (userId: number | undefined) => {
    try {
      const deletedUser = await api.delete(
        `/api/users/${userId}`
      );
      if (deletedUser) {
        if (user && user.id == userId) {
          logOut();
        }
        return {
          status: "Success",
          text: "User deleted successfully",
        };
      }
      return { status: "Error", text: "Cannot delete user" };
    } catch (err: any) {
      console.error(err);
      const errMessage = err.response?.data.message || err.message;
      return { status: "Error", text: errMessage };
    }
  };

  const checkUserAccount = async (userId: number) => {
    try {
      const response = await api.get<{ message: string; accounts: any[] }>(
        `/api/accounts/${userId}`
      );
  
      const userAccounts = response.data;
  
      if (userAccounts.accounts.length > 0) {
        console.log("User accounts:", userAccounts.accounts);
        return {
          status: "Success",
          text: "User has accounts.",
          accounts: userAccounts.accounts,
        };
      }
      return {
        status: "Error",
        text: "User has no accounts.",
      };
    } catch (err: any) {
      console.error(err);
      const errorMessage =
        err.response?.data?.message || "An unknown error occurred.";
      return {
        status: "Error",
        text: errorMessage,
      };
    }
  };

  const ctxValue = {
    user,
    changeUser,
    userInfo,
    changeUserPassword,
    deleteUser,
    checkUserAccount
  };

  return (
    <UserContext.Provider value={ctxValue}>{children}</UserContext.Provider>
  );
};
