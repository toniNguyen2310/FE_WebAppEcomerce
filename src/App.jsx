import React, { useEffect } from "react";
import { Button, message, Space } from "antd";
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
import { useDispatch, useSelector } from "react-redux";
import { doGetAccountAction } from "./redux/account/accountSlice";
import NotFound from "./Components/NotFound";
import AdminPage from "./Components/admin";
import Loading from "./Components/Loading";
import ProtectedRoute from "./Components/ProtectedRoute";
import LayoutAdmin from "./Components/admin/LayoutAdmin";
import ManagerProducts from "./Components/admin/ManagerProducts";
import CreateProduct from "./Components/admin/modal/CreateProduct";

//LAYOUT MAIN
const Layout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={true}
        theme="light"
      />
    </div>
  );
};

export default function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.account.isLoading);
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);
  console.log("isAuthenticated - App>> ", isAuthenticated);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <NotFound />,
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
          path: "/admin/prducts",
          element: <ManagerProducts />,
        },
        {
          path: "/admin/create",
          element: <CreateProduct />,
        },
      ],
    },
  ]);
  useEffect(() => {
    const getAccount = async () => {
      if (
        window.location.pathname === "/login" ||
        window.location.pathname === "/register"
      ) {
        return;
      }

      const res = await callFetchAccount();
      console.log("res>>> ", res);
      if (res && res.data) {
        dispatch(doGetAccountAction(res.data));
      }
    };
    getAccount();
  }, []);
  return (
    <>
      {isLoading === false ||
      window.location.pathname === "/login" ||
      window.location.pathname === "/register" ||
      window.location.pathname === "/" ? (
        <>
          {console.log("run")}
          <RouterProvider router={router} />
        </>
      ) : (
        //  window.location.pathname.startsWith("/admin")
        //BUG => Khi không đăng nhập và muốn truy cập vào trang ADMIN sẽ bị chuyển về trang login để đăng nhập
        // Cần tìm cách chuyển ..... chưa nghĩ ra nên để tạm laptopPage

        // <LaptopPage />
        <>
          {console.log("Run Loading")}
          <Loading />
        </>
      )}
    </>
  );
}
