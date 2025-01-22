import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import ErrorPage from "./pages/ErrorPage";
import { AuthProvider } from "./store/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardRoot from "./pages/dashboard/DashboardRoot";
import MainRoot from "./pages/main/MainRoot";
import Dashboard from "./pages/dashboard/Dashboard";

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
          path: "/dashboard",
          element: <ProtectedRoute />,
          children: [
            {
              path: "/dashboard",
              element: <DashboardRoot />,
              children: [
                {
                  path: "/dashboard/",
                  element: <Dashboard />
                }
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
