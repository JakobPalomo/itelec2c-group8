import Profile from "./Profile";
import "../../styles/Account.css";
import { Link, useLocation } from "react-router-dom";
import PalengkeItem from "../homepage/PalengkeItem";
import palengkeData from "../../data/palengkeData";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Review from "../palengke/Review.js";
import { useState, useEffect } from "react";
import Modal from "../modals/MyModal.js";
import EditProfile from "./EditProfile.js";

export default function Account({
  isEditProfileOpen,
  setIsEditProfileOpen,
  profile,
  setProfile,
  ...sharedProps
}) {
  const location = useLocation();
  useEffect(() => {
    if (isEditProfileOpen === true) {
      setIsEditProfileOpen(false);
    }
  }, [location.pathname]);

  return (
    <>
      <Profile
        isEditProfileOpen={isEditProfileOpen}
        setIsEditProfileOpen={setIsEditProfileOpen}
        profile={profile}
        setProfile={() => {}}
        {...sharedProps}
      />
      <div className="recent">
        <div className="titleAccount">
          <h1>My Recent Contribution</h1>
          <Link className="links" to="/account/contributions">
            See All <ArrowForwardIosIcon sx={{ fontSize: "15px" }} />
          </Link>
        </div>
        <center>
          {sharedProps.userContributions.slice(0, 1).map((palengke) => (
            <Link
              to={`/palengke/${palengke.id}`}
              key={palengke.id}
              style={{ textDecoration: "none", color: "black" }}
            >
              <PalengkeItem
                palengke={palengke}
                type={"45%"}
                min={"60%"}
                marg={"0"}
                showIcons={false}
                mediaList={sharedProps.mediaList}
                {...sharedProps}
              />
            </Link>
          ))}
        </center>
        <div className="titleAccount">
          <h1>My Recent Review</h1>
          <Link className="links" to="/account/reviews">
            See All <ArrowForwardIosIcon sx={{ fontSize: "15px" }} />
          </Link>
        </div>
        <div className="profilereview">
          <center>
            {sharedProps.userReviews.slice(0, 1).map((review) => (
              <Link
                to={`/palengke/${review.palengke_id}`}
                key={review.id}
                style={{ textDecoration: "none", color: "black" }}
              >
                <PalengkeItem
                  palengke={review}
                  type={"45%"}
                  min={"60%"}
                  marg={"0"}
                  prev={true}
                  showIcons={false}
                  preview={true}
                  {...sharedProps}
                />
              </Link>
            ))}
          </center>
          {/* <Review /> */}
        </div>
        <div className="titleAccount">
          <h1>My Recent Save</h1>
          <Link className="links" to="/account/saves">
            See All <ArrowForwardIosIcon sx={{ fontSize: "15px" }} />
          </Link>
        </div>
        <center>
          {sharedProps.userSaves.slice(0, 1).map((palengke) => (
            <Link
              to={`/palengke/${palengke.id}`}
              key={palengke.id}
              style={{ textDecoration: "none", color: "black" }}
            >
              <PalengkeItem
                palengke={palengke}
                type={"45%"}
                min={"60%"}
                marg={"0"}
                showIcons={false}
                mediaList={sharedProps.mediaList}
                {...sharedProps}
              />
            </Link>
          ))}
        </center>
      </div>
      <div style={{ height: "50px" }}></div>
    </>
  );
}
