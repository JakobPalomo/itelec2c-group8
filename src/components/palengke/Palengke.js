import React, { useState } from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import FmdGoodRoundedIcon from "@mui/icons-material/FmdGoodRounded";
import Report from "./Report.js";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import HalfRating from "./HalfRating.js";
import Review from "./Review.js";
import MorePalengke from "./MorePalengke.js";
import HorizontalBars from "./BarChart.js";
import Modal from "../modals/MyModal";
import AddReview from "../modals/AddReview.js";
import palengkeImage from "./palengke.jpg";
import reviewsData from "./reviewsData.json";

function Palengke({ ...sharedProps }) {
  const [addReviewClicked, setAddReview] = useState(false);
  const [reviewsDataState, setReviewsDataState] = useState(reviewsData); // State variable for reviews data
  const [newComment, setNewComment] = useState(""); // State variable for new comment

  // Function to handle adding a review
  const handleCommentSubmit = () => {
    // Get today's date
    const today = new Date();
    const dateString = today.toDateString();

    // Add the new review to the reviewsData array
    const newReview = {
      date: dateString,
      name: "Aliah", // Default name
      review: newComment,
    };

    // Add the new review to the beginning of the array
    const updatedReviewsData = [newReview, ...reviewsDataState];

    // Update the reviewsData state with the new array
    setReviewsDataState(updatedReviewsData);

    // Close the add review modal
    setAddReview(false);

    // Reset the new comment state
    setNewComment("");
  };

  // Function to handle editing a comment
  const handleEditComment = (index, editedComment) => {
    const updatedReviewsData = [...reviewsDataState];
    updatedReviewsData[index].review = editedComment;
    setReviewsDataState(updatedReviewsData);
  };

  // Function to handle deleting a comment
  const handleDeleteComment = (index) => {
    const updatedReviewsData = [...reviewsDataState];
    updatedReviewsData.splice(index, 1);
    setReviewsDataState(updatedReviewsData);
  };

  // Function to open add review modal
  const handleAddReviewClick = () => {
    setAddReview(true);
  };
  return (
    <div className="holder">
      <div className="details">
        <img alt="market" src={palengkeImage} className="Marketimg"></img>
        <div className="content">
          <div className="namerate">
            <p className="welcome">Palengke Name</p>
            <div className="ratingContBig" style={{ margin: "20px" }}>
              <StarRoundedIcon className="muiStarIcon" />5
            </div>
            <Report style={{ marginLeft: "500px" }} />
          </div>
          <div className="locationBig">
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
          onClick={handleAddReviewClick} // Open modal on button click
        >
          Add Review
          <AddIcon className="muiAddIcon" />
        </Button>
      </div>
      <div className="Overview">
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

      <div className="reviewList">
        {reviewsDataState.map((review, index) => (
          <Review
            key={index}
            index={index}
            {...review}
            onEdit={handleEditComment}
            onDelete={handleDeleteComment}
          />
        ))}
      </div>

      <center>
        <p className="more">
          <a href="#" className="more">
            Show more reviews ...
          </a>
        </p>
        <MorePalengke {...sharedProps} />
      </center>

      {/* Modal for adding a review */}
      <Modal
        title="Add A Review"
        open={addReviewClicked}
        setOpen={setAddReview}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h2>How would you rate this Palengke?</h2> <HalfRating />
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Enter your review here..."
            style={{ fontSize: "18px" }}
          />
          <Button
            variant="contained"
            className="button addReviewButton pinkButton"
            style={{ textTransform: "none", marginTop: "20px" }}
            onClick={handleCommentSubmit}
          >
            Submit
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default Palengke;
