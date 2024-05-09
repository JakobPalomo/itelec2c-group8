import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";

export default function RippleButton({
  color,
  children,
  display = "block",
  width = "100%",
  height = "100%",
}) {
  const Button = styled(ButtonBase)(({ theme }) => ({
    position: "relative",
    [theme.breakpoints.down("sm")]: {
      width: "100% !important", // Overrides inline-style
      height: "100% !important",
    },
    display: `${display} !important`,
    width: `${width} !important`,
    height: `${height} !important`,
    textAlign: "left",
    fontFamily: "Poppins, sans-serif !important",
    borderRadius: "10px",
    "& .MuiTouchRipple-root": { color: "rgba(0, 0, 0, 0.3) !important" },
    "&:hover, &.Mui-focusVisible": {
      zIndex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.03) !important",
    },
    "& .Mui-focusVisible": {
      // No need to repeat display: block here, as it's already defined outside
    },
  }));

  return (
    //minWidth: 300,
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        width: `${width} !important`,
        height: `${height} !important`,
      }}
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
