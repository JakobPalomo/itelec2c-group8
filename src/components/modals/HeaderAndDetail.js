import { useState, useEffect, useRef } from "react";
import ImageGallery from "../ui/ImageGallery";
import Modal from "./MyModal";
import EditMedia from "./EditMedia";
import Typography from "@mui/material/Typography";

function HeaderAndDetail({
  header = "",
  detail = "",
  margin = "",
  array = [],
  mediaArray = [],
}) {
  const [indexToEdit, setIndexToEdit] = useState();
  const [openMediaModal, setOpenMediaModal] = useState();

  return (
    <>
      {openMediaModal === true && (
        <Modal
          title={mediaArray[indexToEdit].name}
          open={openMediaModal}
          setOpen={setOpenMediaModal}
        >
          <EditMedia
            setOpenMediaModal={setOpenMediaModal}
            media={mediaArray}
            indexToEdit={indexToEdit}
            readOnly={true}
          />
        </Modal>
      )}
      <div style={{ margin: `${margin}` }}>
        <Typography
          id="transition-modal-title"
          variant="h6"
          component="h2"
          className="confirmFormLabel noMarginBottom"
        >
          {header}
        </Typography>
        <Typography
          id="transition-modal-title"
          variant="h6"
          component="h2"
          className="formInput"
        >
          {detail}
          {Array.isArray(array) && (
            <>
              {array.map((name) => (
                <Typography
                  id="transition-modal-title"
                  key={name}
                  variant="h6"
                  component="h2"
                  className="formInput noMargin"
                >
                  {name.toString()}
                </Typography>
              ))}
            </>
          )}
        </Typography>
        {Array.isArray(mediaArray) && mediaArray.length > 0 && (
          <div className="mediaCont mediaContBorder mediaContMarginLeft">
            <ImageGallery
              media={mediaArray}
              setOpenModal={setOpenMediaModal}
              setIndexToEdit={setIndexToEdit}
              readOnly={true}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default HeaderAndDetail;
