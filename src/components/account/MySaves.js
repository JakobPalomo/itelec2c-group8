import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import "../../styles/MyContributions.css";
import "../../styles/Account.css";
import PalengkeItem from "../homepage/PalengkeItem";
import Modal from "../modals/MyModal";
import ConfirmModal from "../modals/ConfirmModal";
import AddPalengke from "../modals/AddPalengke";
import EditMedia from "../modals/EditMedia";
import IconButton from "@mui/material/IconButton";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function MySaves({ ...sharedProps }) {
  const [saveClicked, setSaveClicked] = useState(false);

  useEffect(() => {
    console.log("saveClicked", saveClicked);
    sharedProps.getUserSaves();
  }, [saveClicked]);

  const handleBackClick = () => {
    window.history.back();
  };

  const handleSave = async (palengkeId) => {
    // Remove from DB
    const formData = new FormData();
    formData.append("user_id", sharedProps.currUser.id);
    formData.append("palengke_id", palengkeId);

    try {
      const response = await fetch(`/palengke/remove_save`, {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to remove save");
      }
      setSaveClicked((prev) => !prev);
    } catch (error) {
      console.error("Error removing save:", error);
    }

    sharedProps.getUserSaves();
  };

  return (
    <>
      <div className="contributions">
        <div className="relative headerTitleAccount">
          <IconButton
            onClick={handleBackClick}
            style={{
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
            }}
            className="backButton"
          >
            <ArrowBackIcon style={{ color: " #ff6262" }} />
          </IconButton>
          <h1 className="titleAccount">My Saves</h1>
        </div>
        <center>
          {sharedProps.userSaves.map((palengke) => (
            <div className="relative myContriMargin" key={palengke.id}>
              <Link
                to={`/palengke/${palengke.id}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                <PalengkeItem
                  palengke={palengke}
                  type={"45%"}
                  min={"60%"}
                  marg={"0"}
                  mediaList={sharedProps.mediaList}
                  {...sharedProps}
                />
              </Link>

              <div className="editDeleteIcons">
                <IconButton
                  className="deleteIcon"
                  onClick={() => {
                    handleSave(palengke.id);
                  }}
                >
                  <BookmarkIcon className="muiEditIcons" />
                </IconButton>
              </div>
            </div>
          ))}
        </center>
      </div>
    </>
  );
}

export default MySaves;
