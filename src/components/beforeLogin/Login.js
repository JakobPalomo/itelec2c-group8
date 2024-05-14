import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputText from "../modals/InputText";
import "../../styles/Login.css";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

const defaultTheme = createTheme();

function Login({ setIsLoggedIn, setCurrUser }) {
  const navigate = useNavigate();
  const initialErrorData = [
    { field: "email", hasError: false, errMessage: "" },
    { field: "password", hasError: false, errMessage: "" },
    { field: "both", hasError: false, errMessage: "" },
  ];

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState(initialErrorData);

  const handleSetError = (variable, message, clearOthers = false) => {
    const updatedErrors = errors.map((field) => {
      if (
        clearOthers &&
        (field.field === "email" || field.field === "password")
      ) {
        return { ...field, hasError: false, errMessage: "" };
      }
      return field.field === variable
        ? { ...field, hasError: true, errMessage: message }
        : field;
    });
    setErrors(updatedErrors);
  };

  const getHasError = (variable) => {
    const errorField = errors.find((field) => field.field === variable);
    return errorField ? errorField.hasError : false;
  };

  const getErrMessage = (variable) => {
    const errorField = errors.find((field) => field.field === variable);
    return errorField ? errorField.errMessage : "";
  };

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const tempErrors = [...initialErrorData];

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === "") {
      tempErrors.find((field) => field.field === "email").hasError = true;
      tempErrors.find((field) => field.field === "email").errMessage =
        "This field is required";
    } else if (!emailPattern.test(email)) {
      tempErrors.find((field) => field.field === "email").hasError = true;
      tempErrors.find((field) => field.field === "email").errMessage =
        "Not a valid email address";
    }

    if (password === "") {
      tempErrors.find((field) => field.field === "password").hasError = true;
      tempErrors.find((field) => field.field === "password").errMessage =
        "This field is required";
    }

    setErrors(tempErrors);

    const hasError = tempErrors.some((field) => field.hasError);
    if (!hasError) {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        // Fetch user data from your backend
        const response = await fetch(`/user/${userCredential.user.uid}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const userData = await response.json();

        // Set the fetched user data to the current user state
        setIsLoggedIn(true);
        setCurrUser(userData);
        localStorage.setItem("currUser", JSON.stringify(userData));

        navigate("/home");
        return userCredential.user;
      } catch (error) {
        console.error("Error signing in:", error);
        handleSetError("both", "Invalid username or password", true);
      }
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
                type={showPassword ? "text" : "password"}
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
              {getHasError("both") && (
                <span className="centerText errorSpanLogin">
                  {getErrMessage("both")}
                </span>
              )}
              <Box className="loginButtonMargin">
                <Button
                  type="submit"
                  variant="contained"
                  className="button pinkButton bigButton flexButton"
                  style={{ textTransform: "none" }}
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
