import React, { useState } from "react";
import { Link } from "react-router-dom";
import InputText from "../modals/InputText.js";
import Profile from "./Profile";
import { TextField, Grid, Avatar, Button } from "@mui/material";
import "../../styles/EditProfile.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

function EditProfile({
  isEditProfileOpen,
  setIsEditProfileOpen,
  ...sharedProps
}) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [coverPhoto, setCoverPhoto] = useState(null); // State for cover photo
  const [pfpPhoto, setPfpPhoto] = useState(null); // State for profile picture
  const [showPassword, setShowPassword] = React.useState(false);
  const [password, setPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState([]);

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleCoverPhotoChange = (e) => {
    setCoverPhoto(e.target.files[0]);
  };

  const handlePfpPhotoChange = (e) => {
    setPfpPhoto(e.target.files[0]);
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

  const handleError = (field, message) => {
    setErrors((prevErrors) => [
      ...prevErrors,
      { field, hasError: true, errMessage: message },
    ]);
  };

  return (
    <>
      <Profile
        isEditProfileOpen={isEditProfileOpen}
        setIsEditProfileOpen={setIsEditProfileOpen}
      />
      <div className="editprofile">
        <div className="editfields">
          <div className="fields">
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
          </div>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#2C2329",
              padding: "10px 100px",
              boxShadow: "none",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "#2C2329",
              },
            }}
          >
            Delete Account
          </Button>
          <div className="editbuttons">
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#FF6262",
                padding: "12px 20px",
                marginLeft: "50px",
                boxShadow: "none",
                textTransform: "none",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#FF5A5A",
                  boxShadow: "none",
                },
              }}
            >
              Save Changes
            </Button>
            {/* setIsEditProfileOpen */}
            <div>
              <Link
                to={`/account`}
                style={{
                  textDecoration: "none",
                }}
                onClick={() => setIsEditProfileOpen(false)}
              >
                <Button
                  variant="outlined"
                  sx={{
                    backgroundColor: "#FFFFFF",
                    color: "#FF6262",
                    border: "2px #FF6262 solid",
                    padding: "10px 45px",
                    marginRight: "50px",
                    boxShadow: "none",
                    textTransform: "none",
                    fontWeight: "bold",
                    "&:hover": {
                      backgroundColor: "#FFFFFF",
                      border: "2px #e74f4f solid",
                      color: "#FF6262",
                    },
                  }}
                >
                  Cancel
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditProfile;
