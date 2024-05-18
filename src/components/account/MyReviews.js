import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import "../../styles/MyContributions.css";
import "../../styles/Account.css";
import PalengkeItem from "../homepage/PalengkeItem";
import Modal from "../modals/MyModal";
import Review from "../palengke/Review";
import ConfirmModal from "../modals/ConfirmModal";
import AddEditReview from "../modals/AddEditReview";
import IconButton from "@mui/material/IconButton";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function MyReviews({ ...sharedProps }) {
  const [editReviewModal, setEditReviewModal] = useState(false);
  const [deleteReviewModal, setDeleteReviewModal] = useState(false);

  // Edit Review
  const [defaultValue, setDefaultValue] = useState({});
  const [isEditing, setIsEditing] = useState({});

  const handleBackClick = () => {
    window.history.back();
  };

  const handleDeleteReview = async () => {
    try {
      const response = await fetch(`/review/delete/${defaultValue.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete review");
      }
      setDeleteReviewModal(false);
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  useEffect(() => {
    console.log("defaultValue my review", defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    console.log("editReviewModal", editReviewModal);
    console.log("deleteReviewModal", deleteReviewModal);
    sharedProps.getUserReviews();
  }, [editReviewModal, deleteReviewModal]);

  return (
    <>
      {editReviewModal && (
        <Modal
          open={editReviewModal}
          setOpen={setEditReviewModal}
          title="Edit Review"
        >
          <AddEditReview
            setOpen={setEditReviewModal}
            palengkeId={defaultValue.id}
            defaultValues={defaultValue}
            setDefaultValues={setDefaultValue}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            userId={sharedProps.currUser.id}
            getUserReviews={sharedProps.getUserReviews}
          />
        </Modal>
      )}
      {deleteReviewModal === true && (
        <ConfirmModal
          title="Confirm Delete"
          open={deleteReviewModal}
          setOpen={setDeleteReviewModal}
          confirmYes={handleDeleteReview}
          context="deleteReview"
        >
          <div>Are you sure you want to delete this review?</div>
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
          <h1 className="titleAccount">My Reviews</h1>
        </div>
        <center>
          {sharedProps.userReviews.map((review) => (
            <div className="relative myReviewMargin" key={review.id}>
              <Link
                to={`/palengke/${review.palengke_id}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                <Review
                  key={review.id}
                  index={review.id}
                  editable={true}
                  setOpen={setEditReviewModal}
                  review={review}
                  setIsEditing={setIsEditing}
                  setDefaultValues={setDefaultValue}
                  accountPage={true}
                  {...sharedProps}
                />
              </Link>

              <div className="editDeleteReviewIcons">
                <IconButton
                  className="editIcon"
                  onClick={() => {
                    setEditReviewModal(true);
                    setIsEditing(true);
                    setDefaultValue(review);
                  }}
                >
                  <ModeEditIcon className="muiEditIcons" />
                </IconButton>
                <IconButton
                  className="deleteIcon"
                  onClick={() => {
                    setDeleteReviewModal(true);
                    setDefaultValue(review);
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

export default MyReviews;
