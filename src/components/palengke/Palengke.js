import React from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import "../../styles/Palengke.css";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import FmdGoodRoundedIcon from "@mui/icons-material/FmdGoodRounded";
import Report from "./Report.js";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import HalfRating from "./HalfRating.js";
import Review from "./Review.js";
import MorePalengke from "./MorePalengke.js";
import HorizontalBars from "./BarChart.js";
import { useState } from "react";
import Modal from "../modals/MyModal";
import AddPalengke from "../modals/AddPalengke.js";
import AddReview from "../modals/AddReview.js";
// Import the image file
import palengkeImage from "./palengke.jpg";

function Palengke({ ...sharedProps }) {
  const [addReviewClicked, setAddReview] = useState(false);

  return (
    <div className="holder">
      {addReviewClicked === true && (
        <Modal
          title="Add A Review"
          open={addReviewClicked}
          setOpen={setAddReview}
        >
          <AddReview setAddPalengkeClicked={setAddReview} />
        </Modal>
      )}
      <div className="details">
        <img alt="market" src={palengkeImage} className="Marketimg"></img>
        <div className="content">
          <div className="namerate">
            <p className="welcome">Palengke Name</p>
            <div className="ratingCont" style={{ margin: "20px" }}>
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
              nulla pariatur.
            </p>
          </div>
        </div>
      </div>
      <div className="details">
        {" "}
        <div class="dropdown">
          <button class="dropbtn">
            Sort Reviews by
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
          onClick={() => setAddReview(true)}
        >
          Add Review
          <AddIcon className="muiAddIcon" />
        </Button>
      </div>
      <div
        className="Overview"
        style={{ marginBottom: "28px", flexDirection: "row", display: "flex" }}
      >
        <div>
          <p>Palengke Reviews</p>
          <p className="welcome">4.7</p>
          <div>
            <HalfRating />
          </div>
          <p>(524 Reviews)</p>
          <p>Jan 20, 2024</p>
        </div>
        <div className="rev">
          <HorizontalBars />
        </div>
      </div>

      <div>
        <Review />
        <Review />
        <Review />
        <Review />
        <center>
          <p className="more">
            <a href="#" className="more">
              Show more reviews ...
            </a>
          </p>
          <MorePalengke />
        </center>
      </div>
    </div>
  );
}

export default Palengke;
