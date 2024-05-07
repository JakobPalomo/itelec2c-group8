import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";

const Button = styled(ButtonBase)(({ theme }) => ({
  position: "relative",
  height: 200,
  [theme.breakpoints.down("sm")]: {
    width: "100% !important", // Overrides inline-style
    height: "100% !important",
  },
  display: "block !important",
  width: "100% !important",
  height: "100% !important",
  textAlign: "left",
  fontFamily: "Poppins, sans-serif !important",
  "& .MuiTouchRipple-root": { color: "rgba(0, 0, 0, 0.3) !important" },
  "&:hover, &.Mui-focusVisible": {
    zIndex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.03) !important",
  },
  "& .Mui-focusVisible": {
    // No need to repeat display: block here, as it's already defined outside
  },
}));

export default function RippleButton({ color, children }) {
  return (
    <Box
      sx={{ display: "flex", flexWrap: "wrap", minWidth: 300, width: "100%" }}
    >
      <Button
        focusRipple
        style={{
          width: "100%",
          backgroundColor: "transparent !important",
          backgroundImage: "transparent !important",
        }}
      >
        {children}
      </Button>
    </Box>
  );
}
