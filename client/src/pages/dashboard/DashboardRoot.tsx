import React from "react";
import { useAuth } from "../../store/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import { UserProvider } from "../../store/UserContext";

const DashboardRoot: React.FC = () => {
  const { isLoading, user } = useAuth();
  if (isLoading) {
    return <></>;
  }
  if (!user) {
    return <Navigate to="/login" />;
  }
  return (
    <>
      <UserProvider>

                <div className="flex">
                  <main className=" p-5 w-full  flex justify-center">
                    <Outlet />
                  </main>
                </div>

      </UserProvider>
    </>
  );
};

export default DashboardRoot;
