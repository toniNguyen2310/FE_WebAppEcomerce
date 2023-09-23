import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import NotPermitted from "../NotPermitted";
import Loading from "../Loading";

function RoleBaseRoute(props) {
  const isAdminRoute = window.location.pathname.startsWith("/admin");
  const user = useSelector((state) => state.account.user);
  console.log("user protected??? ", user);
  const isAdmin = user.isAdmin;

  if (isAdminRoute && isAdmin) {
    return <>{props.children}</>;
  } else {
    return <NotPermitted />;
  }
}

function ProtectedRoute(props) {
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);
  console.log("isAuthenticated - PTR>>> ", isAuthenticated);
  return (
    <div>
      <>
        {isAuthenticated ? (
          <>
            <RoleBaseRoute>{props.children}</RoleBaseRoute>
          </>
        ) : (
          <Navigate to="/login" replace />
        )}
      </>
    </div>
  );
}

export default ProtectedRoute;