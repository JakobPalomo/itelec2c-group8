import "../../styles/Search.css";
import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import TuneIcon from "@mui/icons-material/Tune";
import DelayedTooltip from "../ui/DelayedTooltip";
import img1 from "./img1.jpg";
import img2 from "./img2.jpg";
import img3 from "./img3.jpg";
import img4 from "./img4.png";

function Search({ searchTerm, setSearchTerm, setFilterSearchModal }) {
  const images = [img1, img2, img3, img4];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [previousImageIndex, setPreviousImageIndex] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPreviousImageIndex(currentImageIndex);
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      setIsTransitioning(true);
    }, 7000);

    return () => clearInterval(interval);
  }, [currentImageIndex, images.length]);

  useEffect(() => {
    if (isTransitioning) {
      const timeout = setTimeout(() => {
        setIsTransitioning(false);
        setPreviousImageIndex(null);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [isTransitioning]);

  return (
    <div className="bg">
      {previousImageIndex !== null && (
        <img
          src={images[previousImageIndex]}
          alt="background"
          style={{ animationName: "slideOut" }}
        />
      )}
      <img
        src={images[currentImageIndex]}
        alt="background"
        style={{ animationName: isTransitioning ? "slideIn" : "none" }}
      />
      <div className="center">
        <div className="search">
          <div className="title">Search and Rate markets now!</div>
          <div className="searchRow">
            <div className="relative">
              <input
                className="searchBar"
                placeholder="Search for Palengke in your area..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <IconButton
                size="small"
                className="muiFilterIconButton"
                onClick={() => setFilterSearchModal(true)}
              >
                <DelayedTooltip
                  title="Filter Search"
                  delay={1000}
                  open={tooltipOpen}
                  setOpen={setTooltipOpen}
                >
                  <TuneIcon />
                </DelayedTooltip>
              </IconButton>
            </div>
            <Button
              variant="contained"
              className="searchButton pinkButton"
              style={{ textTransform: "none" }}
            >
              Search Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
