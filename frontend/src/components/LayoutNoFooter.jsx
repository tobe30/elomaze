// src/components/LayoutNoFooter.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const LayoutNoFooter = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-0 h-[calc(100vh-4rem)] overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
};

export default LayoutNoFooter;