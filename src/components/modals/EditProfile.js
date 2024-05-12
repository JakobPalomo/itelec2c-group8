import React, { useState } from "react";
import InputText from "./InputText.js";
import { TextField, Grid, Avatar, Button } from "@mui/material";
import "../../styles/EditProfile.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

function EditProfile({ setEditProfileClicked }) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [coverPhoto, setCoverPhoto] = useState(null); // State for cover photo
  const [pfpPhoto, setPfpPhoto] = useState(null); // State for profile picture
  const [showPassword, setShowPassword] = React.useState(false);

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleCoverPhotoChange = (e) => {
    setCoverPhoto(e.target.files[0]);
  };

  const handlePfpPhotoChange = (e) => {
    setPfpPhoto(e.target.files[0]);
  };

  return (
    <div className="editprofile">
      <div className="editphoto">
        <Grid container spacing={2} alignItems="center">
          {/* Profile editing fields */}
          <Grid item xs={12}>
            <div className="cover" />
          </Grid>
          <Grid item xs={12}>
            <div
              className="profile"
              style={{
                position: "relative",
                textAlign: "center",
                marginBottom: "20px",
              }}
            >
              <Avatar
                className="avatar"
                alt="Aliah"
                src="/assets/pfp.jpg"
                sx={{ width: 150, height: 150 }}
              />
            </div>
          </Grid>
        </Grid>
      </div>
      <div className="editfields">
        <div>
          <InputText
            type="text"
            label="Edit Username:"
            required={true}
            setValue={setName}
            value={name}
            maxLength={100}
            placeholder="Username"
            sx={{ width: "100px" }}
          />
          <InputText
            type="text"
            label="Edit Location:"
            required={true}
            setValue={setAddress}
            value={address}
            maxLength={255}
            placeholder="Select a location in the map"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="New Password:"
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
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Confirm New Password:"
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
        </div>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#2C2329", padding: "10px 100px" }}
        >
          Delete Account
        </Button>
        <div className="editbuttons">
          <Button
            variant="contained"
            sx={{ backgroundColor: "#FF6262", padding: "10px 20px" }}
          >
            Save Changes
          </Button>
          <Button
            variant="outlined"
            sx={{
              backgroundColor: "#FFFFFF",
              color: "#FF6262",
              border: "1px #FF6262 solid",
              padding: "10px 45px",
            }}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
