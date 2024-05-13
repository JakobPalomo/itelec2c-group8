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
  noIcon = false,
  parentSize = false,
  prevModalHeight = "unset",
  defaultValues,
  children,
}) {
  return (
    <Modal
      title={title}
      open={open}
      setOpen={setOpen}
      className={parentSize === false ? "confirmModalContainer" : ""}
      modalHeight={prevModalHeight}
    >
      <div className="confirmModalCont">
        {noIcon === false && <WarningIcon className="muiWarningIcon" />}
        {/* {parentSize === true && <div style={{ height: "25px" }}></div>} */}
        {children}
      </div>
      <div
        className={
          parentSize === false
            ? "confirmModalButtonCont"
            : "confirmModalButtonCont confirmModalButtonContMargin"
        }
      >
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
            } else if (context === "addPalengke") {
              confirmYes();
              setOpenPrevModal(false);
            } else if (context === "register") {
              confirmYes();
            } else if (context === "selectLocation") {
              confirmYes();
            } else if (context === "deleteReview") {
              confirmYes();
            }
          }}
        >
          {yesText}
        </Button>
        <Button
          variant="outlined"
          className="outlinedButton outlinedPinkButton mediaButtonMargin deleteMediaButton"
          style={{ textTransform: "none" }}
          onClick={() => {
            setOpen(false);
            if (context === "deleteMedia") {
            } else if (context === "addMedia") {
              confirmYes(false);
            } else if (context === "addPalengke") {
            } else if (context === "selectLocation") {
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
