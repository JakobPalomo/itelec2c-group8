import React, { useState } from "react";
import "../../styles/Profile.css";
import { Avatar, IconButton, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import PlaceIcon from "@mui/icons-material/Place";
import EditProfile from "../modals/EditProfile"; // Import the EditProfile modal

export default function Profile({ setEditProfileClicked }) {
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false); // State for controlling the visibility of EditProfile modal
  const handleEditProfileOpen = () => {
    setIsEditProfileOpen(true); // Open the EditProfile modal when the edit button is clicked
  };
  const handleEditProfileClose = () => {
    setIsEditProfileOpen(false); // Close the EditProfile modal
  };

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
            <IconButton className="profbutton">
              <EditIcon />
            </IconButton>
          </div>
          <div className="pfpinfo">
            <h1>ALIAH ESTEBAN MAASIM</h1>
            <div>
              <PlaceIcon sx={{ fontSize: "30px" }} />
              <h2>Pasig Palengke, 258 Dr. Pilapil St., Pasig</h2>
            </div>
          </div>
        </div>
        <div
          className="editButtonCont"
          onClick={() => setIsEditProfileOpen(true)}
        >
          <Button className="editbutton">Edit Profile</Button>
        </div>
      </div>
      {/* Render the EditProfile modal conditionally based on isEditProfileOpen state */}
      <EditProfile
        open={isEditProfileOpen}
        setOpen={setIsEditProfileOpen}
        onClose={handleEditProfileClose}
      />
    </div>
  );
}
