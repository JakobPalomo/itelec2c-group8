import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "../../styles/Login.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const defaultTheme = createTheme();

function Login({ ...sharedProps }) {
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
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                variant="outlined"
                InputLabelProps={{ style: { color: "#696969" } }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#d4d4d4", // Normal border color
                      borderRadius: "24px", // Border radius
                    },
                    "&:hover fieldset": {
                      borderColor: "#d4d4d4", // Border color on hover
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#FFBA5A", // Border color on focus
                      borderWidth: 2,
                    },
                  },
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"} // Show password if showPassword is true
                id="password"
                autoComplete="current-password"
                variant="outlined"
                InputLabelProps={{ style: { color: "#696969" } }}
                InputProps={{
                  style: { backgroundColor: "#ffffff", borderRadius: "24px" },
                  endAdornment: (
                    <Button onClick={handlePasswordVisibility}>
                      {showPassword ? (
                        <VisibilityIcon sx={{ color: "#E74F4F" }} />
                      ) : (
                        <VisibilityOffIcon sx={{ color: "#E74F4F" }} />
                      )}
                    </Button>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#d4d4d4", // Normal border color
                      borderRadius: "24px", // Border radius
                    },
                    "&:hover fieldset": {
                      borderColor: "#d4d4d4", // Border color on hover
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#FFBA5A", // Border color on focus
                      borderWidth: 2,
                    },
                  },
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  backgroundColor: "#FF6262", // Button background color
                  borderRadius: "10px", // Border radius
                  "&:hover": {
                    backgroundColor: "#E74F4F", // Button hover background color
                  },
                }}
              >
                Sign In
              </Button>

              <Grid container>
                <Grid item xs>
                  <Link
                    href="#"
                    variant="body2"
                    style={{ color: "#4f4f4f", textDecoration: "none" }}
                  >
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <span style={{ color: "#4f4f4f" }}>
                    Don't have an account?{" "}
                  </span>
                  <Link
                    href="#"
                    variant="body2"
                    style={{ color: "#4f4f4f", textDecoration: "underline" }}
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
