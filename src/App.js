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
import Navbar from "./components/layout/Navbar";
import Main from "./components/layout/Main";
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
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./firebase.js";

function App() {
  // Change true/false here since wla pa login
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [mainMargin, setMainMargin] = useState(0);

  // app objects
  const [palengkeList, setPalengkeList] = useState([]);
  const [reviewList, setReviewList] = useState([]);
  const [upvoteList, setUpvoteList] = useState([]);
  const [mediaList, setMediaList] = useState([]);
  const [userList, setUserList] = useState([]);

  const sharedProps = {
    palengkeList: palengkeList,
    setPalengkeList: setPalengkeList,
    reviewList: reviewList,
    setReviewList: setReviewList,
    upvoteList: upvoteList,
    setUpvoteList: setUpvoteList,
    mediaList: mediaList,
    setMediaList: setMediaList,
    userList: userList,
    setUserList: setUserList,
  };

  useEffect(() => {
    // Function to update the main content margin
    function updateMainMargin() {
      const headerHeight = document.querySelector(".navTopMargin").offsetHeight;
      const footerHeight = document.querySelector(".footer").offsetHeight;
      const mainContentMargin = `calc(100vh - ${headerHeight}px - ${footerHeight}px)`;
      setMainMargin(mainContentMargin);
    }
    updateMainMargin();
    window.addEventListener("resize", updateMainMargin);
    return () => {
      window.removeEventListener("resize", updateMainMargin);
    };
  }, []);

  useEffect(() => {
    console.log(db);
    const collections = ["palengke", "review", "upvote", "user"];
    const stateSetterFunctions = {
      palengke: setPalengkeList,
      review: setReviewList,
      upvote: setUpvoteList,
      media: setMediaList,
      user: setUserList,
    };

    const unsubscribeCallbacks = [];

    collections.forEach((collectionName) => {
      const unsubscribe = onSnapshot(
        collection(db, collectionName),
        (querySnapshot) => {
          const stateSetter = stateSetterFunctions[collectionName];
          if (stateSetter) {
            const updatedData = [];
            querySnapshot.forEach((doc) => {
              updatedData.push({
                id: doc.id,
                ...doc.data(),
              });
            });
            stateSetter(updatedData);

            if (collectionName == "palengke" || collectionName == "review") {
              // Fetch the media collection
              fetch(`/list/media`)
                .then((res) => res.json())
                .then((data) => {
                  setMediaList(data);
                })
                .catch((error) => {
                  console.error("Error fetching media:", error);
                });
            }
          } else {
            console.error(
              `No state setter found for collection: ${collectionName}`
            );
          }
        }
      );

      fetch(`/list/media`)
        .then((res) => res.json())
        .then((data) => {
          setMediaList(data);
        })
        .catch((error) => {
          console.error("Error fetching media:", error);
        });
      unsubscribeCallbacks.push(unsubscribe);
    });

    return () => {
      unsubscribeCallbacks.forEach((unsubscribe) => unsubscribe());
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
                <Main mainMargin={mainMargin}>
                  <Outlet />
                </Main>
                <Footer className="footer" />
              </Layout>
            }
          >
            {/* Home Route */}
            <Route
              path="/"
              element={
                isLoggedIn ? (
                  <Home {...sharedProps} />
                ) : (
                  <Login {...sharedProps} />
                )
              }
            />
            {/* Public Route */}
            <Route path="/login" element={<Login {...sharedProps} />} />
            <Route
              path="/forgot-password"
              element={<ForgotPassword {...sharedProps} />}
            />
            <Route
              path="/change-password"
              element={<ChangePassword {...sharedProps} />}
            />
            <Route path="/register" element={<Register {...sharedProps} />} />
            <Route path="/home" element={<Home {...sharedProps} />} />
            <Route
              path="/palengke/:palengkeId"
              element={<Palengke {...sharedProps} />}
            />
            <Route
              path="/palengke/reviews/:palengkeId"
              element={<PalengkeReviews {...sharedProps} />}
            />
            {/* Private Route (with account) */}
            <Route path="/account" element={<Account {...sharedProps} />} />
            <Route
              path="/account/contributions"
              element={<MyContributions {...sharedProps} />}
            />
            <Route
              path="/account/reviews"
              element={<MyReviews {...sharedProps} />}
            />
            <Route
              path="/account/settings"
              element={<Settings {...sharedProps} />}
            />
            <Route
              path="/account/saves"
              element={<MySaves {...sharedProps} />}
            />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
