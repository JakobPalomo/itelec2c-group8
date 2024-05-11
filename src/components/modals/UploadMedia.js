import { useState, useEffect, useRef } from "react";
import UploadButton from "../ui/UploadButton";
import ImageGallery from "../ui/ImageGallery";
import ConfirmModal from "./ConfirmModal";
import Typography from "@mui/material/Typography";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";

function UploadMedia({
  setOpenModal = false,
  setSelectedFiles,
  selectedFiles,
  setIndexToEdit,
  hasError = false,
  errMessage = "",
}) {
  const fileUploadRef = useRef(null);

  const handleFileUploadClick = () => {
    if (fileUploadRef.current) {
      fileUploadRef.current.click();
    }
  };

  const handleFileInputChange = (event) => {
    const files = event.target.files;
    const fileArray = Array.from(files);
    setSelectedFiles(fileArray);
  };

  const [tempFilesArray, setTempFilesArray] = useState([]);
  const [openOptionModal, setOpenOptionModal] = useState(false);
  const [duplicateFileNames, setDuplicateFileNames] = useState([]);

  const handleFileInputAdd = (event) => {
    const files = event.target.files;
    const fileArray = Array.from(files);

    // Set tempFilesArray to fileArray
    setTempFilesArray(fileArray);

    // Check for duplicates and set duplicateFileNames
    let duplicateFileNames = [];
    fileArray.forEach((newFile) => {
      const existingIndex = selectedFiles.findIndex(
        (existingFile) => existingFile.name === newFile.name
      );
      if (existingIndex !== -1) {
        duplicateFileNames.push(newFile.name);
      }
    });
    if (duplicateFileNames.length > 0) {
      setDuplicateFileNames(duplicateFileNames);
      setOpenOptionModal(true);
      return;
    }

    // If no duplicates, update selectedFiles with tempFilesArray
    const updatedMedia = [...selectedFiles, ...fileArray];
    setSelectedFiles(updatedMedia);
  };

  const handleFileInputAddFinal = (replace) => {
    const updatedFiles = [...selectedFiles];
    tempFilesArray.forEach((newFile) => {
      const existingIndex = updatedFiles.findIndex(
        (existingFile) => existingFile.name === newFile.name
      );
      if (existingIndex !== -1) {
        // replace duplicates
        if (replace === true) {
          updatedFiles.splice(existingIndex, 1, newFile);
        }
      } else {
        // add those not duplicates
        updatedFiles.push(newFile);
      }
    });
    setSelectedFiles(updatedFiles);
  };

  return (
    <div>
      {openOptionModal === true && (
        <ConfirmModal
          title="Confirm Option"
          open={openOptionModal}
          setOpen={setOpenOptionModal}
          confirmYes={handleFileInputAddFinal}
          context="addMedia"
          yesText="Replace"
          noText="Skip"
        >
          <div>
            There are duplicates in the files you selected. Would you like to
            replace same files or skip them?
            <br />
            <strong>
              {duplicateFileNames.map((name, index) => {
                return <div key={index}>{name}</div>;
              })}
            </strong>
          </div>
        </ConfirmModal>
      )}
      <div className="uploadMediaCont">
        <div className="mediaLabelDiv">
          <Typography
            id="transition-modal-title"
            variant="h6"
            component="h2"
            className="formLabel mediaLabel"
          >
            Media
          </Typography>
          {hasError === true && <span className="errorSpan">{errMessage}</span>}
        </div>
        <UploadButton
          className="uploadButton"
          fileUploadRef={fileUploadRef}
          accept="image/*, video/*"
          onChange={handleFileInputChange}
          multiple={true}
          variant="contained"
        />
      </div>
      <div className="mediaCont mediaContBorder">
        {selectedFiles.length > 0 ? (
          <div className="mediaCont">
            <ImageGallery
              media={selectedFiles}
              setOpenModal={setOpenModal}
              setIndexToEdit={setIndexToEdit}
              handleFileInputAdd={handleFileInputAdd}
            />
          </div>
        ) : (
          <div className="noImageMediaContainer">
            <AddAPhotoIcon
              className="muiNoImageIcon cursorPointer"
              onClick={handleFileUploadClick}
            />
            <span className="cursorPointer" onClick={handleFileUploadClick}>
              Add photos and videos
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default UploadMedia;
