import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "../../styles/Login.css";
import InputText from "../modals/InputText.js";
import { useState, useEffect } from "react";

const defaultTheme = createTheme();

function Register() {
  const [username, setUsername] = useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [region, setRegion] = useState("");
  const [cityprovince, setCityProvince] = useState("");
  const [district, setDistrict] = useState("");

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
      <Grid container component="main" sx={{ height: "100%" }}>
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
            <span className="welcome" style={{ marginTop: "12px" }}>
              Sign up to Palengkerist!
            </span>
            <br />
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="profile-picture-upload"
              multiple
              type="file"
            />

            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
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
                type="password"
                label="Password"
                required={true}
                setValue={setPassword}
                value={password}
                maxLength={100}
                placeholder="Enter your password"
              />
              <InputText
                type="password"
                label="Confirm Password"
                required={true}
                setValue={setConfirmPassword}
                value={confirmpassword}
                maxLength={100}
                placeholder="Confirm your password"
              />
              <InputText
                type="text"
                label="Email"
                required={true}
                setValue={setEmail}
                value={email}
                maxLength={100}
                placeholder="Enter your email"
              />
              <InputText
                type="text"
                label="Region"
                required={true}
                setValue={setRegion}
                value={region}
                maxLength={100}
                placeholder="Enter your region"
              />
              <InputText
                type="text"
                label="City/Province"
                required={true}
                setValue={setCityProvince}
                value={cityprovince}
                maxLength={100}
                placeholder="Enter your city/province"
              />
              <InputText
                type="text"
                label="District"
                required={true}
                setValue={setDistrict}
                value={district}
                maxLength={100}
                placeholder="Enter your district"
              />

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
                  className="button pinkButton mediaButtonMargin"
                  style={{ textTransform: "none" }}
                  onClick={() => {}}
                >
                  Submit
                </Button>
                <Button
                  variant="outlined"
                  className="outlinedBbutton outlinedPinkButton mediaButtonMargin"
                  style={{ textTransform: "none" }}
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default Register;
