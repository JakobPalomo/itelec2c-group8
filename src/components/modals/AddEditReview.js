import InputText from "./InputText";
import {
  handleSetError,
  getHasError,
  getErrMessage,
} from "../../functions/utils";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/joy/Typography";
import "../../styles/AddReview.css";

import { useState, useEffect } from "react";

function AddEditReview({
  isEditing,
  setIsEditing,
  setOpen,
  userId,
  palengkeId,
  onAddReview,
  onEditReview,
  defaultValues,
  setDefaultValues,
}) {
  const initialErrorData = [
    { field: "rating", hasError: false, errMessage: "" },
    { field: "review", hasError: false, errMessage: "" },
  ];

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [errors, setErrors] = useState(initialErrorData);

  const isEmptyObject = (obj) => {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  };

  useEffect(() => {
    console.log("default Values", defaultValues);
    if (isEmptyObject(defaultValues) == false) {
      setRating(defaultValues.rating);
      setReview(defaultValues.review);
    } else {
      setReview("");
      setRating(0);
    }
  }, []);

  // Validation function
  const validateReviewDetails = () => {
    console.log(rating, review, palengkeId, userId);
    let trimmedReview = review;
    let trimmedRating = rating;
    if (review == undefined || review == "undefined") {
      setReview("");
      trimmedReview = "";
    }
    if (rating == undefined || rating == "undefined") {
      trimmedRating = 0;
      setRating(0);
    }
    console.log("rating", rating);
    console.log(trimmedRating <= 0, trimmedRating);
    // Trim strings
    trimmedReview = review.trim();
    setReview(trimmedReview);

    let tempErrors = initialErrorData.map((error) => ({ ...error })); // Create a copy of the initialErrorData array

    if (trimmedRating <= 0) {
      tempErrors = tempErrors.map((error) =>
        error.field === "rating"
          ? { ...error, hasError: true, errMessage: "Rating is required" }
          : error
      );
    }

    if (trimmedReview === "") {
      tempErrors = tempErrors.map((error) =>
        error.field === "review"
          ? { ...error, hasError: true, errMessage: "Review is required" }
          : error
      );
    }

    setErrors(tempErrors);

    const hasError = tempErrors.some((field) => field.hasError);
    if (!hasError) {
      if (isEditing === false) {
        handleAddReview();
      } else {
        handleEditReview(defaultValues.id);
      }
    }

    console.log(tempErrors);
  };

  const handleAddReview = async () => {
    console.log(review, rating);
    const today = new Date();
    const dateString = today.toDateString();
    const formData = new FormData();
    try {
      // Append each file to FormData
      formData.append("user_id", userId);
      formData.append("palengke_id", palengkeId);
      formData.append("date", dateString);
      formData.append("review", review);
      formData.append("rating", rating);
      formData.append("upvote_count", 0);
      console.log(formData);

      // Upload the FormData to the server
      const response = await fetch(`/review/add?userId=${userId}`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to add review");
      }
      setOpen(false);
    } catch (error) {
      console.error("Error adding media:", error);
    }
  };

  const handleEditReview = async (reviewId) => {
    const today = new Date();
    const dateString = today.toDateString();
    const formData = new FormData();
    try {
      // Append updated review data to FormData
      formData.append("review", review);
      formData.append("rating", rating);
      formData.append("edited_date", dateString);
      console.log(formData);

      // Upload the FormData to the server
      const response = await fetch(`/review/edit/${reviewId}`, {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to edit review");
      }
      // Optionally, handle success behavior (e.g., closing modal)
      setIsEditing(false);
      setOpen(false);
    } catch (error) {
      console.error("Error editing review:", error);
    }
  };

  // Cancel add palengke
  const handleCancelAndClearInput = () => {
    setRating();
    setReview("");
  };

  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
  };

  useEffect(() => {
    // setUserId(userId);
    // setPalengkeId(palengkeId);
    console.log("defaultValues");
    console.log(defaultValues);
  }, []);

  useEffect(() => {
    console.log("rating");
    console.log(
      `rating ${rating}; review: ${review}; palengeke_id: ${palengkeId}; user_id: ${userId}`
    );
  }, [rating, review]);

  return (
    <div className="AddReview">
      <h3>How would you rate this Palengke?</h3>
      <Stack spacing={3} className="ratingMarginTop">
        <Rating
          name="size-large"
          value={rating}
          onChange={handleRatingChange}
          size="large"
        />
      </Stack>
      {getHasError("rating", errors) === true && (
        <Typography
          id="transition-modal-title"
          variant="h6"
          component="h2"
          className="errorSpanNoLabel ratingMarginBottom"
        >
          <span>{getErrMessage("rating", errors)}</span>
        </Typography>
      )}
      <InputText
        fullWidth
        type="text"
        label="Review"
        required={true}
        setValue={setReview}
        value={review}
        maxLength={100}
        placeholder="Write a review ..."
        hasError={getHasError("review", errors)}
        errMessage={getErrMessage("review", errors)}
        noLabel={true}
      />
      <div className="addPalengkeModalButtons">
        <Button
          variant="contained"
          className="button pinkButton mediaButtonMargin"
          style={{ textTransform: "none" }}
          onClick={(e) => {
            e.preventDefault();
            validateReviewDetails();
          }}
        >
          Submit
        </Button>
        <Button
          variant="outlined"
          className="outlinedButton outlinedPinkButton mediaButtonMargin"
          style={{ textTransform: "none" }}
          onClick={() => {
            handleCancelAndClearInput();
            setOpen(false);
          }}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}

export default AddEditReview;
