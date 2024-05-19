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
import emptyBox from "../../../public/assets/empty-box.png";

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
          <h1>My Contributions</h1>
          {sharedProps.userContributions.length > 0 && (
            <Link className="links" to="/account/contributions">
              See All <ArrowForwardIosIcon sx={{ fontSize: "15px" }} />
            </Link>
          )}
        </div>
        {sharedProps.userContributions.length > 0 ? (
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
        ) : (
          <div className="emptyCont">
            <img src={emptyBox} alt="Empty" className="emptyBox" />
            You have no contributions yet
          </div>
        )}
        <div className="titleAccount">
          <h1>My Reviews</h1>
          {sharedProps.userReviews.length > 0 && (
            <Link className="links" to="/account/reviews">
              See All <ArrowForwardIosIcon sx={{ fontSize: "15px" }} />
            </Link>
          )}
        </div>
        <div className="profilereview">
          {sharedProps.userReviews.length > 0 ? (
            <center>
              {sharedProps.userReviews.slice(0, 1).map((review) => (
                <Link
                  to={`/palengke/${review.palengke_id}`}
                  key={review.id}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  {/* <PalengkeItem
                  palengke={review}
                  type={"45%"}
                  min={"60%"}
                  marg={"0"}
                  prev={true}
                  showIcons={false}
                  preview={true}
                  {...sharedProps}
                /> */}
                  <Review
                    key={review.id}
                    index={review.id}
                    editable={true}
                    review={review}
                    accountPage={true}
                    {...sharedProps}
                  />
                </Link>
              ))}
            </center>
          ) : (
            <div className="emptyCont">
              <img src={emptyBox} alt="Empty" className="emptyBox" />
              You have no reviews yet
            </div>
          )}
        </div>
        <div className="titleAccount">
          <h1>My Saves</h1>
          {sharedProps.userSaves.length > 0 && (
            <Link className="links" to="/account/saves">
              See All <ArrowForwardIosIcon sx={{ fontSize: "15px" }} />
            </Link>
          )}
        </div>
        {sharedProps.userSaves.length > 0 ? (
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
        ) : (
          <div className="emptyCont">
            <img src={emptyBox} alt="Empty" className="emptyBox" />
            You have no saved palengke yet
          </div>
        )}
      </div>
      <div style={{ height: "50px" }}></div>
    </>
  );
}
