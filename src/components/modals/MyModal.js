import "../../styles/Modal.css";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DelayedTooltip from "../ui/DelayedTooltip";
import CloseIcon from "@mui/icons-material/Close";

function MyModal({
  children,
  title = "",
  open,
  setOpen,
  className = "",
  modalHeight = "unset",
}) {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={() => setOpen(false)}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box
          className={`modalContainer ${className}`}
          sx={{ height: `${modalHeight} !important` }}
        >
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
              <IconButton
                size="small"
                className="muiCloseIconButton"
                onClick={() => setOpen(false)}
              >
                <DelayedTooltip title="Close" delay={1000}>
                  <CloseIcon className="muiCloseIcon" />
                </DelayedTooltip>
              </IconButton>
            </div>
          </div>
          <div className="modalBody">{children}</div>
        </Box>
      </Fade>
    </Modal>
  );
}

export default MyModal;
