import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import "../../styles/Login.css";

const defaultTheme = createTheme();

function Register() {
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
      <Grid container component="main" sx={{ height: "90%" }}>
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
            <label htmlFor="profile-picture-upload">
              <Avatar
                sx={{
                  m: 1,
                  bgcolor: "#FF6262", // Change bgcolor to #FF6262
                  width: 100,
                  height: 100,
                }}
              >
                <CameraAltIcon sx={{ fontSize: 60 }} />
              </Avatar>
            </label>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Username"
                name="email"
                autoComplete="email"
                autoFocus
                variant="outlined"
                InputLabelProps={{ style: { color: "#696969" } }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#d4d4d4",
                      borderRadius: "24px",
                    },
                    "&:hover fieldset": {
                      borderColor: "#d4d4d4",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#FFBA5A",
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
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="current-password"
                autoFocus
                variant="outlined"
                InputLabelProps={{ style: { color: "#696969" } }}
                InputProps={{
                  endAdornment: (
                    <Button onClick={handlePasswordVisibility}>
                      {showPassword ? (
                        <VisibilityIcon sx={{ color: "#E74F4F" }} />
                      ) : (
                        <VisibilityOffIcon sx={{ color: "#E74F4F" }} />
                      )}
                    </Button>
                  ),
                  style: { backgroundColor: "#ffffff", borderRadius: "24px" },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#d4d4d4",
                      borderRadius: "24px",
                    },
                    "&:hover fieldset": {
                      borderColor: "#d4d4d4",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#FFBA5A",
                      borderWidth: 2,
                    },
                  },
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                autoComplete="current-password"
                autoFocus
                variant="outlined"
                InputLabelProps={{ style: { color: "#696969" } }}
                InputProps={{
                  endAdornment: (
                    <Button onClick={handlePasswordVisibility}>
                      {showPassword ? (
                        <VisibilityIcon sx={{ color: "#E74F4F" }} />
                      ) : (
                        <VisibilityOffIcon sx={{ color: "#E74F4F" }} />
                      )}
                    </Button>
                  ),
                  style: { backgroundColor: "#ffffff", borderRadius: "24px" },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#d4d4d4",
                      borderRadius: "24px",
                    },
                    "&:hover fieldset": {
                      borderColor: "#d4d4d4",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#FFBA5A",
                      borderWidth: 2,
                    },
                  },
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                variant="outlined"
                InputLabelProps={{ style: { color: "#696969" } }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#d4d4d4",
                      borderRadius: "24px",
                    },
                    "&:hover fieldset": {
                      borderColor: "#d4d4d4",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#FFBA5A",
                      borderWidth: 2,
                    },
                  },
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="region"
                label="Region"
                name="region"
                autoComplete="region"
                autoFocus
                variant="outlined"
                InputLabelProps={{ style: { color: "#696969" } }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#d4d4d4",
                      borderRadius: "24px",
                    },
                    "&:hover fieldset": {
                      borderColor: "#d4d4d4",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#FFBA5A",
                      borderWidth: 2,
                    },
                  },
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="city/prov"
                label="City/Province"
                name="city/prov"
                autoComplete="city/prov"
                autoFocus
                variant="outlined"
                InputLabelProps={{ style: { color: "#696969" } }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#d4d4d4",
                      borderRadius: "24px",
                    },
                    "&:hover fieldset": {
                      borderColor: "#d4d4d4",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#FFBA5A",
                      borderWidth: 2,
                    },
                  },
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="district"
                label="District"
                name="district"
                autoComplete="district"
                autoFocus
                variant="outlined"
                InputLabelProps={{ style: { color: "#696969" } }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#d4d4d4",
                      borderRadius: "24px",
                    },
                    "&:hover fieldset": {
                      borderColor: "#d4d4d4",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#FFBA5A",
                      borderWidth: 2,
                    },
                  },
                }}
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
