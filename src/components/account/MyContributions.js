import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import "../../styles/MyContributions.css";
import "../../styles/Account.css";
import PalengkeItem from "../homepage/PalengkeItem";
import Modal from "../modals/MyModal";
import ConfirmModal from "../modals/ConfirmModal";
import AddPalengke from "../modals/AddPalengke";
import EditMedia from "../modals/EditMedia";
import IconButton from "@mui/material/IconButton";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function MyContributions({ ...sharedProps }) {
  const [editPalengkeModal, setEditPalengkeModal] = useState(false);
  const [deletePalengkeModal, setDeletePalengkeModal] = useState(false);
  const [editReviewModal, setEditReviewModal] = useState(false);
  const [deleteReviewModal, setDeleteReviewModal] = useState(false);

  // Edit Palengke
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [indexToEdit, setIndexToEdit] = useState();
  const [openMap, setOpenMap] = useState(false);
  const [openMediaModal, setOpenMediaModal] = useState(false);
  const [prevModalHeight, setPrevModalHeight] = useState("unset");
  const [defaultValue, setDefaultValue] = useState({});
  const [media, setMedia] = useState([]);

  const handleBackClick = () => {
    window.history.back();
  };

  useEffect(() => {
    function updateHeight() {
      const modalElement = document.querySelector(".addPalengkeModal");
      if (modalElement) {
        const height = modalElement.offsetHeight + "px";
        setPrevModalHeight(height);
      }
    }
    updateHeight();

    window.addEventListener("resize", updateHeight);
    return () => {
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  const handleDefaultValue = useCallback(() => {
    if (defaultValue && media) {
      setDefaultValue((prevDefaultValue) => ({
        ...prevDefaultValue,
        media: media,
      }));
    }
  }, [media]);

  useEffect(() => {
    console.log("defaultValue my contri", defaultValue);
  }, [defaultValue]);

  const getMedia = useCallback(
    (palengkeId) => {
      console.log("palengkeId", palengkeId);
      const media = [];
      const palengke = sharedProps.palengkeList.find(
        (palengke) => palengke.id === palengkeId
      );

      console.log("Palengke:", palengke);

      if (palengke && palengke.media && palengke.media.length > 0) {
        const mediaItems = palengke.media.map((mediaId) =>
          sharedProps.mediaList.find((media) => media.id === mediaId)
        );

        mediaItems.forEach((item) => {
          if (item) {
            media.push(item);
          } else {
            console.error("Media not found");
          }
        });
      } else {
        console.error("No media found for palengke ID:", palengkeId);
      }

      console.log("Media:", media);
      setMedia(media);
      return media;
    },
    [sharedProps.mediaList, sharedProps.palengkeList]
  );

  const handleDeletePalengke = async () => {
    try {
      const response = await fetch(
        `/palengke/delete?userId=${sharedProps.currUser.id}&palengkeId=${defaultValue.id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete review");
      }
      setDeletePalengkeModal(false);
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  useEffect(() => {
    if (defaultValue.id) {
      getMedia(defaultValue.id);
    }
  }, [defaultValue.id, getMedia]);

  useEffect(() => {
    if (media.length > 0) {
      handleDefaultValue();
    }
  }, [media, handleDefaultValue]);

  useEffect(() => {
    console.log("editPalengkeModal", editPalengkeModal);
    console.log("deletePalengkeModal", deletePalengkeModal);
    console.log("editReviewModal", editReviewModal);
    console.log("deleteReviewModal", deleteReviewModal);
    sharedProps.getUserContributions();
  }, [
    editPalengkeModal,
    deletePalengkeModal,
    editReviewModal,
    deleteReviewModal,
  ]);

  return (
    <>
      {editPalengkeModal && (
        <Modal
          title="Edit Palengke"
          open={editPalengkeModal}
          setOpen={setEditPalengkeModal}
          className="editPalengkeModal"
        >
          <AddPalengke
            openMap={openMap}
            setOpenMap={setOpenMap}
            setOpenMediaModal={setOpenMediaModal}
            setIndexToEdit={setIndexToEdit}
            setSelectedFiles={setSelectedFiles}
            selectedFiles={selectedFiles}
            setAddPalengkeClicked={setEditPalengkeModal}
            prevModalHeight={prevModalHeight}
            palengkelist={sharedProps.palengkeList}
            setPalengkeList={sharedProps.setPalengkeList}
            mediaList={sharedProps.mediaList}
            setMediaList={sharedProps.setMediaList}
            currUser={sharedProps.currUser}
            defaultValue={defaultValue}
          />
        </Modal>
      )}
      {openMediaModal && (
        <Modal
          title={selectedFiles[indexToEdit].name}
          open={openMediaModal}
          setOpen={setOpenMediaModal}
        >
          <EditMedia
            setOpenMediaModal={setOpenMediaModal}
            media={selectedFiles}
            setSelectedFiles={setSelectedFiles}
            indexToEdit={indexToEdit}
          />
        </Modal>
      )}
      {deletePalengkeModal === true && (
        <ConfirmModal
          title="Confirm Delete"
          open={deletePalengkeModal}
          setOpen={setDeletePalengkeModal}
          confirmYes={handleDeletePalengke}
          context="deletePalengke"
        >
          <div>
            Are you sure you want to delete this palengke?
            <strong>{defaultValue.name}</strong>
          </div>
        </ConfirmModal>
      )}
      <div className="contributions">
        <div className="relative headerTitleAccount">
          <IconButton
            onClick={handleBackClick}
            style={{
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
            }}
            className="backButton"
          >
            <ArrowBackIcon style={{ color: " #ff6262" }} />
          </IconButton>
          <h1 className="titleAccount">My Contributions</h1>
        </div>
        <center>
          {sharedProps.userContributions.map((palengke) => (
            <div className="relative myContriMargin" key={palengke.id}>
              <Link
                to={`/palengke/${palengke.id}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                <PalengkeItem
                  palengke={palengke}
                  type={"45%"}
                  min={"60%"}
                  marg={"0"}
                  mediaList={sharedProps.mediaList}
                  {...sharedProps}
                />
              </Link>

              <div className="editDeleteIcons">
                <IconButton
                  className="editIcon"
                  onClick={() => {
                    setEditPalengkeModal(true);
                    setDefaultValue(palengke);
                  }}
                >
                  <ModeEditIcon className="muiEditIcons" />
                </IconButton>
                <IconButton
                  className="deleteIcon"
                  onClick={() => {
                    setDeletePalengkeModal(true);
                    setDefaultValue(palengke);
                  }}
                >
                  <DeleteIcon className="muiEditIcons" />
                </IconButton>
              </div>
            </div>
          ))}
        </center>
      </div>
    </>
  );
}

export default MyContributions;
