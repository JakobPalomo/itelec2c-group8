import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InputText from "../modals/InputText";
import "../../styles/Login.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const defaultTheme = createTheme();

function Login({ setIsLoggedIn, setCurrUser, ...sharedProps }) {
  const navigate = useNavigate();
  const initialErrorData = [
    { field: "email", hasError: false, errMessage: "" },
    { field: "password", hasError: false, errMessage: "" },
    { field: "both", hasError: false, errMessage: "" },
  ];

  const [email, setEmail] = useState(false);
  const [password, setPasword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [errors, setErrors] = useState(initialErrorData);

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

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleVisibility = () => {
    setToggle(!toggle);
  };

  const handleLogin = () => {
    const tempErrors = initialErrorData;

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === "") {
      tempErrors.find((field) => field.field === "email").hasError = true;
      tempErrors.find((field) => field.field === "email").errMessage =
        "This field is required";
    } else if (emailPattern.test(email) === false) {
      tempErrors.find((field) => field.field === "email").hasError = true;
      tempErrors.find((field) => field.field === "email").errMessage =
        "Not a valid email address";
    }

    if (password === "") {
      tempErrors.find((field) => field.field === "password").hasError = true;
      tempErrors.find((field) => field.field === "password").errMessage =
        "This field is required";
    }

    // Temporary invalid credentials (authenticate here)
    let incorrectCredentials = false;
    if (email !== "" && password !== "" && incorrectCredentials) {
      tempErrors.find((field) => field.field === "both").hasError = true;
      tempErrors.find((field) => field.field === "both").errMessage =
        "Invalid username or password";
    }

    setErrors(tempErrors);

    const hasError = tempErrors.some((field) => field.hasError);
    if (!hasError && setIsLoggedIn !== undefined) {
      setIsLoggedIn(true);
      setCurrUser({
        user_id: "DBUSERIDHERE",
        username: "myusername",
        email: "email@gmail.com",
        district: "Tondo",
        city: "Manila",
        region: "Metro Manila",
        profile: 1,
        reviews: [],
        contributions: [],
        saves: [],
        upvotes: [],
        otp: 0,
      });

      navigate("/home");
    } else if (!hasError && setIsLoggedIn === undefined) {
      tempErrors.find((field) => field.field === "both").hasError = true;
      tempErrors.find((field) => field.field === "both").errMessage =
        "Error logging in, please try again";
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
              "url(https://source.unsplash.com/random?wetmarket)",
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
          >
            <Box
              component="form"
              noValidate
              onSubmit={handleLogin}
              sx={{ mt: 22 }}
            >
              <span className="welcomeLogin">Hello palengkerist!</span>
              <InputText
                type="text"
                label="Email Address"
                required={true}
                setValue={setEmail}
                value={email}
                maxLength={100}
                placeholder="Your email address"
                hasError={getHasError("email")}
                errMessage={getErrMessage("email")}
              />
              <InputText
                type={showPassword === true ? "text" : "password"}
                label="Password"
                required={true}
                setValue={setPasword}
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
              {getHasError("both") && (
                <span className="centerText errorSpanLogin">
                  {getErrMessage("both")}
                </span>
              )}
              <Box className="loginButtonMargin">
                <Button
                  type="button"
                  variant="contained"
                  className="button pinkButton bigButton flexButton"
                  style={{ textTransform: "none" }}
                  onClick={handleLogin}
                >
                  Login
                </Button>
              </Box>
              <Grid container>
                <Grid item xs>
                  <Link
                    href="/forgot-password"
                    variant="body2"
                    style={{ textDecoration: "underline" }}
                    className="spanText"
                  >
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <span className="spanText">Don't have an account? </span>
                  <Link
                    href="/register"
                    variant="body2"
                    style={{ textDecoration: "underline" }}
                    className="spanText"
                  >
                    Sign Up
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default Login;
