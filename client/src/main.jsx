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
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import EmailVerification from "./components/EmailVerification";
import SearchLocation from "./pages/SearchLocation";
import Location from "./pages/Location";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    error: <NoExistingPage />,
    children: [
      {
        index: true,
        element: <ProtectedRoute><Home /></ProtectedRoute>
      }, {
        path: "/login",
        element: <ProtectedRoute><Login /></ProtectedRoute>
      }, {
        path: "/signup",
        element: <ProtectedRoute><Signup /></ProtectedRoute>
      }, {
        path: "/verify_email",
        element: <ProtectedRoute><EmailVerification /></ProtectedRoute>
      }, {
        path: "/profile",
        element: <ProtectedRoute><Profile /></ProtectedRoute>
      }, {
        path: "/search_location",
        element: <ProtectedRoute><SearchLocation /></ProtectedRoute>
      }, {
        path: "/location/:locationId",
        element: <ProtectedRoute><Location /></ProtectedRoute>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
)
