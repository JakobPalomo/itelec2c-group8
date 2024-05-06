import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";

//PAGES/COMPONENTS
import Layout from "./components/Layout";
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
  {
    /* change true/false here since wla pa login */
  }
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<Layout isLoggedIn={isLoggedIn} />}>
            {/* Home Route */}
            <Route path="/" element={isLoggedIn ? <Home /> : <Login />}></Route>
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
