import React, { useState } from "react";
import media_types from "../../data/media_types.js";
import Box from "@mui/material/Box";
import HideImageIcon from "@mui/icons-material/HideImage";

const getMediaType = (foundMedia) => {
  //find the media type of palengke.media[0]
  const typeObject = media_types.find(
    (type) => type.media_type_id === foundMedia.type
  );
  if (typeObject) {
    console.log("type", typeObject.name);
    return typeObject.name;
  }
};

const PalengkeMediaDisplay = ({ media }) => {
  const [imageError, setImageError] = useState(false);

  const mediaType = getMediaType(media[0]);

  if (mediaType === "image") {
    return (
      <Box
        component="img"
        sx={{
          height: 400,
          display: imageError ? "none" : "block",
          objectFit: "cover",
          overflow: "hidden",
          width: "100%",
        }}
        src={media[0].path}
        alt={media[0].filename}
        onError={() => setImageError(true)}
        className="palengkeImage"
      />
    );
  }

  if (mediaType === "link") {
    return (
      <Box
        component="img"
        sx={{
          height: 400,
          display: imageError ? "none" : "block",
          objectFit: "cover",
          overflow: "hidden",
          width: "100%",
        }}
        src={media[0].link}
        alt={media[0].filename}
        onError={() => setImageError(true)}
        className="palengkeImage"
      />
    );
  }

  if (mediaType === "video") {
    return (
      <video
        className="palengkeImage"
        autoPlay
        style={{
          height: 400,
          display: "block",
          overflow: "hidden",
          width: "100%",
        }}
        controls
      >
        <source src={media[0].path} className="palengkeImage" />
        Your browser does not support the video tag.
      </video>
    );
  }

  return (
    <div className="noImageContainer">
      <HideImageIcon className="muiNoImageIcon" />
      Broken or Unsupported Media
    </div>
  );
};

export default PalengkeMediaDisplay;
