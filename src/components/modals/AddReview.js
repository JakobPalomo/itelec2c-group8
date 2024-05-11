import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import "../../styles/AddReview.css";
import Button from "@mui/material/Button";
import Textarea from "@mui/joy/Textarea";

import { useState, useEffect } from "react";

function AddReview({ setAddPalengkeClicked }) {
  return (
    <div className="AddReview">
      <h3>How would you rate this Palengke?</h3>
      <Stack spacing={3}>
        <Rating name="size-large" defaultValue={2} size="large" />
      </Stack>
      <Textarea
        color="#f0f0f0"
        minRows={4}
        placeholder=""
        size="lg"
        variant="solid"
      />
      {/* <textarea></textarea> */}
      <Button
        variant="contained"
        className="button pinkButton mediaButtonMargin"
        style={{ textTransform: "none" }}
        onClick={() => {}}
      >
        Submit Review
      </Button>
    </div>
  );
}

export default AddReview;
