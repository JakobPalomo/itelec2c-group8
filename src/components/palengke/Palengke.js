import React from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import "../../styles/Palengke.css";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import FmdGoodRoundedIcon from "@mui/icons-material/FmdGoodRounded";
import Report from "./Report.js";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
// Import the image file
import palengkeImage from "./palengke.jpg";

function Palengke({ ...sharedProps }) {
  return (
    <div className="holder">
      <div className="details">
        <img alt="market" src={palengkeImage} className="Marketimg"></img>
        <div className="content">
          <div className="namerate">
            <p className="welcome">Palengke Name</p>
            <div className="ratingCont">
              <StarRoundedIcon className="muiStarIcon" />5
            </div>
            <Report style={{ marginLeft: "500px" }} />
          </div>
          <div className="location">
            <FmdGoodRoundedIcon className="muiLocationIcon" />
            <div>Somewhere</div>
          </div>
          <p className="subtext">Palengke Description:</p>
          <div className="desc">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.{" "}
            </p>
          </div>
        </div>
      </div>
      <div className="details">
        {" "}
        <div class="dropdown">
          <button class="dropbtn">
            Filter by
            <ArrowDropDownIcon />
          </button>
          <div class="dropdown-content">
            <a href="#">Option 1</a>
            <a href="#">Option 2</a>
            <a href="#">Option 3</a>
          </div>
        </div>
        <Button
          variant="contained"
          className="button addPalengkeButton pinkButton"
          style={{ textTransform: "none", marginTop: "60px" }}
          onClick={{}}
        >
          Add Review
          <AddIcon className="muiAddIcon" />
        </Button>
      </div>
    </div>
  );
}

export default Palengke;
