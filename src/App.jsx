import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Outlet,
  RouterProvider,
  createBrowserRouter,
  useNavigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../src/styles/reset.scss";
import AdminPage from "./Components/AdminControl/AdminPage";
import LayoutAdmin from "./Components/AdminControl/LayoutAdmin";
import HomePage from "./Components/Homepage";
import NotFound from "./Components/NotFound";
import ProtectedRoute from "./Components/ProtectedRoute";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import {
  doGetAccountAction,
  doGetAccountError,
  doGetAccountPending,
} from "./redux/account/accountSlice";
import { callFetchAccount } from "./services.js/api";
import "./App.scss";
import ManagerProducts from "./Components/AdminControl/ManagerProducts";
import Cart from "./Components/Cart/Cart";
import Category from "./Components/Category/Category";
import DetailProduct from "./Components/DetailProduct";
import ProfilePage from "./Components/Profile";
import ScrollToTop from "./Components/ScrollToTop";
import SearchOrder from "./Components/SearchOrder.jsx/SearchOrder";
import { Layout } from "./Components/Layout/Layout";

export default function App() {
  const dispatch = useDispatch();

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <ScrollToTop />
          <Layout />
        </>
      ),
      errorElement: <NotFound />,
      children: [
        { index: true, element: <HomePage /> },
        {
          path: "/product/:slug",
          element: <DetailProduct />,
        },
        {
          path: "cart",
          element: <Cart />,
        },
        {
          path: "profile",
          element: <ProfilePage />,
        },

        {
          path: "search-order",
          element: <SearchOrder />,
        },
        {
          path: "/category/:slug",
          element: <Category />,
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
    {
      path: "/admin",
      element: <LayoutAdmin />,
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "/admin/products",
          element: (
            <ProtectedRoute>
              <ManagerProducts />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);


  useEffect(() => {
    //Authenticate your account when reloading the page
    const getAccount = async () => {
      if (
        window.location.pathname === "/login" ||
        window.location.pathname === "/register"
      ) {
        return;
      }

      const res = await callFetchAccount();
      dispatch(doGetAccountPending());
      if (res && res.data) {
        dispatch(doGetAccountAction(res.data));
      } else {
        dispatch(doGetAccountError());
      }
    };
    getAccount();
  }, []);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
