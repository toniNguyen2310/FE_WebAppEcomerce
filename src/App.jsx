import React, { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Outlet } from "react-router-dom";
import ContentPage from "./pages/content";
import LaptopPage from "./pages/laptop";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import HomePage from "./Components/Homepage";
import RegisterPage from "./pages/register";
import LoginPage from "./pages/Login";
import "../src/styles/reset.scss";
const Layout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <div>404 NOT FOUND!!!</div>,
      children: [
        { index: true, element: <HomePage /> },
        {
          path: "content",
          element: <ContentPage />,
        },
        {
          path: "laptop",
          element: <LaptopPage />,
        },
      ],
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
