import React, { useState } from "react";
import { TextField, Grid, Avatar, Button } from "@mui/material";
import "../../styles/EditProfile.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Typography from "@mui/material/Typography";
import DeleteAccount from "../modals/DeleteAccount";
import InputText from "../modals/InputText.js";

function EditProfile({ setEditProfileClicked }) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [pfpPhoto, setPfpPhoto] = useState(null);
  const [showPassword, setShowPassword] = React.useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleCoverPhotoChange = (e) => {
    setCoverPhoto(e.target.files[0]);
  };

  const handlePfpPhotoChange = (e) => {
    setPfpPhoto(e.target.files[0]);
  };

  const handleDeleteAccountClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="editprofile">
      <div className="editphoto">
        <Grid container spacing={2} alignItems="center">
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
            required={false}
            setValue={setName}
            value={name}
            maxLength={100}
            placeholder="Username"
            sx={{ width: "100px" }}
          />
          <InputText
            type="text"
            label="Edit Location:"
            required={false}
            setValue={setAddress}
            value={address}
            maxLength={255}
            placeholder="Select a location in the map"
          />
          <Typography variant="subtitle2">Password</Typography>
          <InputText
            margin="normal"
            required
            fullWidth
            name="password"
            type={showPassword ? "text" : "password"}
            id="password"
            autoComplete="current-password"
            placeholder="Enter your current password"
            variant="outlined"
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
          <Typography variant="subtitle2">Confirm Password</Typography>
          <InputText
            margin="normal"
            required
            fullWidth
            name="password"
            type={showPassword ? "text" : "password"}
            id="password"
            autoComplete="new-password"
            placeholder="Enter your new password"
            variant="outlined"
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
        </div>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#2C2329", padding: "10px 100px" }}
          onClick={handleDeleteAccountClick}
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
      <DeleteAccount
        open={isDeleteModalOpen}
        onClose={handleDeleteModalClose}
        title="Delete Account"
        onConfirmDelete={() => {}}
        onCancelDelete={handleDeleteModalClose}
      />
    </div>
  );
}

export default EditProfile;
