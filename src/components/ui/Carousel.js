import React, { useState } from "react";
import media_types from "../../data/media_types.js";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
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
    <Box sx={{ maxWidth: 400, flexGrow: 1 }}>
      <AutoPlaySwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {media.map((step, index) => (
          <div key={step.label}>
            {Math.abs(activeStep - index) <= 2 ? (
              getMediaType(step) === "image" ? (
                <Box
                  component="img"
                  sx={{
                    height: 255,
                    display: "block",
                    maxWidth: 400,
                    overflow: "hidden",
                    width: "100%",
                  }}
                  src={step.path}
                  alt={step.filename}
                  className="palengkeImage"
                />
              ) : (
                <video
                  className="palengkeImage"
                  autoPlay
                  style={{
                    height: 255,
                    display: "block",
                    maxWidth: 400,
                    overflow: "hidden",
                    width: "100%",
                  }}
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
              ""
            )}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
          </Button>
        }
      />
    </Box>
  );
}

export default Carousel;
