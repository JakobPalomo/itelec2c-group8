import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styles/Profile.css";
import { Avatar, IconButton, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import PlaceIcon from "@mui/icons-material/Place";
import EditProfile from "./EditProfile";

export default function Profile({ isEditProfileOpen, setIsEditProfileOpen }) {
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

  function stringAvatar(name) {
    return {
      sx: {
        backgroundColor: `${stringToColor(name)} !important`,
        width: 200,
        height: 200,
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }

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
              {...stringAvatar("Ira Rayzel Ji")}
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
            <h1>ALIAH ESTEBAN MAASIM</h1>
            <div>
              <PlaceIcon sx={{ fontSize: "30px" }} />
              <h2>Pasig Palengke, 258 Dr. Pilapil St., Pasig</h2>
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
