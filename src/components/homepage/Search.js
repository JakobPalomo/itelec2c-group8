import "../../styles/Search.css";
import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import TuneIcon from "@mui/icons-material/Tune";
import DelayedTooltip from "../ui/DelayedTooltip";

function Search() {
  return (
    <div className="bg">
      <div className="center">
        <div className="search">
          <div className="title">Search and Rate markets now!</div>
          <div className="searchRow">
            <div className="relative">
              <input
                className="searchBar"
                placeholder="Search for Palengke in your area..."
              />

              <IconButton size="small" className="muiFilterIconButton">
                <DelayedTooltip title="Filter Search" delay={1000}>
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
