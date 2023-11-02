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
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import HomePage from "./Components/Homepage";
import Loading from "./Components/Loading";
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
// import ManagerProducts from "./Components/admin/ManagerProducts";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import { TbTruckDelivery } from "react-icons/tb";
import "./App.scss";
import ManagerProducts from "./Components/AdminControl/ManagerProducts";
import Cart from "./Components/Cart/Cart";
import Category from "./Components/Category/Category";
import DetailProduct from "./Components/DetailProduct";
import MenuResponsive from "./Components/Menu/MenuResponsive";
import ProfilePage from "./Components/Profile";
import ScrollToTop from "./Components/ScrollToTop";
import SearchOrder from "./Components/SearchOrder.jsx/SearchOrder";

//LAYOUT MAIN
const Layout = () => {
  const navigate = useNavigate();
  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.onscroll = function () {};
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollPosition]);
  return (
    <div className="layout">
      <div
        className={`scroll-to-top  ${scrollPosition > 400 ? "show" : "hidden"}`}
      >
        <BsFillArrowUpCircleFill
          className="to-top"
          onClick={() => {
            window.scrollTo(0, 0);
          }}
        />
      </div>
      <div className="scroll-to-top" style={{ bottom: "40px" }}>
        <TbTruckDelivery
          className="search-order"
          onClick={() => navigate("/search-order")}
        />
      </div>

      <Header />
      <Outlet />
      <Footer />
      <ToastContainer
        position="top-center"
        hideProgressBar={false}
        theme="light"
      />
      <MenuResponsive />
    </div>
  );
};

export default function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.account.isLoading);

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

  //FETCH ACCOUNT TO AUTHENTICATED
  useEffect(() => {
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
      {isLoading === false ||
      window.location.pathname === "/login" ||
      window.location.pathname === "/register" ? (
        <>
          <RouterProvider router={router} />
        </>
      ) : (
        <>
          <Loading />
        </>
      )}
    </>
  );
}
