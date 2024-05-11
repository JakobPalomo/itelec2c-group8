import React, { useState } from "react";
import "../../styles/Profile.css";
import { Avatar, IconButton, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import PlaceIcon from "@mui/icons-material/Place";
import EditProfile from "../modals/EditProfile"; // Import the EditProfile modal

export default function Profile() {
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false); // State for controlling the visibility of EditProfile modal
  const handleEditProfileOpen = () => {
    setIsEditProfileOpen(true); // Open the EditProfile modal when the edit button is clicked
  };
  const handleEditProfileClose = () => {
    setIsEditProfileOpen(false); // Close the EditProfile modal
  };

  return (
    <div className="profile">
      <div className="cover" />
      <div className="profcontent">
        <div className="pfp">
          <Avatar
            className="avatar"
            alt="Aliah"
            src="/assets/pfp.jpg"
            sx={{ width: 250, height: 250 }}
          />
          <div className="pfpinfo">
            <h1>ALIAH ESTEBAN MAASIM</h1>
            <h2>
              <PlaceIcon sx={{ fontSize: "30px" }} />
              Pasig Palengke, 258 Dr. Pilapil St., Pasig
            </h2>
          </div>
        </div>
        <Button className="editbutton" onClick={handleEditProfileOpen}>
          Edit Profile
        </Button>
      </div>
      {/* Render the EditProfile modal conditionally based on isEditProfileOpen state */}
      <EditProfile open={isEditProfileOpen} setOpen={setIsEditProfileOpen} onClose={handleEditProfileClose} />
    </div>
  );
}

