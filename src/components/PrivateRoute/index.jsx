import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { LOCAL_STORAGE } from "../../constants/localStorage";
import { PATHS } from "../../constants/pathnames";

const PrivateRoute = ({ redirectPath = PATHS.HOME }) => {
  const isLogin = localStorage.getItem(LOCAL_STORAGE.token);

  if (!isLogin) {
    return <Navigate to={redirectPath} />;
  }
  return (
    <>
      <Outlet />
    </>
  );
};

export default PrivateRoute;
