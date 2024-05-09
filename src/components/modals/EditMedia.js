import { useState, useEffect, useRef } from "react";
import UploadButton from "../ui/UploadButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import ConfirmModal from "./ConfirmModal";

function EditMedia({
  setOpenMediaModal,
  media,
  setSelectedFiles,
  indexToEdit,
}) {
  let file;
  if (
    indexToEdit !== null &&
    indexToEdit !== undefined &&
    media !== null &&
    media !== undefined
  ) {
    file = media[indexToEdit];
  }

  const fileUploadRef = useRef(null);

  const handleFileInputChange = (event) => {
    const files = event.target.files;
    const fileArray = Array.from(files);
    const newFile = fileArray[0];
    const updatedMedia = [...media];
    updatedMedia[indexToEdit] = newFile;
    setSelectedFiles(updatedMedia);
  };

  const [openConfirmModal, setOpenConfirmModal] = useState(false);

  const handleDelete = (event) => {
    const updatedMedia = media.filter((_, index) => index !== indexToEdit);
    setSelectedFiles(updatedMedia);
  };

  let media_type;
  if (file.type.startsWith("image/") === true) {
    media_type = "image";
  } else {
    media_type = "video";
  }

  return (
    <div>
      {openConfirmModal === true && (
        <ConfirmModal
          title="Confirm Delete"
          open={openConfirmModal}
          setOpen={setOpenConfirmModal}
          setOpenPrevModal={setOpenMediaModal}
          confirmYes={handleDelete}
          context="deleteMedia"
        >
          <div>
            Are you sure you want to delete this {media_type} named{" "}
            <strong>{file.name}</strong>?
          </div>
        </ConfirmModal>
      )}
      <div className="editMediaModalBody">
        {file.type.startsWith("image/") ? (
          <img
            srcSet={`${URL.createObjectURL(file)}`}
            src={`${URL.createObjectURL(file)}`}
            alt={file.name}
            loading="lazy"
            className="editMediaItem"
          />
        ) : (
          <video controls className="editMediaItem">
            <source src={URL.createObjectURL(file)} type={file.type} />
            Your browser does not support the video tag.
          </video>
        )}
      </div>
      <div className="editMediaButtonCont">
        <UploadButton
          className="uploadButton mediaButtonMargin"
          fileUploadRef={fileUploadRef}
          accept="image/*, video/*"
          onChange={handleFileInputChange}
          title="Edit"
          icon={<EditIcon />}
          marginTop="10px"
          marginLeft="10px"
          marginRight="10px"
          width="150px"
        />
        <Button
          variant="contained"
          className="button pinkButton mediaButtonMargin deleteMediaButton"
          style={{ textTransform: "none" }}
          onClick={() => {
            setOpenConfirmModal(true);
          }}
        >
          <DeleteIcon className="muiDeleteIcon" />
          Delete
        </Button>
      </div>
    </div>
  );
}

export default EditMedia;
