import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const isAuth = true;
    const location = useLocation().pathname;

    return isAuth ? (
    children
    ) : (
    <Navigate to={"/login"} state={{ from: location }} replace />
    );
};

export const UnAuthRoute = ({children}) => {
    const isAuth = true;
    const location = useLocation().pathname;

    return !isAuth ? (
    children
    ) : (
    <Navigate to={"/"} state={{ from: location }} replace />
    );
}

export default PrivateRoute;


