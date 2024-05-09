import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "../../styles/Login.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { MuiOtpInput } from "mui-one-time-password-input";

const defaultTheme = createTheme();

const OTP = () => {
  const [otp, setOtp] = React.useState("");

  const handleChange = (newValue) => {
    setOtp(newValue);
  };

  return <MuiOtpInput value={otp} onChange={handleChange} length={6} />;
};

let timeLeft = 600;

function updateCountdown() {
  const minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;

  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  document.getElementById("timer").textContent = `${minutes}:${seconds}`;
  timeLeft--;
}

const timerInterval = setInterval(updateCountdown, 1000);

function ForgotPassword() {
  const [showPassword, setShowPassword] = React.useState(false);

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random?wallpapers)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* Write here */}
            <span className="welcome" style={{ marginTop: "12px" }}>
              OTP Verification
            </span>
            <p className="subtext">
              Enter the OTP code sent to mam**03**@gmail.com
            </p>
            <OTP />
            <p className="subtext">Didn’t receive the OTP code?</p>
            <p id="countdown" class="subtext">
              Time Remaining: <span id="timer">10:00</span>
            </p>
            <center>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  backgroundColor: "#FF6262", // Button background color
                  "&:hover": {
                    backgroundColor: "#E74F4F", // Button hover background color
                  },
                  marginRight: "12px",
                }}
              >
                Verify
              </Button>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  backgroundColor: "#FFC8C8", // Button background color
                  "&:hover": {
                    backgroundColor: "#FF8787", // Button hover background color
                  },
                }}
              >
                Cancel
              </Button>
            </center>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default ForgotPassword;
