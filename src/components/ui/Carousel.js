import React, { useState } from "react";
import media_types from "../../data/media_types.js";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import NoPhotographyIcon from "@mui/icons-material/NoPhotography";
import HideImageIcon from "@mui/icons-material/HideImage";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
  {
    filename: "San Francisco – Oakland Bay Bridge, United States",
    type: "image",
    path: "https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60",
  },
  {
    filename: "Bird",
    type: "image",
    path: "https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60",
  },
  {
    filename: "Bali, Indonesia",
    type: "image",
    path: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250",
  },
  {
    filename: "Goč, Serbia",
    type: "image",
    path: "https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60",
  },
  {
    filename: "Sample Video",
    type: "video",
    path: "https://www.sample-videos.com/video123/mp4/720/big_buck_bunny_720p_20mb.mp4",
  },
];

function Carousel({ media = images }) {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [mediaType, setMediaType] = useState("");
  const maxSteps = media.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

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

  return (
    <Box
      sx={{
        flexGrow: 1,
        position: "relative",
        borderRadius: "8px",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
        overflow: "hidden",
        backgroundColor: "#d4d4d4",
        fontWeight: 600,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        overflowWrap: "anywhere",
        height: 400,
      }}
    >
      {media.length === 0 ? (
        <div className="noImageContainer">
          <NoPhotographyIcon className="muiNoImageIcon" />
          No Media Available
        </div>
      ) : media.length === 1 ? (
        <>
          {getMediaType(media[0]) === "image" ? (
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
          ) : (
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
          )}
          {imageError && (
            <div className="noImageContainer">
              <HideImageIcon className="muiNoImageIcon" />
              Broken or Unsupported Media
            </div>
          )}
        </>
      ) : (
        <AutoPlaySwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
        >
          {media.map((step, index) => (
            <div
              key={step.label}
              style={{ height: "100%", overflow: "hidden" }}
            >
              {Math.abs(activeStep - index) <= 2 ? (
                getMediaType(step) === "image" ||
                getMediaType(step) === "link" ? (
                  <>
                    <Box
                      component="img"
                      sx={{
                        height: 400,
                        display: imageError ? "none" : "block",
                        objectFit: "cover",
                        overflow: "hidden",
                        width: "100%",
                      }}
                      src={
                        getMediaType(step) === "image" ? step.path : step.link
                      }
                      alt={step.filename}
                      onError={() => setImageError(true)}
                      className="palengkeImage"
                    />
                    {imageError && (
                      <div
                        className="noImageContainer"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center", // Center horizontally
                          height: "90%",
                          overflow: "hidden",
                        }}
                      >
                        <HideImageIcon className="muiNoImageIcon" />
                        Broken or Unsupported Media
                      </div>
                    )}
                  </>
                ) : (
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
                    onError={() => setImageError(true)}
                  >
                    <source
                      src={step.path}
                      alt={step.filename}
                      className="palengkeImage"
                    />
                    Your browser does not support the video tag.
                  </video>
                )
              ) : (
                <div
                  className="noImageContainer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "90%",
                    overflow: "hidden",
                  }}
                >
                  <HideImageIcon className="muiNoImageIcon" />
                  Broken or Unsupported Media
                </div>
              )}
            </div>
          ))}
        </AutoPlaySwipeableViews>
      )}
      {media.length > 1 && (
        <MobileStepper
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          sx={{
            "& .MuiButtonBase-root": {
              color: "rgba(255, 140, 140,1)",
              filter: "drop-shadow(0 0px 5px rgba(0, 0, 0, 0.3))",
              margin: "10px 10px 5px 10px",
            },
            "& .Mui-disabled ": {
              color: "rgba(255,255,255,0.7) !important",
            },
            "& .Mui-disabled .iconContainer::before": {
              backgroundColor: "rgba(255, 140, 140,0.7) !important",
            },
            "& .MuiMobileStepper-dots": {
              backgroundColor: "rgba(255,255,255,0.8)",
              padding: "5px",
              borderRadius: "10px",
            },
            "& .MuiMobileStepper-dot": {
              filter: "drop-shadow(0 0px 4px rgba(0, 0, 0, 0.5))",
              height: "6px",
              width: "6px",
            },
            "& .MuiMobileStepper-dotActive": {
              backgroundColor: "rgba(255, 140, 140,1)",
            },
            position: "absolute",
            bottom: "0",
            width: "100%",
            padding: 0,
            display: "flex",
            backgroundColor: "transparent",
            backgroundImage:
              "linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0))",
          }}
          nextButton={
            <IconButton
              size="small"
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}
            >
              {theme.direction === "rtl" ? (
                <div className="iconContainer">
                  <ArrowDropDownCircleIcon className="carouselmuiLeftRightIcon rotateLeft" />
                </div>
              ) : (
                <div className="iconContainer">
                  <ArrowDropDownCircleIcon className="carouselmuiLeftRightIcon rotateRight" />
                </div>
              )}
            </IconButton>
          }
          backButton={
            <IconButton
              size="small"
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              {theme.direction === "rtl" ? (
                <div className="iconContainer">
                  <ArrowDropDownCircleIcon className="carouselmuiLeftRightIcon rotateRight" />
                </div>
              ) : (
                <div className="iconContainer">
                  <ArrowDropDownCircleIcon className="carouselmuiLeftRightIcon rotateLeft" />
                </div>
              )}
            </IconButton>
          }
        />
      )}
    </Box>
  );
}

export default Carousel;
