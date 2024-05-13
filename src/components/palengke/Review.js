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
  palengke,
  mediaType,
  prev,
  date,
  name,
  review,
  index,
  onEdit,
  onDelete,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState(review);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleEditClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setAnchorEl(null);
  };

  const handleSaveEdit = () => {
    onEdit(index, editedComment);
    setIsEditing(false);
  };

  const handleDeleteClick = () => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      onDelete(index);
    }
  };

  const handleCommentChange = (event) => {
    setEditedComment(event.target.value);
  };

  return (
    <div className="Reviews">
      <div>
        <p>{date}</p>{" "}
        <div className="edit">
          <Button onClick={handleEditClick}>
            <MoreHorizIcon style={{ color: "#fd7335" }} />
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleEdit}>Edit</MenuItem>
            <MenuItem onClick={handleDeleteClick}>Delete</MenuItem>
          </Menu>
          {isEditing && <Button onClick={handleSaveEdit}>Save</Button>}
        </div>
      </div>
      <HalfRating />
      {/* Rating display section */}
      <div>{/* Your rating display code goes here */}</div>
      <p className="name">{name}</p>
      {isEditing ? (
        <TextField
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          value={editedComment}
          onChange={handleCommentChange}
        />
      ) : (
        <p>{review}</p>
      )}

      {/* Dropdown menu for editing and deleting comments */}
    </div>
  );
}

export default Review;
