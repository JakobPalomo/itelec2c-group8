import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "../../styles/Login.css";
import InputText from "../modals/InputText.js";
import { useState, useEffect } from "react";

const defaultTheme = createTheme();

function Login({ ...sharedProps }) {
  const [showPassword, setShowPassword] = React.useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
      <Grid container component="main" sx={{ height: "90vh" }}>
        <CssBaseline />
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
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 15 }}
            >
              <span className="welcome" style={{ marginTop: "12px" }}>
                Hello, Welcome!
              </span>
              <br />
              <InputText
                type="text"
                label="Username"
                required={true}
                setValue={setUsername}
                value={username}
                maxLength={100}
                placeholder="Enter your username"
              />
              <InputText
                type="Password"
                label="Password"
                required={true}
                setValue={setPassword}
                value={password}
                maxLength={100}
                placeholder="Enter your password"
              />
              <Grid container justifyContent="flex-end">
                <Grid item xs={12} sm="auto">
                  <Link
                    href="#"
                    variant="body2"
                    style={{
                      color: "#4f4f4f",
                      textDecoration: "none",
                      display: { xs: "none", sm: "inline" },
                    }}
                  >
                    Forgot password?
                  </Link>
                </Grid>
              </Grid>
              <Grid container justifyContent="center">
                <Grid item xs={12} sx={{ textAlign: "center" }}></Grid>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                    backgroundColor: "#FF6262",
                    borderRadius: "10px",
                    boxShadow: "none",
                    width: "100%",
                    height: "50px",
                    "&:hover": {
                      backgroundColor: "#E74F4F",
                      boxShadow: "none",
                    },
                    typography: {
                      fontSize: "16px",
                      fontWeight: "bold",
                    },
                  }}
                >
                  Sign In
                </Button>
              </Grid>
              <Grid container justifyContent="center">
                <Grid item xs={12} sx={{ textAlign: "center" }}>
                  <span style={{ color: "#4f4f4f" }}>
                    Don't have an account?{" "}
                  </span>
                  <Link
                    href="/register"
                    variant="body2"
                    style={{ color: "#FF6262", textDecoration: "underline" }}
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
