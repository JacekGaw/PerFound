import React, { useEffect} from "react";
import { useUserCtx } from "../../store/UserContext";
import logoutIcon from "../../assets/img/logout.svg";
import { useAuth } from "../../store/AuthContext";
import AccountCard from "./AccoundCard";
import Button from "../../components/UI/Button";
import { LoaderFunction, LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import api from "../../api/api";
import { Transaction, useAccountsCtx } from "../../store/AccountContext";


const Dashboard: React.FC = () => {
  const { user } = useUserCtx();
  const { logOut } = useAuth();
  const { setTransactions } = useAccountsCtx()
  const transactionsArr = useLoaderData() as Transaction[];

  useEffect(() => {
    console.log("TRANSACTIONS", transactionsArr);
    setTransactions(transactionsArr)
  },[transactionsArr])

  console.log("hello")
  return (
    <>
      <div className="w-full flex flex-col justify-center items-center gap-5">
        <header className="w-full flex justify-between items-center">
          <h1 className="font-[800] text-3xl">Hello {user?.name}</h1>
          <Button
            variant={1}
            onClick={logOut}
          >
            <img src={logoutIcon} className="w-6 h-auto rotate-180 " />
          </Button>
        </header>

        <AccountCard />
      </div>
    </>
  );
};

export default Dashboard;

export const loader: LoaderFunction = async ({params}: LoaderFunctionArgs) => {
  const accountName = params.accountName;
  try {
    const response = await api.get<{ message: string; transactions: Transaction[] }>(
      `/api/transactions/${accountName}`
    );
    const transactions = response.data.transactions; 
    if(!transactions) {
      return null;
    }
    return transactions
  } catch (err: any) {
    console.error(err)
    return null;
  }
}



