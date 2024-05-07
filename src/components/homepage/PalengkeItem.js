import React, { useState, useEffect } from "react";
import "../../styles/PalengkeList.css";
import business_status from "../../data/business_status.js";
import NoPhotographyIcon from "@mui/icons-material/NoPhotography";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import FmdGoodRoundedIcon from "@mui/icons-material/FmdGoodRounded";
import RippleButton from "../RippleButton.js";

function PalengkeItem({ palengke }) {
  const [media, setMedia] = useState("");
  const [status, setStatus] = useState("");
  const [statusColor, setStatusColor] = useState("");
  const [ratingColor, setRatingColor] = useState("");

  const getMedia = () => {
    //find the path of palengke.media[0]
    if (palengke.media.length !== 0) {
      setMedia("./palengke.jpg");
    }
  };

  const getStatus = () => {
    //find the status name of palengke.business_status
    if (palengke.business_status !== null) {
      const statusObject = business_status.find(
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
      if (roundedNum <= 1) {
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
    <div key={palengke.palengke_id} className="palengkeCard">
      <RippleButton color="rgba(0, 0, 0, 0.2) !important">
        <div className="imageContainer">
          {media !== "" && media !== null ? (
            <img src={media} alt={palengke.name} className="palengkeImage" />
          ) : (
            <div className="noImageContainer">
              <NoPhotographyIcon className="muiNoImageIcon" />
              No Image Available
            </div>
          )}

          {/* Status icon */}
          <div className="statusIconCont">
            <div className="statusIcon">
              <i className="fa-solid fa-circle statusCircle"></i>
              <strong>{status}</strong>
            </div>
            <div className="statusIconInside">
              <i
                className="fa-solid fa-circle statusCircle"
                style={{ color: statusColor }}
              ></i>
              <strong>{status}</strong>
            </div>
          </div>
        </div>
        <div className="palengkeDetails">
          <div className="ratingAndType">
            <div
              className="ratingCont"
              style={{ backgroundColor: ratingColor }}
            >
              <StarRoundedIcon className="muiStarIcon" />
              {palengke.rating.toFixed(1).toString()}
            </div>
            <div className="type">{palengke.type}</div>
          </div>
          <h3 className="palengkeName">{palengke.name}</h3>
          <div className="location">
            <FmdGoodRoundedIcon className="muiLocationIcon" />
            <div>{palengke.address}</div>
          </div>
        </div>
      </RippleButton>
    </div>
  );
}

export default PalengkeItem;
