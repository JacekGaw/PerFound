import React, { useEffect, useState } from "react";
import { useAuth } from "../../store/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import { useAccountsCtx } from "../../store/AccountContext";

const DashboardRoot: React.FC = () => {
  const { isLoading, user } = useAuth();
  const { getUserAccounts } = useAccountsCtx();
  const [checkingAccount, setCheckingAccount] = useState(true);
  const [hasAccount, setHasAccount] = useState<boolean | null>(null);

  useEffect(() => {
    const checkIfUserHaveAccount = async () => {
      if (user) {
        try {
          const response = await getUserAccounts(user.id);
          console.log(response)
          setHasAccount(response.status === "Success");
        } catch (err) {
          console.error(err);
          setHasAccount(false);
        } finally {
          setCheckingAccount(false);
        }
      } else {
        setCheckingAccount(false);
      }
    };

    checkIfUserHaveAccount();
  }, []);

  if (isLoading || checkingAccount) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (hasAccount === false) {
    return <Navigate to="/onboarding" replace />;
  }

  return (
    <>
      <div className="flex">
        <main className="p-5 w-full flex justify-center">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default DashboardRoot;
