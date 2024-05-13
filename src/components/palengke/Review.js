import "../../styles/Palengke.css";
import HalfRating from "./HalfRating.js";
import React, { useState, useEffect } from "react";
import "../../styles/PalengkeList.css";
import NoPhotographyIcon from "@mui/icons-material/NoPhotography";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import FmdGoodRoundedIcon from "@mui/icons-material/FmdGoodRounded";
import CircleIcon from "@mui/icons-material/Circle";
import RippleButton from "../ui/RippleButton.js";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Menu, MenuItem } from "@mui/material";
import TextField from "@mui/material/TextField";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

function Review({
  key,
  index,
  editable,
  setOpen,
  setDeleteClicked,
  setIsEditing,
  setDefaultValues,
  review,
  username,
}) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="Reviews">
      <div>
        <p>{review.date}</p>{" "}
        <div className="edit">
          <Button onClick={handleClick}>
            <MoreHorizIcon style={{ color: "#fd7335" }} />
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem
              onClick={() => {
                handleClose();
                setIsEditing(true);
                setOpen(true);
                setDefaultValues(review);
              }}
            >
              Edit
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
                setDeleteClicked(true);
                setDefaultValues(review);
              }}
            >
              Delete
            </MenuItem>
          </Menu>
        </div>
      </div>
      <HalfRating defaultValue={review.rating} disabled={true} />
      {/* Rating display section */}
      <div>{/* Your rating display code goes here */}</div>
      <p className="name">{username}</p>
      <p>{review.review}</p>
      {/* Dropdown menu for editing and deleting comments */}
    </div>
  );
}

export default Review;
