import React, { useState, useEffect, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import Report from "./Report";
import HalfRating from "./HalfRating";
import Review from "./Review";
import MorePalengke from "./MorePalengke";
import HorizontalBars from "./BarChart";
import Modal from "../modals/MyModal";
import AddEditReview from "../modals/AddEditReview";
import ConfirmModal from "../modals/ConfirmModal";
import Carousel from "../ui/Carousel";
import palengkeImage from "./palengke.jpg";
import reviewsData from "./reviewsData.json";
import business_statuses from "../../data/business_statuses.js";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import FmdGoodRoundedIcon from "@mui/icons-material/FmdGoodRounded";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import NoPhotographyIcon from "@mui/icons-material/NoPhotography";
import CircleIcon from "@mui/icons-material/Circle";

function Palengke({ ...sharedProps }) {
  const { palengkeId } = useParams();

  const [addEditReviewClicked, setAddEditReviewClicked] = useState(false);
  const [deleteClicked, setDeleteClicked] = useState(false);
  const [username, setUsername] = useState("");
  const [reviewUserProfilePic, setReviewUserProfilePic] = useState("");
  const [palengke, setPalengke] = useState({});
  const [palengkeReviews, setPalengkeReviews] = useState([]);
  const [palengkeAndMyReviews, setPalengkeAndMyReviews] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [defaultValues, setDefaultValues] = useState({});
  const [reviewsDataState, setReviewsDataState] = useState(reviewsData);
  const [status, setStatus] = useState("");
  const [statusColor, setStatusColor] = useState("");
  const [media, setMedia] = useState([]);
  const [ratingColor, setRatingColor] = useState("");
  const [rating, setRating] = useState("");
  const [sortCriterion, setSortCriterion] = useState("date");

  const handleBackClick = () => {
    window.history.back();
  };

  const handleEditComment = useCallback(
    (index, editedComment) => {
      const updatedReviewsData = [...reviewsDataState];
      updatedReviewsData[index].review = editedComment;
      setReviewsDataState(updatedReviewsData);
    },
    [reviewsDataState]
  );

  const handleDeleteComment = useCallback(
    (index) => {
      const updatedReviewsData = [...reviewsDataState];
      updatedReviewsData.splice(index, 1);
      setReviewsDataState(updatedReviewsData);
    },
    [reviewsDataState]
  );

  const getPalengke = useCallback(
    (palengkeId) => {
      const palengke = sharedProps.palengkeList.find(
        (palengke) => palengke.id === palengkeId
      );
      setPalengke(palengke);
    },
    [sharedProps.palengkeList]
  );

  const getPalengkeReviews = useCallback(() => {
    const palengkeReviewList = sharedProps.reviewList;
    if (palengkeReviewList && palengkeReviewList.length > 0) {
      const filteredReviews = palengkeReviewList.filter(
        (review) => review.palengke_id === palengkeId
      );
      setPalengkeReviews(filteredReviews);
      getPalengkeAndMyReviews(filteredReviews);
    }
    getRatingColor();
  }, [sharedProps.reviewList, palengkeId]);

  const getPalengkeAndMyReviews = useCallback(
    (palengkeReviews) => {
      const currUserId = sharedProps.currUser?.user_id;
      if (Array.isArray(palengkeReviews) && currUserId) {
        const filteredReviews = palengkeReviews.filter(
          (review) => review.user_id === currUserId
        );
        setPalengkeAndMyReviews(filteredReviews);
      }
    },
    [sharedProps.currUser]
  );

  const isCurrUserReview = (review_id) => {
    return palengkeAndMyReviews.some((review) => review.id === review_id);
  };

  const getMedia = useCallback(
    (palengkeId) => {
      console.log("palengkeId", palengkeId);
      const media = [];
      const palengke = sharedProps.palengkeList.find(
        (palengke) => palengke.id === palengkeId
      );

      console.log("Palengke:", palengke);

      if (palengke && palengke.media && palengke.media.length > 0) {
        const mediaItems = palengke.media.map((mediaId) =>
          sharedProps.mediaList.find((media) => media.id === mediaId)
        );

        mediaItems.forEach((item) => {
          if (item) {
            media.push(item);
          } else {
            console.error("Media not found");
          }
        });
      } else {
        console.error("No media found for palengke ID:", palengkeId);
      }

      console.log("Media:", media);
      setMedia(media);
      return media;
    },
    [sharedProps.mediaList, sharedProps.palengkeList]
  );

  const getStatus = useCallback(
    (palengkeId) => {
      const palengke = sharedProps.palengkeList.find(
        (palengke) => palengke.id === palengkeId
      );
      //find the status name of palengke.business_status
      if (palengke?.business_status !== null) {
        const statusObject = business_statuses.find(
          (status) => status.business_status_id === palengke.business_status
        );
        if (statusObject) {
          setStatus(statusObject.name);
          setStatusColor(statusObject.color);
        } else {
          console.error("Status object not found");
        }
      } else {
        console.error("No business status found for palengke ID:", palengkeId);
      }
    },
    [sharedProps.palengkeList]
  );

  const getRatingColor = useCallback(() => {
    const roundedNum = rating;
    if (roundedNum > 0) {
      if (roundedNum <= 0) {
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
    } else {
      setRatingColor("#636363");
    }
  }, [rating]);

  useEffect(() => {
    getPalengke(palengkeId);
    getPalengkeReviews();

    getMedia(palengkeId);
    getStatus(palengkeId);
  }, [palengkeId, getPalengke, getPalengkeReviews, getMedia, getStatus]);

  useEffect(() => {
    setRating(getAverageRating());
  }, [palengkeReviews]);

  useEffect(() => {
    getRatingColor();
  }, [rating]);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [previousImageIndex, setPreviousImageIndex] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPreviousImageIndex(currentImageIndex);
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % media.length);
      setIsTransitioning(true);
    }, 7000);

    return () => clearInterval(interval);
  }, [currentImageIndex, media.length]);

  useEffect(() => {
    if (isTransitioning) {
      const timeout = setTimeout(() => {
        setIsTransitioning(false);
        setPreviousImageIndex(null);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [isTransitioning]);

  const handleDeleteReview = async () => {
    try {
      const response = await fetch(`/review/delete/${defaultValues.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete review");
      }
      setDeleteClicked(false);
      getPalengkeReviews(); // Refresh the reviews list after deletion
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
    if (palengkeReviews.length != 0) {
      palengkeReviews.forEach((review) => {
        totalRating += parseInt(review?.rating);
      });
      const averageRating = totalRating / palengkeReviews.length;
      return averageRating.toFixed(1);
    } else {
      return 0;
    }
  };

  const getAverageRatingInt = () => {
    return Math.round(parseFloat(getAverageRating()));
  };

  const handleAddReview = (newReview) => {
    setPalengkeReviews((prevReviews) => [...prevReviews, newReview]);
    getPalengkeAndMyReviews([...palengkeReviews, newReview]);
  };

  const handleEditReview = (editedReview) => {
    const updatedReviews = palengkeReviews.map((review) =>
      review.id === editedReview.id ? editedReview : review
    );
    setPalengkeReviews(updatedReviews);
    getPalengkeAndMyReviews(updatedReviews);
  };

  const handleSortReviews = (criterion) => {
    setSortCriterion(criterion);
    const sortedReviews = [...palengkeReviews];

    if (criterion === "date") {
      sortedReviews.sort(
        (a, b) => new Date(b.review_date) - new Date(a.review_date)
      );
    } else if (criterion === "highestRating") {
      sortedReviews.sort((a, b) => b.rating - a.rating);
    } else if (criterion === "lowestRating") {
      sortedReviews.sort((a, b) => a.rating - b.rating);
    }

    setPalengkeReviews(sortedReviews);
  };

  return (
    <>
      {addEditReviewClicked && (
        <Modal
          open={addEditReviewClicked}
          setOpen={setAddEditReviewClicked}
          title={isEditing ? "Edit Review" : "Add Review"}
        >
          <AddEditReview
            setOpen={setAddEditReviewClicked}
            palengkeId={palengkeId}
            onAddReview={handleAddReview}
            onEditReview={handleEditReview}
            defaultValues={defaultValues}
            setDefaultValues={setDefaultValues}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            userId={sharedProps.currUser.id}
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
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button
            onClick={handleBackClick}
            style={{
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
            }}
          >
            <ArrowBackIcon style={{ color: " #ff6262" }} />
          </button>
        </div>

        <div className="details">
          {/* <img alt="market" src={palengkeImage} className="Marketimg"></img> */}
          <Carousel media={media} />
          <div className="content">
            <div className="namerate">
              <p className="welcome">{palengke?.name}</p>
              <div
                className="ratingContBig"
                style={{
                  margin: "20px",
                  backgroundColor: ratingColor || "#636363", // Fallback color if ratingColor is invalid
                }}
              >
                {rating !== 0 ? (
                  <>
                    <StarRoundedIcon className="muiStarIcon" />
                    {rating}
                  </>
                ) : (
                  <div
                    style={{
                      fontSize: "20px",
                      height: "36px",
                      marginTop: "5px",
                      marginLeft: "5px",
                      marginRight: "5px",
                    }}
                  >
                    No rating yet
                  </div>
                )}
              </div>
              {/* Status icon */}
              <div className="statusIconCont">
                <div className="statusIcon">
                  <CircleIcon
                    className="statusCircle"
                    style={{ color: statusColor }}
                  />
                  <strong>{status}</strong>
                </div>
                <div className="statusIconInside">
                  <CircleIcon
                    className="statusCircle"
                    style={{ color: statusColor }}
                  />
                  <strong>{status}</strong>
                </div>
              </div>
              <Report style={{ marginLeft: "500px" }} />
            </div>
            <div className="locationBig">
              <FmdGoodRoundedIcon className="muiLocationIcon" />
              <div>{palengke?.address}</div>
            </div>
            <div className="desc">
              <p>{palengke?.description}</p>
            </div>
          </div>
        </div>
        <div className="details">
          <div className="dropdown">
            <button className="dropbtn">
              Sort Reviews by
              <ArrowDropDownIcon />
            </button>
            <div className="dropdown-content">
              <a href="#" onClick={() => handleSortReviews("date")}>
                Date
              </a>
              <a href="#" onClick={() => handleSortReviews("highestRating")}>
                Highest Rating
              </a>
              <a href="#" onClick={() => handleSortReviews("lowestRating")}>
                Lowest Rating
              </a>
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
                name="read-only"
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
          {palengkeReviews.map((review) => {
            return (
              <Review
                key={review.id}
                index={review.id}
                editable={isCurrUserReview(review.id)}
                setOpen={setAddEditReviewClicked}
                setDeleteClicked={setDeleteClicked}
                review={review}
                setIsEditing={setIsEditing}
                setDefaultValues={setDefaultValues}
                {...sharedProps}
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
      </div>
    </>
  );
}

export default Palengke;
