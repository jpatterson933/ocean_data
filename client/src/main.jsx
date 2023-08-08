import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
// things to route to
import App from "./App.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login";
import NoExistingPage from "./pages/NoExistingPage";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import GuestRoute from "./components/GuestRoute";
import EmailVerification from "./components/EmailVerification";
// testing component
import TestingComponent from "./components/test";
import VerifyEmailRoute from "./components/VerifyEmailRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    error: <NoExistingPage />,
    children: [
      {
        index: true,
        element: <Home />
      }, {
        path: "/login",
        element: <GuestRoute><Login /></GuestRoute>
      }, {
        path: "/signup",
        element: <Signup />
      }, {
        path: "/verify_email",
        element: <EmailVerification />
      }, {
        path: "/profile",
        element: <ProtectedRoute><TestingComponent /></ProtectedRoute>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
)
