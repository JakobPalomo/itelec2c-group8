import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../../styles/Profile.css";
import { Avatar, IconButton, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import PlaceIcon from "@mui/icons-material/Place";
import EditProfile from "./EditProfile";
import { styled } from "@mui/material/styles";
import { stringAvatar, stringToColor } from "../../functions/utils.js";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function Profile({
  isEditProfileOpen,
  setIsEditProfileOpen,
  profile,
  setProfile,
  ...sharedProps
}) {
  const fileUploadRef = useRef(null);

  const getAddress = () => {
    if (
      sharedProps.currUser.district ||
      sharedProps.currUser.city ||
      sharedProps.currUser.region
    ) {
      let address = "";
      if (sharedProps.currUser.district) {
        if (address != "") {
          address.concat(", ");
        }
        address.concat(sharedProps.currUser.district);
      }
      if (sharedProps.currUser.city) {
        if (address != "") {
          address.concat(", ");
        }
        address.concat(sharedProps.currUser.city);
      }
      if (sharedProps.currUser.region) {
        if (address != "") {
          address.concat(", ");
        }
        address.concat(sharedProps.currUser.region);
      }
      return `${sharedProps.currUser.district}, ${sharedProps.currUser.city}, ${sharedProps.currUser.region}`;
    }
    return "";
  };

  const handleFileUploadClick = () => {
    if (fileUploadRef.current) {
      fileUploadRef.current.click();
    }
  };
  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    setProfile(file);
  };

  useEffect(() => {
    console.log("isEditProfileOpen");
    console.log(isEditProfileOpen);
  }, [isEditProfileOpen]);

  const getProfileSrc = () => {
    if (profile) {
      return `${URL.createObjectURL(profile)}`;
    } else if (sharedProps.userProfilePic.path) {
      return sharedProps.userProfilePic.path;
    } else {
      return "";
    }
  };

  return (
    <div className="profile">
      <div className="cover" />
      <div className="profcontent">
        <div className="pfp">
          <div className="relative profilepic">
            <Avatar
              {...(sharedProps.currUser.username &&
                stringAvatar(sharedProps.currUser.username))}
              className="avatar"
              alt="Aliah"
              src={getProfileSrc()} ///assets/pfp.jpg
            />
            {isEditProfileOpen === true && (
              <>
                <VisuallyHiddenInput
                  type="file"
                  ref={fileUploadRef}
                  accept="image/*"
                  onChange={handleFileInputChange}
                />
                <IconButton
                  className="profbutton"
                  onClick={handleFileUploadClick}
                >
                  <EditIcon />
                </IconButton>
              </>
            )}
          </div>
          <div className="pfpinfo">
            <h1>{sharedProps.currUser?.username}</h1>
            {(sharedProps.currUser.district ||
              sharedProps.currUser.city ||
              sharedProps.currUser.region) && (
              <div>
                <PlaceIcon sx={{ fontSize: "30px" }} />
                <h2>{getAddress()}</h2>
              </div>
            )}
          </div>
        </div>
        {/* setIsEditProfileOpen(false); */}
        {isEditProfileOpen === false ? (
          <div
            className="editButtonCont"
            onClick={() => setIsEditProfileOpen(true)}
          >
            <Link
              to={`/account/edit-profile`}
              style={{
                textDecoration: "none",
              }}
            >
              <Button className="editbutton">Edit Profile</Button>
            </Link>
          </div>
        ) : (
          <div
            className="editButtonCont"
            onClick={() => setIsEditProfileOpen(false)}
          >
            <Link
              to={`/account`}
              style={{
                textDecoration: "none",
              }}
            >
              <Button className="editbutton" onClick={() => setProfile()}>
                Cancel Edit
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
