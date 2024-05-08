import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";

//PAGES/COMPONENTS
import Layout from "./components/layout/Layout";
import Navbar from "./components/layout/Navbar.js";
import Footer from "./components/layout/Footer.js";
import Login from "./components/beforeLogin/Login";
import ForgotPassword from "./components/beforeLogin/ForgotPassword";
import ChangePassword from "./components/beforeLogin/ChangePassword";
import Register from "./components/beforeLogin/Register";
import Home from "./components/homepage/Home";
import Palengke from "./components/palengke/Palengke";
import PalengkeReviews from "./components/palengke/PalengkeReviews";
import Account from "./components/account/Account";
import MyContributions from "./components/account/MyContributions";
import MyReviews from "./components/account/MyReviews";
import Settings from "./components/account/Settings";
import MySaves from "./components/account/MySaves";

function App() {
  // Change true/false here since wla pa login
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [mainMargin, setMainMargin] = useState(0);

  useEffect(() => {
    // Function to update the main content margin
    function updateMainMargin() {
      const headerHeight = document.querySelector(".navTopMargin").offsetHeight;
      const footerHeight = document.querySelector(".footer").offsetHeight;
      const mainContentMargin = `calc(100vh - ${headerHeight}px - ${footerHeight}px)`;
      console.log(`header & footer: ${headerHeight}; ${footerHeight}`);
      setMainMargin(mainContentMargin);
    }
    updateMainMargin();
    window.addEventListener("resize", updateMainMargin);
    return () => {
      window.removeEventListener("resize", updateMainMargin);
    };
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            element={
              <Layout>
                <Navbar isLoggedIn={isLoggedIn} />
                <div style={{ height: "98px" }} className="navTopMargin"></div>
                <Outlet />
                <Footer className="footer" />
              </Layout>
            }
          >
            {/* Home Route */}
            <Route
              path="/"
              element={
                isLoggedIn ? <Home mainMargin={mainMargin} /> : <Login />
              }
            />
            {/* Public Route */}
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/change-password" element={<ChangePassword />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
            <Route path="/palengke/:palengkeId" element={<Palengke />} />
            <Route
              path="/palengke/reviews/:palengkeId"
              element={<PalengkeReviews />}
            />
            {/* Private Route (with account) */}
            <Route path="/account" element={<Account />} />
            <Route
              path="/account/contributions"
              element={<MyContributions />}
            />
            <Route path="/account/reviews" element={<MyReviews />} />
            <Route path="/account/settings" element={<Settings />} />
            <Route path="/account/saves" element={<MySaves />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
