import React from "react";
import "./home.css";
import ProductList from "../Product/Product";

const Dashboard = () => {
  return (
    <>
      <div className="landing-page-container">
        <ProductList />
      </div>
    </>
  );
};

export default Dashboard;
