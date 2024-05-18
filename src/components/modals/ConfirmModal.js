import Modal from "../modals/MyModal";
import Button from "@mui/material/Button";
import WarningIcon from "@mui/icons-material/Warning";
import ErrorIcon from "@mui/icons-material/Error";

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
  icon = <WarningIcon className="muiWarningIcon" />,
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
        {noIcon === false && icon}
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
            if (context === "deleteMedia" || context === "addPalengke") {
              confirmYes();
              setOpenPrevModal(false);
            } else if (
              context === "addMedia" ||
              context === "changePassNoEmail"
            ) {
              setOpen(false);
              confirmYes(true);
            } else if (context === "verifyOTP") {
              confirmYes(true);
            } else {
              //register, selectLocation, deleteReview, editProfile, deleteAccount, changePassFromForgotPass
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
            } else if (
              context === "addMedia" ||
              context === "changePassNoEmail"
            ) {
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
