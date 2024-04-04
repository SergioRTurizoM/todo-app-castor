import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import { HomePage } from "../components/homepage";
import { LoginPage } from "../components/login";
import { ProtectedRoute } from "../components/protected-routes.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        ),
      },
      { path: "/login", element: <LoginPage /> },
    ],
  },
]);

export const AppRouterProvider = () => {
  return <RouterProvider router={router} />;
};
