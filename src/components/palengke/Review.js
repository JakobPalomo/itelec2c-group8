import React, { useState, useEffect } from "react";
import HalfRating from "./HalfRating.js";
import "../../styles/Palengke.css";
import "../../styles/PalengkeList.css";
import Avatar from "@mui/material/Avatar";
import { shadows } from "@mui/system";
import NoPhotographyIcon from "@mui/icons-material/NoPhotography";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import FmdGoodRoundedIcon from "@mui/icons-material/FmdGoodRounded";
import CircleIcon from "@mui/icons-material/Circle";
import RippleButton from "../ui/RippleButton.js";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Typography, IconButton, Menu, MenuItem } from "@mui/material";
import TextField from "@mui/material/TextField";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditIcon from "@mui/icons-material/Edit";
import ReportIcon from "@mui/icons-material/Report";
import { stringAvatar, stringToColor } from "../../functions/utils.js";
import { styled } from "@mui/system";

const CustomMenuItem = styled(MenuItem)(({ theme }) => ({
  "&:hover": {
    backgroundColor: "#FFE6E0",
    "& .pinkLinkp": {
      fontWeight: "700 !important",
    },
  },
  "&.Mui-selected": {
    backgroundColor: "#FFE6E0",
  },

  padding: "10px 15px 10px 15px",
  width: "120px",
}));

function Review({
  key,
  index,
  editable,
  setOpen = () => {},
  setDeleteClicked,
  setReportReviewClicked,
  setIsEditing,
  setDefaultValues,
  review,
  accountPage = false,
  ...sharedProps
}) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getUsername = (userId) => {
    console.log("getting username");
    if (userId && sharedProps.userList.length !== 0) {
      const user = sharedProps.userList.find((user) => user.id === userId);
      if (user) {
        console.log("username", user.username);
        return user.username;
      }
      return "Deleted User";
    }
  };

  const getReviewUserProfilePic = (userId) => {
    if (userId && sharedProps.userList.length !== 0) {
      const user = sharedProps.userList.find((user) => user.id === userId);
      if (user) {
        const mediaId = user.profile;
        const media = sharedProps.mediaList.find(
          (media) => media.id === mediaId
        );
        if (media) {
          return media.path;
        }
      }
    }
  };

  const getPalengkeName = (palengkeId) => {
    const palengke = sharedProps.palengkeList.find(
      (palengke) => palengke.id === palengkeId
    );
    if (palengke) {
      return palengke.name;
    }
    return "";
  };

  const isEmptyObject = (obj) => {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  };

  useEffect(() => {
    console.log(`editable ${review.review}`, editable);
  }, [editable]);

  return (
    <div className="Reviews">
      {review.edited_date !== "" ? (
        <p style={{ textAlign: "left" }}>
          {review.edited_date}
          <span className="editedSpan">edited</span>
        </p>
      ) : (
        <p style={{ textAlign: "left" }}>{review.date}</p>
      )}
      {accountPage === true && (
        <p className="palengekeNameReview">
          Review for {getPalengkeName(review.palengke_id)}
        </p>
      )}
      {accountPage === false &&
        isEmptyObject(sharedProps.currUser) === false && (
          <div>
            <div className="edit">
              <IconButton className="menuEdit" onClick={handleClick}>
                <MoreHorizIcon style={{ color: "#fd7335" }} />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                MenuListProps={{
                  style: {
                    padding: 0,
                  },
                }}
                transformOrigin={{
                  horizontal: "right",
                }}
                sx={{
                  "& .MuiPaper-root": {
                    boxShadow: "unset",
                    border: "1px solid #d6d6d6",
                  },
                  transform: "translate(50px, 0)",
                }}
              >
                {editable === true && (
                  <>
                    <CustomMenuItem
                      onClick={() => {
                        handleClose();
                        setIsEditing(true);
                        setOpen(true);
                        setDefaultValues(review);
                      }}
                    >
                      <EditIcon className="muiIconReview" />
                      <Typography textAlign="center" className="pinkLinkp">
                        Edit
                      </Typography>
                    </CustomMenuItem>
                    <CustomMenuItem
                      onClick={() => {
                        handleClose();
                        setDeleteClicked(true);
                        setDefaultValues(review);
                      }}
                    >
                      <DeleteIcon className="muiIconReview" />
                      <Typography textAlign="center" className="pinkLinkp">
                        Delete
                      </Typography>
                    </CustomMenuItem>
                  </>
                )}
                <CustomMenuItem
                  onClick={() => {
                    handleClose();
                    setReportReviewClicked(true);
                    setDefaultValues(review);
                  }}
                >
                  <ReportIcon className="muiIconReview" />
                  <Typography textAlign="center" className="pinkLinkp">
                    Report
                  </Typography>
                </CustomMenuItem>
              </Menu>
            </div>
          </div>
        )}
      <HalfRating defaultValue={review.rating} disabled={true} />
      {/* Rating display section */}
      <div>{/* Your rating display code goes here */}</div>
      <div className="profileAndUsername">
        <Avatar
          {...(getUsername(review.user_id) &&
            stringAvatar(getUsername(review.user_id)))}
          className="poppins"
          src={getReviewUserProfilePic(review.user_id)}
        />
        <span className="name overflow-wrap">
          {getUsername(review.user_id)}
        </span>
      </div>
      <p className="overflow-wrap" style={{ textAlign: "left" }}>
        {review.review}
      </p>
      {/* Dropdown menu for editing and deleting comments */}
    </div>
  );
}

export default Review;
