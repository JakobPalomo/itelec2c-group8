import { Outlet, useLocation, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./Navbar.js";
function Layout({ children }) {
  return (
    <div>
      <Navbar />
      <Outlet />
      {/* {children} */}
    </div>
  );
}

export default Layout;
