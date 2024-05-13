import * as React from "react";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";

export default function HalfRating({ defaultValue, disabled = false }) {
  return (
    <Stack spacing={1}>
      <Rating
        name="size-large"
        defaultValue={defaultValue}
        size="large"
        readOnly={disabled}
      />
    </Stack>
  );
}
