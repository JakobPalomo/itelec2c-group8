import { Outlet, useLocation, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./Navbar.js";
function Layout({ isLoggedIn }) {
  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} />
      <div style={{ height: "98px" }}></div>
      <Outlet />
    </div>
  );
}

export default Layout;
