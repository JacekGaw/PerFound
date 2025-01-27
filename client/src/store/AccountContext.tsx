import {
    ReactNode,
    createContext,
    useState,
    useContext,
  } from "react";
  import api from "../api/api";

  export interface Account {
    id: number;
    userId: number;
    name: string;
    type: string;
    balance: string; 
    currencyCode: string;
    createdAt: Date;
  }
  

  interface AccountsContextProps {
    userAccounts: Account[];
    getUserAccounts: (userId: number) => Promise<{ status: string; text: string }>;
    addUserAccount: (data: Partial<Account>) => Promise<{ status: string; text: string }>
  }
  
  export const AccountsContext = createContext<AccountsContextProps | undefined>(
    undefined
  );
  
  export const useAccountsCtx = (): AccountsContextProps => {
    const context = useContext(AccountsContext);
    if (context === undefined) {
      throw new Error(
        "Accounts Context must be used within an AccountsContextProvider"
      );
    }
    return context;
  };
  
  export const AccountsProvider: React.FC<{ children: ReactNode }> = ({
    children,
  }) => {
    const [userAccounts, setUserAccounts] = useState<Account[]>([]);
  
  
    const getUserAccounts = async (userId: number) => {
      try {
        const response = await api.get<{ message: string; accounts: Account[] }>(
          `/api/accounts/${userId}`
        );
        const userAccounts = response.data;     
        if(userAccounts.accounts.length == 0) {
         throw new Error("No accounts for this user")
        }   
        setUserAccounts(userAccounts.accounts);
        return {
            status: "Success",
            text: "Set user accounts",
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

    const addUserAccount = async (data: Partial<Account>) => {
        try {
          const response = await api.post<{ message: string; accounts: Account[] }>(
            `/api/accounts`, data
          );
          const newAccount = response.data;        
          setUserAccounts((p) => [...p, newAccount.accounts[0]]);
          console.log(newAccount)
          return {
              status: "Success",
              text: "Added user account",
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
    userAccounts,
    getUserAccounts,
    addUserAccount
    };
  
    return (
      <AccountsContext.Provider value={ctxValue}>{children}</AccountsContext.Provider>
    );
  };
  