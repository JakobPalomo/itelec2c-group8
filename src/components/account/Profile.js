import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styles/Profile.css";
import { Avatar, IconButton, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import PlaceIcon from "@mui/icons-material/Place";

export default function Profile({
  isEditProfileOpen,
  setIsEditProfileOpen,
  ...sharedProps
}) {
  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */
    console.log("color");
    console.log(color);
    return color;
  }

  function stringAvatar(passedname) {
    let name = "";
    if (passedname == "undefined" || passedname == "null") {
      name = "P";
    } else {
      name = passedname;
    }

    const nameParts = name.split(" ");
    const initials =
      nameParts.length > 1
        ? `${nameParts[0][0]}${nameParts[1][0]}`
        : `${nameParts[0][0]}`;

    return {
      sx: {
        backgroundColor: `${stringToColor(name)} !important`,
      },
      children: initials,
    };
  }

  const getAddress = () => {
    if (sharedProps.currUser) {
      return `${sharedProps.currUser.district}, ${sharedProps.currUser.city}, ${sharedProps.currUser.region}`;
    }
    return "";
  };

  useEffect(() => {
    console.log("isEditProfileOpen");
    console.log(isEditProfileOpen);
  }, [isEditProfileOpen]);

  return (
    <div className="profile">
      <div className="cover" />
      <div className="profcontent">
        <div className="pfp">
          <div className="relative profilepic">
            <Avatar
              {...(sharedProps.currUser.username &&
                stringAvatar(sharedProps.currUser.username))}
              sx={{ bgcolor: "#B92F37" }}
              className="avatar"
              alt="Aliah"
              src="" ///assets/pfp.jpg
            />
            {isEditProfileOpen === true && (
              <IconButton className="profbutton">
                <EditIcon />
              </IconButton>
            )}
          </div>
          <div className="pfpinfo">
            <h1>{sharedProps.currUser?.username}</h1>
            <div>
              <PlaceIcon sx={{ fontSize: "30px" }} />
              <h2>{getAddress()}</h2>
            </div>
          </div>
        </div>
        {isEditProfileOpen === false && (
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
        )}
      </div>
    </div>
  );
}
