import React, {useEffect} from "react";
import { useAuth } from "../../store/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import Spinner from "../../components/UI/Spinner";
import api from "../../api/api";
import { LoaderFunction, redirect, useLoaderData, useNavigate } from "react-router-dom";
import { Account, useAccountsCtx } from "../../store/AccountContext";

const DashboardRoot: React.FC = () => {
  const { isLoading, user } = useAuth();
  const {setUserAccounts, setChoosenAccount} = useAccountsCtx();
  const accounts = useLoaderData() as Account[]
  console.log("ACCOUNTS", accounts)
  const navigate = useNavigate();

  useEffect(() => {
    if(accounts) {
      const mainAccount = accounts.find((acc) => acc.main == true);
      setUserAccounts(accounts)
      if(mainAccount) {
        setChoosenAccount(mainAccount);
        navigate(`/dashboard/${mainAccount.name}`)
      }
      else {
        setChoosenAccount(accounts[0]);
        navigate(`/dashboard/${accounts[0].name}`)
      } 
    }
  }, [])

  if (isLoading) {
    return <div className="w-full h-screen flex justify-center items-center"><Spinner /></div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <div className="flex">
        <main className="max-w-screen-lg mx-auto p-10 w-full flex justify-center">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default DashboardRoot;

export const loader: LoaderFunction = async () => {
  try {
    const response = await api.get<{ message: string; accounts: Account[] }>(
      `/api/accounts`
    );
    const accounts = response.data.accounts; 
    if(accounts.length == 0) {
      return redirect("/onboarding");
    }   
    if(!accounts) {
      return null;
    }
    return accounts
  } catch (err: any) {
    console.error(err)
    return null;
  }
}

