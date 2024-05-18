import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import InputText from "../modals/InputText";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
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
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { MuiOtpInput } from "mui-one-time-password-input";
import emailjs from "@emailjs/browser";

const defaultTheme = createTheme();

function ForgotPassword({ ...sharedProps }) {
  const navigate = useNavigate();
  const form = useRef();
  const initialEmailErrorData = {
    hasError: false,
    errMessage: "",
  };
  const initialOTPErrorData = {
    hasError: false,
    errMessage: "",
  };

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(initialEmailErrorData);
  const [generatedOTP, setGeneratedOTP] = useState(0);
  const [isOTPGenerated, setIsOTPGenerated] = useState(false);
  const [otp, setOtp] = useState("");
  const [OTPError, setOTPError] = useState(initialOTPErrorData);
  const [recendClicked, setResendClicked] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [timerRunning, setTimerRunning] = useState(false);

  // Handling errors
  const handleSetError = (message, errors, setErrors) => {
    let updatedFields = errors;
    updatedFields = {
      hasError: true,
      errMessage: message,
    };
    setErrors(updatedFields);
  };
  const getHasError = (errors) => {
    return errors.hasError;
  };
  const getErrMessage = (errors) => {
    return errors.errMessage;
  };

  const serviceId = "service_2rae78o";
  const templateId = "template_i5girgd";
  const publicKey = "WhMuOqSUglpspgNFJ";

  const sendEmail = () => {
    emailjs
      .send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        console.log("Email sent successfully!", response);
      })
      .catch((error) => {
        console.error("Error sending email:", error);
      });
  };

  const templateParams = {
    from_email: "irarayzel.ji.cics@ust.edu.ph",
    to_email: email,
    otp: generatedOTP,
  };

  useEffect(() => {
    setTimerRunning(true);
  }, []);

  useEffect(() => {
    let timerInterval;
    // Start the timer when timerRunning becomes true
    if (timerRunning === true) {
      const timerInterval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 0) {
            clearInterval(timerInterval);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      // Clear interval on component unmount
      return () => {
        clearInterval(timerInterval);
        setTimerRunning(false);
      };
    }
  }, [timerRunning]);

  const handleEmailVerify = (errors, setErrors) => {
    const tempErrors = errors;

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === "") {
      tempErrors.hasError = true;
      tempErrors.errMessage = "This field is required";
    } else if (emailPattern.test(email) === false) {
      tempErrors.hasError = true;
      tempErrors.errMessage = "Not a valid email address";
    }

    setErrors(tempErrors);

    if (tempErrors.hasError === false) {
      //send email
      generateOTP();
      setIsOTPGenerated(true);
    }
  };

  const generateOTP = () => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    setGeneratedOTP(otp);
    console.log(otp);
  };

  // Function to start the timer
  const startTimer = () => {
    setTimeLeft(300);
    setTimerRunning(true);
  };

  // Function to format time in mm:ss format
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? "0" + minutes : minutes}:${
      seconds < 10 ? "0" + seconds : seconds
    }`;
  };

  const handleOtpChange = (value) => {
    setOtp(value);
  };

  const validateChar = (value, index) => {
    return matchIsNumeric(value);
  };
  const matchIsString = (value) => {
    return typeof value === "string";
  };
  const matchIsNumeric = (text) => {
    const isNumber = typeof text === "number";
    const isString = matchIsString(text);
    return (isNumber || (isString && text !== "")) && !isNaN(Number(text));
  };

  const handleResend = () => {
    // generate otp before start timer
    generateOTP();
    setIsOTPGenerated(true);
    startTimer();
  };

  useEffect(() => {
    console.log("timerRunning", timerRunning);
    if (generatedOTP !== 0 && generatedOTP !== "0") {
      sendEmail();
      console.log("sent email with", generatedOTP);
    }
  }, [generatedOTP]);

  const handleOTPVerify = (errors, setErrors) => {
    const tempErrors = errors;

    if (parseInt(otp) !== generatedOTP) {
      tempErrors.hasError = true;
      tempErrors.errMessage = "Incorrect OTP";
    }

    setErrors(tempErrors);

    if (tempErrors.hasError === false) {
      setIsOTPGenerated(false);
      navigate("/change-password", { state: { data: email } });
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid
        container
        component="main"
        sx={{ height: "100vh" }}
        className="loginMain"
      >
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
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
          sx={{ boxShadow: "none", bgcolor: "#FFF6DF" }}
        >
          {isOTPGenerated === false ? (
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
              className="otpEmailBox"
            >
              {/* Write here */}
              <span
                className="welcomeLogin centerText"
                style={{ marginTop: "12px" }}
              >
                OTP Verification
              </span>
              <InputText
                type="text"
                label="Email Address"
                required={true}
                setValue={setEmail}
                value={email}
                maxLength={100}
                placeholder="Your email address"
                hasError={getHasError(emailError)}
                errMessage={getErrMessage(emailError)}
                noLabel={true}
              />
              <center>
                <Box className="verifyButtonMargin emailOTPButtonsMargin">
                  <Button
                    type="submit"
                    variant="contained"
                    className="button pinkButton bigButton otpEmailButtonWidth"
                    style={{ textTransform: "none" }}
                    onClick={() =>
                      handleEmailVerify(initialEmailErrorData, setEmailError)
                    }
                  >
                    Send OTP
                  </Button>
                  <Link href="/login">
                    <Button
                      type="button"
                      variant="outlined"
                      className="outlinedButton outlinedPinkButton bigButton otpEmailButtonWidth"
                      style={{
                        textTransform: "none",
                        backgroundColor: "rgba(0,0,0,0.5) !important",
                        color: "",
                      }}
                      onClick={() => {}}
                    >
                      Cancel
                    </Button>
                  </Link>
                </Box>
              </center>
            </Box>
          ) : (
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
              className="otpBox"
            >
              {/* Write here */}
              <span
                className="welcomeLogin marginOTPTitle centerText"
                style={{ marginTop: "12px" }}
              >
                OTP Verification
              </span>
              <p className="subtextLogin">
                Enter the OTP code sent to{" "}
                <span className="emailSpan">{email}</span>
              </p>
              <div className="otpFieldMargin">
                <MuiOtpInput
                  value={otp}
                  onChange={handleOtpChange}
                  length={6}
                  autoFocus
                  validateChar={validateChar}
                  gap={2}
                />
                <Typography
                  id="transition-modal-title"
                  variant="h6"
                  component="h2"
                  className="errorSpanNoLabel"
                >
                  {getHasError(OTPError) === true && (
                    <span>{getErrMessage(OTPError)}</span>
                  )}
                </Typography>
              </div>
              <p className="subtextLogin">Didn’t receive the OTP code?</p>
              {timeLeft !== 0 ? (
                <p className="subtextLogin">
                  Resend Code in{" "}
                  <span className="emailSpan">{formatTime(timeLeft)}</span>
                </p>
              ) : (
                <p className="subtextLogin">
                  <span
                    className="resendSpan"
                    onClick={() => {
                      handleResend();
                    }}
                  >
                    Resend Code
                  </span>
                </p>
              )}
              <center>
                <Box className="verifyButtonMargin">
                  <Button
                    type="submit"
                    variant="contained"
                    className="button pinkButton bigButton otpButtonWidth"
                    style={{ textTransform: "none" }}
                    onClick={() => {
                      handleOTPVerify(initialOTPErrorData, setOTPError);
                    }}
                  >
                    Verify
                  </Button>
                  <Link href="/login">
                    <Button
                      type="button"
                      variant="outlined"
                      className="outlinedButton outlinedPinkButton bigButton otpButtonWidth"
                      style={{
                        textTransform: "none",
                        backgroundColor: "rgba(0,0,0,0.5) !important",
                        color: "",
                      }}
                      onClick={() => {}}
                    >
                      Cancel
                    </Button>
                  </Link>
                </Box>
              </center>
            </Box>
          )}
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default ForgotPassword;
