import React, { useState, useEffect, useCallback } from "react";
import "../../styles/PalengkeList.css";
import HalfRating from "../palengke/HalfRating.js";
import RippleButton from "../ui/RippleButton.js";
import media_types from "../../data/media_types.js";
import business_statuses from "../../data/business_statuses.js";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import NoPhotographyIcon from "@mui/icons-material/NoPhotography";
import HideImageIcon from "@mui/icons-material/HideImage";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import FmdGoodRoundedIcon from "@mui/icons-material/FmdGoodRounded";
import CircleIcon from "@mui/icons-material/Circle";
import { stringAvatar, stringToColor } from "../../functions/utils.js";

// import image from "../../../server/uploads/1715446520703-Screenshot (4549).png";
function PalengkeItem({
  palengke,
  mediaList,
  type,
  min,
  marg,
  showIcons,
  prev,
  preview = false,
  ...sharedProps
}) {
  const [media, setMedia] = useState("");
  const [mediaType, setMediaType] = useState("");
  const [status, setStatus] = useState("");
  const [statusColor, setStatusColor] = useState("");
  const [ratingColor, setRatingColor] = useState("");
  const [rating, setRating] = useState("");
  const [imageError, setImageError] = useState(false);

  const getMedia = () => {
    if (palengke.media && palengke.media.length > 0) {
      const foundMedia = mediaList.find(
        (media) => media.id === palengke.media[0]
      );
      if (foundMedia) {
        getMediaType(foundMedia);
        setMedia(foundMedia);
        console.error(foundMedia);
      } else {
        console.error("Media not found");
      }
    }
  };

  const getMediaType = (foundMedia) => {
    //find the media type of palengke.media[0]
    const typeObject = media_types.find(
      (type) => type.media_type_id === foundMedia.type
    );
    if (typeObject) {
      setMediaType(typeObject.name);
    }
  };

  const getStatus = () => {
    //find the status name of palengke.business_status
    if (palengke.business_status !== null) {
      const statusObject = business_statuses.find(
        (status) => status.business_status_id === palengke.business_status
      );
      if (statusObject) {
        setStatus(statusObject.name);
        setStatusColor(statusObject.color);
      }
    }
  };

  const getRatingColor = () => {
    const roundedNum = getAverageRatingInt();
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
      setRatingColor("#888888");
    }
  };

  const getAverageRating = () => {
    let totalRating = 0;
    if (palengkeReviews.length !== 0) {
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

  useEffect(() => {
    getMedia();
    getStatus();
    getPalengkeReviews();
    console.log("rating", rating);
    console.log(palengke.reviews);
    console.log(palengkeReviews.length);
    console.log("reviewList", sharedProps.reviewList);
    console.log(palengke.id);
  }, []);

  const [palengkeReviews, setPalengkeReviews] = useState([]);

  const getPalengkeReviews = useCallback(() => {
    const palengkeReviewList = sharedProps.reviewList;
    if (palengkeReviewList && palengkeReviewList.length > 0) {
      const filteredReviews = palengkeReviewList.filter(
        (review) => review.palengke_id === palengke.id
      );
      setPalengkeReviews(filteredReviews);
    }
    getRatingColor();
  }, [palengke.id, sharedProps.reviewList]);

  useEffect(() => {
    setRating(getAverageRating());
    getRatingColor();
    // console.log("rating", rating);
    // console.log("rating color", ratingColor);
  }, [palengkeReviews]);

  return (
    <div
      key={palengke.palengke_id}
      className="palengkeCard"
      style={{ width: type, minWidth: min, margin: marg }}
    >
      <RippleButton color="rgba(0, 0, 0, 0.2) !important" display="block">
        {!prev && (
          <div className="imageContainer">
            {media !== "" && media !== null ? (
              mediaType === "image" ? (
                <>
                  <Box
                    component="img"
                    sx={{
                      display: imageError ? "none" : "block",
                      objectFit: "cover",
                      overflow: "hidden",
                      width: "100%",
                    }}
                    src={media.path}
                    alt={media.filename}
                    onError={() => setImageError(true)}
                    className="palengkeImage"
                  />
                  {imageError && (
                    <div className="noImageContainer">
                      <HideImageIcon className="muiNoImageIcon" />
                      Broken or Unsupported Media
                    </div>
                  )}
                </>
              ) : mediaType === "video" ? (
                <video className="palengkeImage">
                  <source src={media.path} className="palengkeImage" />
                  Your browser does not support the video tag.
                </video>
              ) : mediaType === "link" ? (
                <>
                  <Box
                    component="img"
                    sx={{
                      display: imageError ? "none" : "block",
                      objectFit: "cover",
                      overflow: "hidden",
                      width: "100%",
                    }}
                    src={media.link}
                    alt={media.filename}
                    onError={() => setImageError(true)}
                    className="palengkeImage"
                  />
                  {imageError && (
                    <div className="noImageContainer">
                      <HideImageIcon className="muiNoImageIcon" />
                      Broken or Unsupported Media
                    </div>
                  )}
                </>
              ) : (
                <div className="noImageContainer">
                  <HideImageIcon className="muiNoImageIcon" />
                  Broken or Unsupported Media
                </div>
              )
            ) : (
              <div className="noImageContainer">
                <NoPhotographyIcon className="muiNoImageIcon" />
                No Media Available
              </div>
            )}

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
          </div>
        )}
        {prev && (
          <>
            <div style={{ padding: "12px" }}>
              {palengke.edited_date !== "" ? (
                <p>
                  {palengke.edited_date}
                  <span className="editedSpan">edited</span>
                </p>
              ) : (
                <p>{palengke.date}</p>
              )}
              <div>
                <HalfRating disabled={true} defaultValue={palengke.rating} />
              </div>
              {!prev && preview === true && (
                <div className="profileAndUsername">
                  <Avatar
                    {...(sharedProps.currUser?.username &&
                      stringAvatar(sharedProps.currUser?.username))}
                    className="poppins"
                    src={
                      sharedProps?.userProfilePic
                        ? sharedProps?.userProfilePic.path
                        : ""
                    }
                  />
                  <span
                    className={
                      preview === true
                        ? "name overflow-wrap oneline"
                        : "name over-flow"
                    }
                  >
                    {sharedProps.currUser?.username}
                  </span>
                </div>
              )}
              <p
                className={
                  prev === true ? "overflow-wrap twolines" : "overflow-wrap"
                }
              >
                {palengke.review}
              </p>
            </div>
          </>
        )}

        {!prev && (
          <div className="palengkeDetails">
            <div className="ratingAndType">
              <div
                className="ratingCont"
                style={{ backgroundColor: ratingColor }}
              >
                {rating > 0 ? (
                  <>
                    <StarRoundedIcon className="muiStarIcon" />
                    {/* {palengke.rating.toFixed(1).toString()} */}
                    {rating}
                  </>
                ) : (
                  <span className="noRatingCont">No rating yet</span>
                )}
              </div>
              <div className="type">{palengke.type}</div>
            </div>
            <h3 className="palengkeName">{palengke.name}</h3>
            <div className="location">
              <FmdGoodRoundedIcon className="muiLocationIcon" />
              <div>{palengke.address}</div>
            </div>
          </div>
        )}
      </RippleButton>
    </div>
  );
}

export default PalengkeItem;
