import React, { useState } from "react";
import "../../styles/Modal.css";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DelayedTooltip from "../ui/DelayedTooltip";
import CloseIcon from "@mui/icons-material/Close";
import { TextField, Button, Avatar, Grid } from "@mui/material";
import DeleteAccount from "./DeleteAccount";

function EditProfile({ open, onClose }) {
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);

  const onDeleteAccount = () => {
    setConfirmationModalOpen(true); // Open the DeleteAccount modal
  };

  const onConfirmDelete = () => {
    // Delete account logic goes here
    console.log("Account deleted");
    setConfirmationModalOpen(false); // Close the DeleteAccount modal
    onClose();
  };

  const onCancelDelete = () => {
    setConfirmationModalOpen(false); // Close the DeleteAccount modal
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={onClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box className="modalContainer">
            <div className="fixedModalHeader">
              <div className="modalHeader">
                <Typography
                  id="transition-modal-title"
                  variant="h6"
                  component="h2"
                  className="modalTitle"
                >
                  Edit Profile
                </Typography>
                <IconButton
                  size="small"
                  className="muiCloseIconButton"
                  onClick={onClose}
                >
                  <DelayedTooltip title="Close" delay={1000}>
                    <CloseIcon className="muiCloseIcon" />
                  </DelayedTooltip>
                </IconButton>
              </div>
            </div>
            <div className="modalBody">
              <Grid container spacing={2} alignItems="center">
                {/* Profile editing fields */}
                <Grid item xs={12}>
                  <div className="cover" />
                </Grid>
                <Grid item xs={12}>
                  <div
                    className="profile"
                    style={{
                      position: "relative",
                      textAlign: "center",
                      marginBottom: "20px",
                    }}
                  >
                    <Avatar
                      className="avatar"
                      alt="Aliah"
                      src="/assets/pfp.jpg"
                      sx={{ width: 150, height: 150 }}
                    />
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <div className="squish"></div>
                  <TextField
                    fullWidth
                    variant="outlined"
                    style={{ border: "none", borderColor: "none" }}
                    label="Username"
                    defaultValue="ALIAH ESTEBAN MAASIM"
                    InputProps={{
                      style: { borderRadius: "20px" },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    style={{ border: "none" }}
                    label="Location"
                    defaultValue="Pasig Palengke, 258 Dr. Pilapil St., Pasig"
                    InputProps={{
                      style: { borderRadius: "20px" },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="New Password"
                    type="password"
                    InputProps={{
                      style: { borderRadius: "20px" },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Confirm New Password"
                    type="password"
                    InputProps={{
                      style: { borderRadius: "20px" },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    fullWidth
                    variant="contained"
                    style={{ backgroundColor: "#2C2329", color: "#FFFFFF" }}
                    onClick={onDeleteAccount}
                  >
                    Delete Account
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    fullWidth
                    style={{ backgroundColor: "#FF6262", color: "#FFFFFF" }}
                    onClick={onDeleteAccount}
                  >
                    Save Changes
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    fullWidth
                    variant="outlined"
                    style={{
                      backgroundColor: "#FFFFFF",
                      color: "#FF6262",
                      borderColor: "#FF6262",
                    }}
                    onClick={onClose}
                  >
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </div>
            <DeleteAccount
              open={confirmationModalOpen}
              onClose={onCancelDelete}
              onConfirmDelete={onConfirmDelete}
              onCancelDelete={onCancelDelete}
            />
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default EditProfile;
