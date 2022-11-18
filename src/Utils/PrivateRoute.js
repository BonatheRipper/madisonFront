import { Outlet, Navigate, useLocation } from "react-router-dom";
import React from "react";
import { useStateContext } from "../context/Statecontext";

const PrivateRoutes = () => {
  const { user } = useStateContext();
  const location = useLocation();
  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};
export default PrivateRoutes;
