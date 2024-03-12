import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import Home from "../pages/home/Home";
import Pages from "../pages/pages/Pages";
import Settings from "../pages/settings/Settings";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/pages", element: <Pages /> },
      { path: "/settings", element: <Settings /> },
    ],
  },
  { path: "*", element: <div>Not Found</div> },
]);

export default router;
