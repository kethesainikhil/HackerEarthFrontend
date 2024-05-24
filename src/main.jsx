import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import "./index.css";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import BuyerPage from "./pages/BuyerPage";
import SellerPage from "./pages/SellerPage";
import Navbar from "./components/Navbar";
import PostProperty from "./components/PostProperty";
import PropertyDetailsPage from "./pages/PropertyDetailsPage";
import UpdateProperty from "./pages/UpdateProperty";
import { BrowserRouter as Router, Routes, Route, RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // Use Layout here
    children: [
      { path: "/", element: <App /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/signup", element: <SignupPage /> },
      { path: "/buyer", element: <BuyerPage /> },
      { path: "/seller", element: <SellerPage /> },
      { path: "/postProperty", element: <ProtectedRoute element={<PostProperty />} /> },
      { path: "/propertyDetails/:id", element: <ProtectedRoute element={<PropertyDetailsPage /> } />},
      { path: "/editProperty/:id", element: <UpdateProperty /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
);
