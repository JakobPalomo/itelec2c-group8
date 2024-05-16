import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  getAuth,
  updatePassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase";
import InputText from "../modals/InputText";
import ConfirmModal from "../modals/ConfirmModal";
import "../../styles/Login.css";
import "../../styles/ModalContent.css";
import "../../styles/EditProfile.css";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ErrorIcon from "@mui/icons-material/Error";

const defaultTheme = createTheme();

function ChangePassword({ ...sharedProps }) {
  const navigate = useNavigate();
  const { state } = useLocation();
  // Access the passed data
  const email = state?.data;

  const initialErrorData = [
    { field: "password", hasError: false, errMessage: "" },
    { field: "confirmPassword", hasError: false, errMessage: "" },
    { field: "all", hasError: false, errMessage: "" },
  ];

  const [password, setPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState(initialErrorData);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [openErrorModal, setOpenErrorModal] = useState(false);

  // Handling errors
  const handleSetError = (variable, message) => {
    console.log(`setting error: ${variable}; ${message}`);
    const index = errors.findIndex((field) => {
      console.log(`field.field: ${field.field} = ${variable.toString()}`);
      console.log(field.field === variable.toString());
      return field.field === variable.toString();
    });
    if (index !== -1) {
      const updatedFields = [...errors];
      updatedFields[index] = {
        ...updatedFields[index],
        hasError: true,
        errMessage: message,
      };
      setErrors(updatedFields);
    }
  };
  const getHasError = (variable) => {
    const index = errors.findIndex(
      (field) => field.field === variable.toString()
    );
    if (index !== -1) {
      return errors[index].hasError;
    }
  };
  const getErrMessage = (variable) => {
    const index = errors.findIndex(
      (field) => field.field === variable.toString()
    );
    if (index !== -1) {
      return errors[index].errMessage;
    }
  };

  // Password Visibility
  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // Change Pass
  const handleChangePassword = () => {
    const tempErrors = initialErrorData;

    if (password === "") {
      tempErrors.find((field) => field.field === "password").hasError = true;
      tempErrors.find((field) => field.field === "password").errMessage =
        "This field is required";
    } else if (password.length < 6) {
      tempErrors.find((field) => field.field === "password").hasError = true;
      tempErrors.find((field) => field.field === "password").errMessage =
        "Password must be at least 6 characters";
    }

    if (confirmPassword === "") {
      tempErrors.find(
        (field) => field.field === "confirmPassword"
      ).hasError = true;
      tempErrors.find((field) => field.field === "confirmPassword").errMessage =
        "This field is required";
    }

    if (
      password !== "" &&
      confirmPassword !== "" &&
      password !== confirmPassword
    ) {
      tempErrors.find(
        (field) => field.field === "confirmPassword"
      ).hasError = true;
      tempErrors.find((field) => field.field === "confirmPassword").errMessage =
        "Password does not match";
    }

    setErrors(tempErrors);

    const hasError = tempErrors.some((field) => field.hasError);
    if (!hasError) {
      console.log("to change password");
      if (email) {
        setOpenConfirmModal(true);
      } else {
        setOpenErrorModal(true);
      }
      navigate("/login");
    }
  };

  const changePassword = async () => {
    const formData = new FormData();

    try {
      // Append each file to FormData
      formData.append("email", email);
      formData.append("new_password", password);
      console.log(formData);

      // Upload the FormData to the server
      const response = await fetch("/user/change-pass", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to add review");
      }
      setOpenConfirmModal(false);
      navigate("/login");
    } catch (error) {
      console.error("Error adding media:", error);
      handleSetError("all", "An error occured, please try again later");
      setOpenConfirmModal(false);
    }
  };

  const goToPage = (option) => {
    if (option === true) {
      navigate("/forgot-password");
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      {openConfirmModal === true && (
        <ConfirmModal
          title="Confirm Delete"
          open={openConfirmModal}
          setOpen={setOpenConfirmModal}
          confirmYes={handleChangePassword}
          context="changePassFromForgotPass"
        >
          <div>Are you sure you want to change your password?</div>
        </ConfirmModal>
      )}
      {openErrorModal === true && (
        <ConfirmModal
          title="Confirm Delete"
          open={openErrorModal}
          setOpen={setOpenErrorModal}
          confirmYes={goToPage}
          yesText="Reverify"
          noText="Cancel"
          icon={<ErrorIcon className="muiErrorIcon" />}
          context="changePassNoEmail"
        >
          <div>Cannot verify account, please repeat OTP verification.</div>
        </ConfirmModal>
      )}
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
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
              className="changePassBox"
            >
              <span
                className="welcomeLogin centerText signupMargin"
                style={{ marginTop: "12px" }}
              >
                Change Password
              </span>
              <br />

              <Box
                component="form"
                noValidate
                onSubmit={handleChangePassword}
                sx={{ mt: 1 }}
              >
                <InputText
                  type={showPassword === true ? "text" : "password"}
                  label="Password"
                  required={true}
                  setValue={setPassword}
                  value={password}
                  maxLength={100}
                  placeholder="Your password"
                  hasError={getHasError("password")}
                  errMessage={getErrMessage("password")}
                  visibility={showPassword}
                  setVisibility={handlePasswordVisibility}
                  iconOn={<VisibilityIcon className="muiVisibilityIcon" />}
                  iconOff={<VisibilityOffIcon className="muiVisibilityIcon" />}
                />
                <InputText
                  type={showConfirmPassword === true ? "text" : "password"}
                  label="Confirm Password"
                  required={true}
                  setValue={setConfirmPassword}
                  value={confirmPassword}
                  maxLength={100}
                  placeholder="Confirm your password"
                  hasError={getHasError("confirmPassword")}
                  errMessage={getErrMessage("confirmPassword")}
                  visibility={showConfirmPassword}
                  setVisibility={handleConfirmPasswordVisibility}
                  iconOn={<VisibilityIcon className="muiVisibilityIcon" />}
                  iconOff={<VisibilityOffIcon className="muiVisibilityIcon" />}
                />
                {getHasError("all") && (
                  <span className="centerText errorSpanProfile">
                    {getErrMessage("all")}
                  </span>
                )}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    mt: 3,
                    textAlign: "center",
                  }}
                >
                  <Button
                    variant="contained"
                    className="button pinkButton bigButton changePassButtonMargin"
                    style={{ textTransform: "none" }}
                    onClick={() => {
                      handleChangePassword();
                    }}
                  >
                    Change
                  </Button>
                  <Link href="/login">
                    <Button
                      variant="outlined"
                      className="outlinedPinkButton bigButton changePassButtonMargin"
                      style={{ textTransform: "none" }}
                      onClick={() => {}}
                    >
                      Cancel
                    </Button>
                  </Link>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
}

export default ChangePassword;
