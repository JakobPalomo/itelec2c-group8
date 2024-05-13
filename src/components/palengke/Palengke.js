import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
import AddEditReview from "../modals/AddEditReview.js";
import ConfirmModal from "../modals/ConfirmModal.js";
import palengkeImage from "./palengke.jpg";
import reviewsData from "./reviewsData.json";

function Palengke({ ...sharedProps }) {
  const { palengkeId } = useParams();

  const [addEditReviewClicked, setAddEditReviewClicked] = useState(false);
  const [deleteClicked, setDeleteClicked] = useState(false);
  const [username, setUsername] = useState("");
  const [palengke, setPalengke] = useState({});
  const [palengkeReviews, setPalengkeReviews] = useState([]);
  const [palengkeAndMyReviews, setPalengkeAndMyReviews] = useState([]);

  const [isEditing, setIsEditing] = useState(false);
  const [defaultValues, setDefaultValues] = useState({});

  const [reviewsDataState, setReviewsDataState] = useState(reviewsData); // State variable for reviews data
  const [statusColor, setStatusColor] = useState("");
  const [ratingColor, setRatingColor] = useState("");

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

  const getPalengke = (palengkeId) => {
    const palengke = sharedProps.palengkeList.find(
      (palengke) => palengke.id === palengkeId
    );
    setPalengke(palengke);
  };

  const getPalengkeReviews = () => {
    const palengkeReviewList = sharedProps.reviewList;
    if (palengkeReviewList && palengkeReviewList.length > 0) {
      const filteredReviews = palengkeReviewList.filter(
        (review) => review.palengke_id === palengkeId
      );
      setPalengkeReviews(filteredReviews);
      getPalengkeAndMyReviews(filteredReviews);
    }
  };

  const getPalengkeAndMyReviews = (palengkeReviews) => {
    console.log(typeof palengkeReviews);
    const currUserId = sharedProps.currUser?.user_id;
    if (Array.isArray(palengkeReviews) && currUserId) {
      const filteredReviews = palengkeReviews.filter(
        (review) => review.user_id === currUserId
      );
      setPalengkeAndMyReviews(filteredReviews);
    }
  };

  const getUsername = () => {
    const currUserId = sharedProps.currUser?.user_id;
    console.log("userList");
    console.log(sharedProps.userList);
    if (currUserId && sharedProps.userList.length !== 0) {
      const user = sharedProps.userList.find((user) => user.id === currUserId);
      if (user) {
        setUsername(user.username);
      }
    }
  };

  const isCurrUserReview = (review_id) => {
    return palengkeAndMyReviews.some((review) => review.id === review_id);
  };

  useEffect(() => {
    console.log(
      `isLoggedIn: ${sharedProps.isLoggedIn}; currUserid: ${sharedProps.currUser?.user_id}`
    );
    console.log(sharedProps.currUser);
    console.log(`palengkeId: ${palengkeId}`);
    getPalengke(palengkeId);
    getPalengkeReviews();
    getUsername();
    getRatingColor();
    console.log(sharedProps);
    console.log(palengke);
    console.log(palengkeReviews);
    console.log(palengkeAndMyReviews);
  }, []);

  useEffect(() => {
    console.log("isEditing");
    console.log(isEditing);
  }, [isEditing]);

  const handleDeleteReview = async () => {
    console.log("inside");
    try {
      // Send a DELETE request to the server to delete the review
      const response = await fetch(`/review/delete/${defaultValues.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete review");
      }
      setDeleteClicked(false);
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  const getFormattedDate = () => {
    const today = new Date();
    const options = { year: "numeric", month: "short", day: "numeric" };
    const formattedDate = today.toLocaleDateString("en-US", options);
    return formattedDate;
  };

  const getAverageRating = () => {
    let totalRating = 0;
    palengkeReviews.forEach((review) => {
      totalRating += parseInt(review.rating);
    });
    const averageRating = totalRating / palengkeReviews.length;
    return averageRating;
  };

  const getAverageRatingInt = () => {
    return Math.round(parseFloat(getAverageRating()));
  };

  const getRatingColor = () => {
    if (palengke.rating !== null) {
      const roundedNum = Math.round(palengke.rating);
      if (roundedNum == -1) {
        setRatingColor("#969595");
      } else if (roundedNum <= 1) {
        setRatingColor("#FF6262");
      } else if (roundedNum <= 2) {
        setRatingColor("#FF8855");
      } else if (roundedNum <= 3) {
        setRatingColor("#F2C038");
      } else if (roundedNum <= 4) {
        setRatingColor("#B1CE3B");
      } else if (roundedNum <= 5) {
        setRatingColor("#6EA837");
      }
    }
  };

  return (
    <>
      {addEditReviewClicked === true && (
        <Modal
          title={isEditing === true ? "Edit a Review" : "Add a Review"}
          open={addEditReviewClicked}
          setOpen={setAddEditReviewClicked}
        >
          <AddEditReview
            user_id={sharedProps.currUser?.user_id}
            palengke_id={palengkeId}
            setOpen={setAddEditReviewClicked}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            defaultValues={defaultValues}
          />
        </Modal>
      )}
      {deleteClicked === true && (
        <ConfirmModal
          title="Confirm Delete"
          open={deleteClicked}
          setOpen={setDeleteClicked}
          confirmYes={handleDeleteReview}
          context="deleteReview"
        >
          <div>Are you sure you want to delete this review?</div>
        </ConfirmModal>
      )}
      <div className="holder">
        <div className="details">
          <img alt="market" src={palengkeImage} className="Marketimg"></img>
          <div className="content">
            <div className="namerate">
              <p className="welcome">{palengke.name}</p>
              <div
                className="ratingContBig"
                style={{
                  margin: "20px",
                  backgroundColor: `${ratingColor} !important`,
                }}
              >
                <StarRoundedIcon className="muiStarIcon" />
                {getAverageRating()}
              </div>
              <Report style={{ marginLeft: "500px" }} />
            </div>
            <div className="locationBig">
              <FmdGoodRoundedIcon className="muiLocationIcon" />
              <div>{palengke.address}</div>
            </div>
            {/* <p className="subtext">Palengke Description:</p> */}
            <div className="desc">
              <p>
                {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. */}
                {palengke.description}
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
          {sharedProps.isLoggedIn === true && (
            <Button
              variant="contained"
              className="button addPalengkeButton pinkButton"
              style={{ textTransform: "none", marginTop: "60px" }}
              onClick={() => {
                setAddEditReviewClicked(true);
              }}
            >
              Add Review
              <AddIcon className="muiAddIcon" />
            </Button>
          )}
        </div>
        <div className="Overview">
          <div>
            <p>Palengke Reviews</p>
            <p className="welcome">{getAverageRating()}</p>
            <div>
              <HalfRating
                defaultValue={getAverageRatingInt()}
                disabled={true}
              />
            </div>
            <p>({palengkeReviews.length} Reviews)</p>
            <p>{getFormattedDate()}</p>
          </div>
          <div className="rev">
            <HorizontalBars data={palengkeReviews} />
          </div>
        </div>

        <div className="reviewList">
          {palengkeReviews.map((review, index) => {
            return (
              <Review
                key={review.id}
                index={review.id}
                editable={isCurrUserReview(review.id)}
                setOpen={setAddEditReviewClicked}
                setDeleteClicked={setDeleteClicked}
                review={review}
                username={username}
                setIsEditing={setIsEditing}
                setDefaultValues={setDefaultValues}
              />
            );
          })}
        </div>

        <center>
          <p className="more">
            <a href="#" className="more">
              Show more reviews ...
            </a>
          </p>
          <MorePalengke {...sharedProps} />
        </center>

        {/* Modal for adding a review
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
      </Modal> */}
      </div>
    </>
  );
}

export default Palengke;
