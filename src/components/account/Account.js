import Profile from "./Profile";
import "../../styles/Account.css";
import { Link } from "react-router-dom";
import PalengkeItem from "../homepage/PalengkeItem";
import palengkeData from "../../data/palengkeData";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Review from "../palengke/Review.js";
import { useState } from "react";
import Modal from "../modals/MyModal.js";
import EditProfile from "./EditProfile.js";

export default function Account({
  isEditProfileOpen,
  setIsEditProfileOpen,
  ...sharedProps
}) {
  return (
    <>
      <Profile
        isEditProfileOpen={isEditProfileOpen}
        setIsEditProfileOpen={setIsEditProfileOpen}
      />
      <div className="recent">
        <div className="title">
          <h1>My Recent Contribution</h1>
          <Link className="links" to="/account/contributions">
            See All <ArrowForwardIosIcon sx={{ fontSize: "13px" }} />
          </Link>
        </div>
        <center>
          {palengkeData.slice(0, 1).map((palengke) => (
            <Link
              to={`/palengke/${palengke.palengke_id}`}
              key={palengke.palengke_id}
              style={{ textDecoration: "none", color: "black" }}
            >
              <PalengkeItem
                palengke={palengke}
                type={"45%"}
                min={"900px"}
                marg={"0"}
                showIcons={false}
                mediaList={sharedProps.mediaList}
              />
            </Link>
          ))}
        </center>
        <div className="title">
          <h1>My Recent Reviews</h1>
          <Link className="links" to="/account/reviews">
            See All <ArrowForwardIosIcon sx={{ fontSize: "13px" }} />
          </Link>
        </div>
        <div className="profilereview">
          <center>
            {palengkeData.slice(0, 1).map((palengke) => (
              <Link
                to={`/palengke/${palengke.palengke_id}`}
                key={palengke.palengke_id}
                style={{ textDecoration: "none", color: "black" }}
              >
                <PalengkeItem
                  palengke={palengke}
                  type={"45%"}
                  min={"900px"}
                  marg={"0"}
                  prev={true}
                  showIcons={false}
                  mediaList={sharedProps.mediaList}
                />
              </Link>
            ))}
          </center>
          {/* <Review /> */}
        </div>
      </div>
    </>
  );
}
