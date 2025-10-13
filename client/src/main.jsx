import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
// things to route to
import App from "./App.jsx";
import NoExistingPage from "./pages/NoExistingPage";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
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
        element: <Home />
      }, {
        path: "/profile",
        element: <Profile />
      }, {
        path: "/search_location",
        element: <SearchLocation />
      }, {
        path: "/location/:locationId",
        element: <Location />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
)
