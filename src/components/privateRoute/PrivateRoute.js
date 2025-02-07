import React from "react";
import { Navigate } from "react-router";

/**
 * PrivateRoute Component
 * 
 * This component is used to protect routes that require authentication.
 * If the user is logged in (`isLogin` is true), it renders the specified child components.
 * Otherwise, it redirects the user to the login page.
 * 
 * @param {boolean} isLogin - Indicates whether the user is authenticated.
 * @param {React.ReactNode} children - The components to render if authentication is successful.
 * @returns {React.ReactNode} - The protected route if logged in, otherwise redirects to login.
 */
const PrivateRoute = ({ isLogin, children }) => {
  // Debugging log to check the authentication status
  // console.log(isLogin); 
  return isLogin ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
