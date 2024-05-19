import * as React from "react";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";

export default function HalfRating({
  defaultValue,
  disabled = false,
  name = "size-large",
}) {
  return (
    <>
      {name === "read-only" ? (
        <Stack spacing={1}>
          <Rating
            name={name}
            value={defaultValue}
            size="large"
            readOnly={disabled}
            getLabelText={() => `${defaultValue} stars`}
          />
        </Stack>
      ) : (
        <Stack spacing={1}>
          <Rating
            name={name}
            defaultValue={defaultValue}
            value={defaultValue}
            size="large"
            readOnly={disabled}
          />
        </Stack>
      )}
    </>
  );
}
