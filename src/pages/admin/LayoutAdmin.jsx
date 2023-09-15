import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Footer from "../../Components/Footer";
import Header from "../../Components/Header";

function LayoutAdmin(props) {
  const isAdminRoute = window.location.pathname.startsWith("/admin");
  console.log("isAdminRoute>>> ", isAdminRoute);
  const user = useSelector((state) => state.account.user);
  const isAdmin = user.isAdmin;

  return (
    <div className="layout-app">
      {isAdminRoute && isAdmin && <Header />}
      <Outlet />
      {isAdminRoute && isAdmin && <Footer />}
    </div>
  );
}

export default LayoutAdmin;
