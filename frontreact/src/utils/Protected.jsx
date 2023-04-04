import React from "react";
import { Navigate, useLocation } from "react-router-dom";




const Protected = ({ children }) => {
  const isAuth = false;
  const location = useLocation().pathname;

  return isAuth ? (
    children
  ) : (
    <Navigate to={"/login"} state={{ from: location }} replace />
  );
};

export default Protected;