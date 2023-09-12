import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Outlet } from "react-router-dom";
import ContentPage from "./pages/content";
import LaptopPage from "./pages/laptop";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import HomePage from "./Components/Homepage";
import RegisterPage from "./pages/register";
import LoginPage from "./pages/login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../src/styles/reset.scss";
import { callFetchAccount } from "./services.js/api";
import { useDispatch } from "react-redux";
import { doGetAccountAction } from "./redux/account/accountSlice";

const Layout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
      <ToastContainer position="top-center" autoClose={2000} theme="colored" />
    </div>
  );
};

export default function App() {
  const dispatch = useDispatch();
  const getAccount = async () => {
    const res = await callFetchAccount();
    console.log("res>>> ", res);
    if (res && res.data) {
      dispatch(doGetAccountAction(res.data));
    }
  };
  useEffect(() => {
    getAccount();
  }, []);

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
        {
          path: "/login",
          element: <LoginPage />,
        },
        {
          path: "/register",
          element: <RegisterPage />,
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
