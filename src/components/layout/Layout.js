import { Outlet, useLocation, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./Navbar.js";
import Footer from "./Footer.js";
function Layout({ isLoggedIn }) {
  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} />
      <div style={{ height: "98px" }} className="navTopMargin"></div>
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;
