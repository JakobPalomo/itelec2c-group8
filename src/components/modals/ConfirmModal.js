import Modal from "../modals/MyModal";
import Button from "@mui/material/Button";
import WarningIcon from "@mui/icons-material/Warning";

function ConfirmModal({
  title = "",
  open,
  setOpen,
  setOpenPrevModal,
  type = "",
  filename = "",
  confirmYes,
  context = "",
  yesText = "Yes",
  noText = "No",
  children,
}) {
  return (
    <Modal
      title={title}
      open={open}
      setOpen={setOpen}
      className="confirmModalContainer"
    >
      <div className="confirmModalCont">
        <WarningIcon className="muiWarningIcon" />
        {children}
      </div>
      <div className="confirmModalButtonCont">
        <Button
          variant="contained"
          className="button pinkButton mediaButtonMargin deleteMediaButton"
          style={{ textTransform: "none" }}
          onClick={() => {
            if (context === "deleteMedia") {
              confirmYes();
              setOpenPrevModal(false);
            } else if (context === "addMedia") {
              setOpen(false);
              confirmYes(true);
            }
          }}
        >
          {yesText}
        </Button>
        <Button
          variant="outlined"
          className="outlinedBbutton outlinedPinkButton mediaButtonMargin deleteMediaButton"
          style={{ textTransform: "none" }}
          onClick={() => {
            if (context === "deleteMedia") {
              setOpen(false);
            } else if (context === "addMedia") {
              setOpen(false);
              confirmYes(false);
            }
          }}
        >
          {noText}
        </Button>
      </div>
    </Modal>
  );
}

export default ConfirmModal;
