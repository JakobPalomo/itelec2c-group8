import "../../styles/Palengke.css";
import HalfRating from "./HalfRating.js";
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

function Review({ palengke, mediaType, prev }) {
  const [media, setMedia] = useState("");
  return (
    <div className="Reviews">
      {prev && (
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
        </div>
      )}

      <p>Jan 20, 2024</p>
      <div>
        <HalfRating />
      </div>
      <p className="name">Aliah Esteban</p>
      <p>
        Working at Sam.AI has been an incredible journey so far. The technology
        we're building is truly cutting-edge, and being a part of a team that's
        revolutionizing how people achieve their goals is immensely fulfilling.{" "}
      </p>
    </div>
  );
}

export default Review;
