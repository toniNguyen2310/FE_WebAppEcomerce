import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import NotPermitted from "../NotPermitted";

function RoleBaseRoute(props) {
  const isAdminRoute = window.location.pathname.startsWith("/admin");
  const user = useSelector((state) => state.account.user);
  // console.log("user protected??? ", user);
  const isAdmin = user.isAdmin;

  if (isAdminRoute && isAdmin) {
    return <>{props.children}</>;
  } else {
    return <NotPermitted />;
  }
}

function ProtectedRoute(props) {
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);
  const isAdmin = useSelector((state) => state.account.user.isAdmin);
  // console.log("isAuthenticated - PTR>>> ", isAuthenticated, isAdmin);
  return (
    <>
      {isAuthenticated && isAdmin ? (
        <>
          <RoleBaseRoute>{props.children}</RoleBaseRoute>
        </>
      ) : (
        <Navigate to="/login" replace />
      )}
    </>
  );
}

export default ProtectedRoute;
