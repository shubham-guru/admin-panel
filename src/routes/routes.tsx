import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Login from "../presentation/screens/Login";
import Index from "../presentation/screens/Index";

const routes = createBrowserRouter([
  // {
  //   path: "/",
  //   element: <Login />
  // },
  {
    path: "/",
    element: <Index />,
  }
]);

export default routes;