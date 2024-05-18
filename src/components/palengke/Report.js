import React, { useState, useEffect } from "react";
import Modal from "../modals/MyModal";
import ReportModal from "../modals/ReportModal";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ReportIcon from "@mui/icons-material/Report";
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
  // width: "120px",
}));

export default function Report({ palengkeId, ...sharedProps }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [saved, setSaved] = useState(false);
  const [openReportModal, setOpenReportModal] = useState(false);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const isPalengkeSaved = () => {
    console.log(
      "isPalengkeSaved",
      sharedProps.userSaves.find((save) => save.id === palengkeId)
    );
    return sharedProps.userSaves.find((save) => save.id === palengkeId);
  };

  useEffect(() => {
    // setSaved(isPalengkeSaved());
  }, []);

  const handleSave = async () => {
    if (saved === false) {
      // Add to DB
      const formData = new FormData();
      formData.append("user_id", sharedProps.currUser.id);
      formData.append("palengke_id", palengkeId);

      try {
        const response = await fetch(`/palengke/add_save`, {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Failed to save palengke");
        }
        setSaved(true);
      } catch (error) {
        console.error("Error saving palengke:", error);
      }
    } else {
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
        setSaved(false);
      } catch (error) {
        console.error("Error removing save:", error);
      }
    }
    sharedProps.getUserSaves();
  };

  return (
    <>
      {openReportModal && (
        <Modal
          open={openReportModal}
          setOpen={setOpenReportModal}
          title="Report Palengke"
        >
          <ReportModal
            setOpen={setOpenReportModal}
            IdToReport={palengkeId}
            reportCategory="palengke"
            userId={sharedProps.currUser.id}
          />
        </Modal>
      )}
      <div>
        <IconButton
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          style={{ color: "#FF6262", fontSize: "46px" }}
        >
          <MoreHorizIcon />
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
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
          <CustomMenuItem
            onClick={() => {
              handleClose();
              handleSave();
            }}
          >
            {saved === false ? (
              <BookmarkIcon className="muiIconReview" />
            ) : (
              <BookmarkBorderIcon className="muiIconReview" />
            )}
            <Typography textAlign="center" className="pinkLinkp">
              {saved === false ? "Save" : "Unsave"}
            </Typography>
          </CustomMenuItem>
          <CustomMenuItem
            onClick={() => {
              handleClose();
              setOpenReportModal(true);
            }}
          >
            <ReportIcon className="muiIconReview" />
            <Typography textAlign="center" className="pinkLinkp">
              Report
            </Typography>
          </CustomMenuItem>
        </Menu>
      </div>
    </>
  );
}
