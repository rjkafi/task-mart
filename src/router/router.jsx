import { createBrowserRouter } from "react-router-dom";
import Root from "../LayOuts/Root";
import SignUp from "../Pages/SignUp/SignUp";
import SignIn from "../Pages/SIgnIn/SignIn";
import FeaturedBoard from "../Pages/FeaturedBoard/FeaturedBoard";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: (
          <PrivateRoute>
            <FeaturedBoard />
          </PrivateRoute>
        ),
      },
      {
        path: "/signUp",
        element: <SignUp />,
      },
      {
        path: "/signIn",
        element: <SignIn />,
      },
    ],
  },
]);

export default router;
