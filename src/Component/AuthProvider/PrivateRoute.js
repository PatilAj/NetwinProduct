import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const PrivateRoute = () => {
  const user = useAuth();
  if (!user.token) return <Navigate to="/login" />;
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default PrivateRoute;
