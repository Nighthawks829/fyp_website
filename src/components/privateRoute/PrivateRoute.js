import React from "react";
import { Navigate } from "react-router";

const PrivateRoute = ({ isLogin, children }) => {
  console.log(isLogin);
  return isLogin ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
