import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import ErrorPage from "./pages/ErrorPage";
import { AuthProvider } from "./store/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardRoot, {loader as dashboardRootLoader} from "./pages/dashboard/DashboardRoot";
import MainRoot from "./pages/main/MainRoot";
import Dashboard, {loader as transactionsLoader} from "./pages/dashboard/Dashboard";
import Onboarding from "./pages/onboarding/Onboarding";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <MainRoot />
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/signup",
          element: <SignUp />,
        },
        {
          path: "/",
          element: <ProtectedRoute />,
          children: [
            {
              path: "/onboarding/",
              element: <Onboarding />
            },
            {
              path: "/dashboard",
              element: <DashboardRoot />,
              loader: dashboardRootLoader,
              children: [
                {
                  path: "/dashboard/:accountName",
                  element: <Dashboard />,
                  loader: transactionsLoader
                },
              ]
            },
          ]
        }
      ],
    },
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;
