import React from "react";
import "../../styles/Modal.css";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { Button, Grid } from "@mui/material";
import WarningIcon from '@mui/icons-material/Warning'; 

function DeleteAccount({ children, title = "", open, onClose, onConfirmDelete, onCancelDelete }) {
  return (
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
                {title}
              </Typography>
            </div>
          </div>
          <div className="modalBody">
          <div className="muiWarningIconButton">
            <WarningIcon style={{ fontSize: '120px' }} /></div>
            <Typography style={{ textAlign: 'center', paddingBottom: '40px', paddingTop: '10px',}}> Are you sure you want to delete your account?</Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Button
                  fullWidth
                  variant="contained"
                  style={{ backgroundColor: "#2C2329", color: "#FFFFFF" }}
                  onClick={onConfirmDelete}
                >
                  Confirm
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button 
                fullWidth variant="outlined" 
                onClick={onCancelDelete}
                style={{
                    backgroundColor: "#FFFFFF",
                    color: "#FF6262",
                    borderColor: "#FF6262"
                  }}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </div>
        </Box>
      </Fade>
    </Modal>
  );
}

export default DeleteAccount;
