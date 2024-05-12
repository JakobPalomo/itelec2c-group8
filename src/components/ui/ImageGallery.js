import { useState, useEffect, useRef } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import AddIcon from "@mui/icons-material/Add";
import RippleButton from "../ui/RippleButton";
import UploadButton from "../ui/UploadButton";
//?w=248&fit=crop&auto=format&dpr=2 2x
export default function ImageGallery({
  media,
  setOpenModal,
  setIndexToEdit,
  handleFileInputAdd,
  readOnly = false,
}) {
  const fileUploadRef = useRef(null);

  return (
    <ImageList className="mediaContInside">
      {media.map((file, index) => (
        <ImageListItem key={index} className="filePreview">
          <RippleButton
            className="mediaButton"
            display="flex"
            width="150px"
            height="150px"
            onClick={() => {}}
          >
            {file.type.startsWith("image/") ? (
              <img
                srcSet={`${URL.createObjectURL(file)}`}
                src={`${URL.createObjectURL(file)}`}
                alt={file.name}
                loading="lazy"
                className="imageGalleryItem"
                onClick={() => {
                  setOpenModal(true);
                  setIndexToEdit(index);
                }}
              />
            ) : (
              //controls
              <video
                className="imageGalleryItem"
                onClick={() => {
                  setOpenModal(true);
                  setIndexToEdit(index);
                }}
              >
                <source src={URL.createObjectURL(file)} type={file.type} />
                Your browser does not support the video tag.
              </video>
            )}
          </RippleButton>
          <span
            title={file.name}
            className="mediaTitle cursorPointer"
            onClick={() => {
              setOpenModal(true);
              setIndexToEdit(index);
            }}
          >
            {file.name}
          </span>
        </ImageListItem>
      ))}
      {readOnly === false && (
        <div className="addMediaButtonCont">
          <UploadButton
            className="uploadButton"
            fileUploadRef={fileUploadRef}
            accept="image/*, video/*"
            onChange={handleFileInputAdd}
            multiple={true}
            title="Add Media"
            icon={<AddIcon />}
            variant="outlined"
            newClassName="outlinedButton outlinedGreyButton"
          />
        </div>
      )}
    </ImageList>
  );
}
