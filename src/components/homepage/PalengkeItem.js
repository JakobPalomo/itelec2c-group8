import React, { useState, useEffect } from "react";
import "../../styles/PalengkeList.css";
import media_types from "../../data/media_types.js";
import business_statuses from "../../data/business_statuses.js";
import NoPhotographyIcon from "@mui/icons-material/NoPhotography";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import FmdGoodRoundedIcon from "@mui/icons-material/FmdGoodRounded";
import CircleIcon from "@mui/icons-material/Circle";
import RippleButton from "../ui/RippleButton.js";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import HalfRating from "../palengke/HalfRating.js";
// import image from "../../../server/uploads/1715446520703-Screenshot (4549).png";
function PalengkeItem({
  palengke,
  mediaList,
  type,
  min,
  marg,
  showIcons,
  prev,
}) {
  const [media, setMedia] = useState("");
  const [mediaType, setMediaType] = useState("");
  const [status, setStatus] = useState("");
  const [statusColor, setStatusColor] = useState("");
  const [ratingColor, setRatingColor] = useState("");

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

  useEffect(() => {
    getMedia();
    getStatus();
    getRatingColor();
  }, []);

  return (
    <div
      key={palengke.palengke_id}
      className="palengkeCard"
      style={{ width: type, minWidth: min, margin: marg }}
    >
      <RippleButton color="rgba(0, 0, 0, 0.2) !important" display="block">
        <div className="imageContainer">
          {media !== "" && media !== null ? (
            mediaType === "image" ? (
              <img
                src={media.path}
                alt={palengke.name}
                className="palengkeImage"
              />
            ) : mediaType === "video" ? (
              <video className="palengkeImage">
                <source src={media.path} className="palengkeImage" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <div className="noImageContainer">
                <NoPhotographyIcon className="muiNoImageIcon" />
                No Media Available
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
        {prev && (
          <>
            <div style={{ padding: "12px" }}>
              <p>Jan 20, 2024</p>
              <div>
                <HalfRating />
              </div>
              <p className="name">Aliah Esteban</p>
              <p>
                Working at Sam.AI has been an incredible journey so far. The
                technology we're building is truly cutting-edge, and being...
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
                {palengke.rating !== -1 ? (
                  <>
                    <StarRoundedIcon className="muiStarIcon" />
                    {palengke.rating.toFixed(1).toString()}
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
            {showIcons && (
              <div className="editDeleteIcons">
                <ModeEditIcon className="editIcon" />
                <DeleteIcon className="deleteIcon" />
              </div>
            )}
          </div>
        )}
      </RippleButton>
    </div>
  );
}

export default PalengkeItem;
