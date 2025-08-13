import HomePage from "../pages/HomePage";
import AdminPage from "../pages/AdminPage";

const routes = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/dashboard",
    element: <AdminPage />,
  },
];

export default routes;
