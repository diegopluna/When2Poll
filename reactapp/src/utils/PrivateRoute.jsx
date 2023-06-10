import React, {useContext} from "react";
import { Navigate, useLocation } from "react-router-dom";
import AuthContext from "../context/AuthProvider";

const PrivateRoute = ({ children }) => {
    let {user} = useContext(AuthContext)
    const location = useLocation().pathname;

    return user ? (
        children
    ) : (
        <Navigate to={"/signin"} state={{ from: location }} replace />
    );
};

export const UnAuthRoute = ({ children }) => {
    let {user} = useContext(AuthContext)
    const location = useLocation().pathname;

    return !user ? (
        children
    ) : (
        <Navigate to={"/"} state={{ from: location }} replace />
    );
}

export default PrivateRoute;
