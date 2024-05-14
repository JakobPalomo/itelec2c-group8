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
import EditProfile from "./components/modals/EditProfile";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./firebase.js";
const { REACT_APP_GMAPS_API_KEY } = process.env;

// Load Google Maps JavaScript API asynchronously
function loadGoogleMapsScript() {
  const script = document.createElement("script");
  script.src = `https://maps.googleapis.com/maps/api/js?key=${REACT_APP_GMAPS_API_KEY}&libraries=places`;
  script.async = true;
  script.defer = true;
  script.type = "text/javascript";
  document.body.appendChild(script);
}

function App() {
  const initialUsers = [
    {
      user_id: "DBUSERIDHERE",
      username: "myusername",
      email: "email@gmail.com",
      district: "Tondo",
      city: "Manila",
      region: "Metro Manila",
      profile: 1,
      reviews: [],
      contributions: [],
      saves: [],
      upvotes: [],
      otp: 0,
    },
  ];

  const initialUser = {
    user_id: "DBUSERIDHERE",
    username: "myusername",
    email: "email@gmail.com",
    district: "Tondo",
    city: "Manila",
    region: "Metro Manila",
    profile: 1,
    reviews: [],
    contributions: [],
    saves: [],
    upvotes: [],
    otp: 0,
  };

  // Change true/false here since wla pa login
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [currUser, setCurrUser] = useState({});
  const [userProfilePic, setUserProfilePic] = useState({});
  const [userContributions, setUserContributions] = useState([]);
  const [userReviews, setUserReviews] = useState([]);
  const [userSaves, setUserSaves] = useState([]);
  const [userUpvotes, setUserUpvotes] = useState([]);
  const [mainMargin, setMainMargin] = useState(0);

  // app objects
  const [palengkeList, setPalengkeList] = useState([]);
  const [reviewList, setReviewList] = useState([]);
  const [upvoteList, setUpvoteList] = useState([]);
  const [mediaList, setMediaList] = useState([]);
  const [userList, setUserList] = useState(initialUsers);

  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

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
    currUser: currUser,
    isLoggedIn: isLoggedIn,
    userProfilePic: userProfilePic,
    userReviews: userReviews,
    userSaves: userSaves,
    userUpvotes: userUpvotes,
    userContributions: userContributions,
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
    // REAL-TIME OBJECT UPDATE
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

            if (collectionName == "user") {
              // Fetch user contriibutions, reviews, saves, upvotes
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

  useEffect(() => {
    if (currUser?.id) {
      getProfilePicPath();
      getUserContributions();
      getUserReviews();
      getUserSaves();
      getUserUpvotes();
    }
  }, [currUser]);

  useEffect(() => {
    console.log("USER PIC & ARRAYS: ");
    console.log(userProfilePic);
    console.log(userContributions);
    console.log(userReviews);
    console.log(userSaves);
    console.log(userUpvotes);
  }, [userProfilePic, userContributions, userReviews, userSaves, userUpvotes]);

  const getProfilePicPath = async () => {
    try {
      const response = await fetch(`/user-profile?userid=${currUser?.id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const media = await response.json();
      setUserProfilePic(media);
      console.log(media);
    } catch (error) {
      console.log("Error getting profile pic.", error);
    }
  };

  const getUserContributions = async () => {
    try {
      const response = await fetch(
        `/user-arrays?collection=palengke&userid=${currUser?.id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const data = await response.json();
      setUserContributions(data);
      console.log(data);
    } catch (error) {
      console.log("Error getting user's contributons.", error);
    }
  };
  const getUserReviews = async () => {
    try {
      const response = await fetch(
        `/user-arrays?collection=review&userid=${currUser?.id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const data = await response.json();
      setUserReviews(data);
      console.log(data);
    } catch (error) {
      console.log("Error getting user's reviews.", error);
    }
  };
  const getUserSaves = async () => {
    try {
      const response = await fetch(
        `/user-arrays?collection=save&userid=${currUser?.id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const data = await response.json();
      setUserSaves(data);
      console.log(data);
    } catch (error) {
      console.log("Error getting user's saves.", error);
    }
  };
  const getUserUpvotes = async () => {
    try {
      const response = await fetch(
        `/user-arrays?collection=upvote&userid=${currUser?.id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const data = await response.json();
      setUserUpvotes(data);
      console.log(data);
    } catch (error) {
      console.log("Error getting user's upvotes.", error);
    }
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            element={
              <Layout>
                <Navbar
                  isLoggedIn={isLoggedIn}
                  setIsLoggedIn={setIsLoggedIn}
                  currUser={currUser}
                  setCurrUser={setCurrUser}
                  userProfilePic={userProfilePic}
                  setUserProfilePic={setUserProfilePic}
                  setUserReviews={setUserReviews}
                  setUserSaves={setUserSaves}
                  setUserUpvotes={setUserUpvotes}
                  setUserContributions={setUserContributions}
                />
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
                  <Home {...sharedProps} />
                  // <Login
                  //   setIsLoggedIn={setIsLoggedIn}
                  //   {...sharedProps}
                  //   isLoggedIn={true}
                  // />
                )
              }
            />
            {/* Public Route */}
            <Route
              path="/login"
              element={
                <Login
                  setIsLoggedIn={setIsLoggedIn}
                  setCurrUser={setCurrUser}
                  {...sharedProps}
                />
              }
            />
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
            <Route
              path="/account"
              element={
                <Account
                  isEditProfileOpen={isEditProfileOpen}
                  setIsEditProfileOpen={setIsEditProfileOpen}
                  {...sharedProps}
                />
              }
            />
            <Route
              path="/account/edit-profile"
              element={
                <EditProfile
                  isEditProfileOpen={isEditProfileOpen}
                  setIsEditProfileOpen={setIsEditProfileOpen}
                  {...sharedProps}
                />
              }
            />
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
