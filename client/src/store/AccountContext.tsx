import {
    ReactNode,
    createContext,
    useState,
    useContext,
    Dispatch,
    SetStateAction
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
    main: boolean
  }
  
  export interface Transaction {
    id: number;
    userId: number;
    amount: string;
    categoryId: number;
    type: string;
    description: string | null;
    date: string;
    createdAt: string;
    categoryName: string;
    accountName: string;
  }

  interface AccountsContextProps {
    userAccounts: Account[];
    choosenAccount: Account | undefined;
    transactions: Transaction[] | null;
    getUserAccounts: () => Promise<{ status: string; text: string }>;
    setUserAccounts: Dispatch<SetStateAction<Account[]>>;
    setChoosenAccount: Dispatch<SetStateAction<Account | undefined>>;
    addUserAccount: (data: Partial<Account>) => Promise<{ status: string; text: string }>
    setTransactions: Dispatch<SetStateAction<Transaction[] | null>>;
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
    const [choosenAccount, setChoosenAccount] = useState<Account | undefined>(undefined);
    const [transactions, setTransactions] = useState<Transaction[] | null>(null);
  
  
    const getUserAccounts = async () => {
      try {
        const response = await api.get<{ message: string; accounts: Account[] }>(
          `/api/accounts`
        );
        const userAccounts = response.data;     
        if(userAccounts.accounts.length == 0) {
         throw new Error("No accounts for this user")
        }   
        setUserAccounts(userAccounts.accounts);
        setChoosenAccount(userAccounts.accounts.find(item => item.main == true));
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
    transactions,
    setTransactions,
    getUserAccounts,
    addUserAccount,
    setUserAccounts,
    setChoosenAccount,
    choosenAccount
    };
  
    return (
      <AccountsContext.Provider value={ctxValue}>{children}</AccountsContext.Provider>
    );
  };
  