import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import InputText from "../modals/InputText";
import ConfirmModal from "../modals/ConfirmModal";
import HeaderAndDetail from "../modals/HeaderAndDetail";
import RippleButton from "../ui/RippleButton";
import RegionSearch from "../gmaps/RegionSearch";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "../../styles/Login.css";
import { Typography } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { styled } from "@mui/material/styles";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db, auth } from "../../firebase";
import {
  handleSetError,
  getHasError,
  getErrMessage,
} from "../../functions/utils";

const defaultTheme = createTheme();
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

function Register({ ...sharedProps }) {
  const navigate = useNavigate();
  const initialErrorData = [
    { field: "username", hasError: false, errMessage: "" },
    { field: "password", hasError: false, errMessage: "" },
    { field: "confirmPassword", hasError: false, errMessage: "" },
    { field: "email", hasError: false, errMessage: "" },
    { field: "district", hasError: false, errMessage: "" },
    { field: "region", hasError: false, errMessage: "" },
    { field: "city", hasError: false, errMessage: "" },
    { field: "profilePic", hasError: false, errMessage: "" },
  ];
  const fileUploadRef = useRef(null);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [district, setDistrict] = useState("");
  const [region, setRegion] = useState("");
  const [city, setCity] = useState("");
  const [profilePic, setProfilePic] = useState();
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState({});
  const [errors, setErrors] = useState(initialErrorData);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleFileUploadClick = () => {
    if (fileUploadRef.current) {
      fileUploadRef.current.click();
    }
  };
  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    setProfilePic(file);
  };
  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleAddress = () => {
    if (address) {
      // setDistrict(address);
      // setCity(address);
      // setRegion(address);
    }
  };

  useEffect(() => {
    console.log("address", address);
    console.log("location", location);
    handleAddress();
  }, [address, location]);

  const validateDetails = () => {
    // Trim strings
    const trimmedUsername = username.trim();
    const trimmedEmail = email.trim();
    const trimmedDistrict = district.trim();
    const trimmedRegion = region.trim();
    const trimmedCity = city.trim();
    setUsername(trimmedUsername);
    setEmail(trimmedEmail);
    setDistrict(trimmedDistrict);
    setRegion(trimmedRegion);
    setCity(trimmedCity);

    const tempErrors = initialErrorData;

    if (trimmedUsername === "") {
      tempErrors.find((field) => field.field === "username").hasError = true;
      tempErrors.find((field) => field.field === "username").errMessage =
        "This field is required";
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (trimmedEmail === "") {
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
      setOpenConfirmModal(true);
    }
  };

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      formData.append("address", address);
      formData.append("location", JSON.stringify(location));
      formData.append("district", district);
      formData.append("city", city);
      formData.append("region", region);

      if (profilePic) {
        // Check if profilePic is provided
        formData.append("media", profilePic);
        formData.append("mediaFilename", profilePic.name);
        formData.append("mediaType", profilePic.type);
      }

      console.log(formData);

      const response = await fetch(`/user/add/${user.uid}`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        console.log("response not ok");
        throw new Error("Failed to add user to Firestore");
      }

      const data = await response.json();
      console.log("responseok", data);
      setOpenConfirmModal(false);
      navigate("/login");

      return user;
    } catch (error) {
      console.error("Error signing up:", error);
      setOpenConfirmModal(false);
      handleSetError("email", "Email adress already in use", errors, setErrors);
    }
  };

  return (
    <>
      {openConfirmModal === true && (
        <ConfirmModal
          title="Confirm User Details"
          open={openConfirmModal}
          setOpen={setOpenConfirmModal}
          confirmYes={handleRegister}
          context="register"
          noIcon={true}
        >
          <strong className="confirmModalHeaderMarginTop">
            Are all details entered correct?
          </strong>
          <div className="detailsCont">
            {profilePic && (
              <div className="centerProfileModal">
                <Avatar
                  sx={{
                    m: 0,
                    bgcolor: "#FF6262", // Change bgcolor to #FF6262
                    width: 150,
                    height: 150,
                    cursor: "pointer",
                    outline: "2px solid #ff6262",
                  }}
                  src={profilePic && `${URL.createObjectURL(profilePic)}`}
                >
                  <CameraAltIcon sx={{ fontSize: 60 }} />
                </Avatar>
              </div>
            )}
            <HeaderAndDetail
              header="Username"
              detail={username}
              margin="6px 0px 20px 0px"
            />
            <HeaderAndDetail
              header="Email Address"
              detail={email}
              margin="0px 0px 20px 0px"
            />
            {district !== "" && (
              <HeaderAndDetail
                header="District"
                detail={district}
                margin="0px 0px 20px 0px"
              />
            )}
            {region !== "" && (
              <HeaderAndDetail
                header="Region"
                detail={region}
                margin="0px 0px 20px 0px"
              />
            )}
            {city !== "" && (
              <HeaderAndDetail
                header="City"
                detail={city}
                margin="0px 0px 20px 0px"
              />
            )}
            {address !== "" && (
              <HeaderAndDetail
                header="Address"
                detail={address}
                margin="0px 0px 20px 0px"
              />
            )}
          </div>
        </ConfirmModal>
      )}
      <ThemeProvider theme={defaultTheme}>
        <Grid
          container
          component="main"
          sx={{ height: "90%" }}
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
              <span
                className="welcomeLogin centerText signupMargin"
                style={{ marginTop: "12px" }}
              >
                Sign up to Palengkerist!
              </span>
              <br />

              <VisuallyHiddenInput
                type="file"
                ref={fileUploadRef}
                accept="image/*"
                onChange={handleFileInputChange}
              />
              <label className="uploadPicLabel" onClick={handleFileUploadClick}>
                <RippleButton sx={{ borderRadius: "200px !important" }}>
                  <Avatar
                    sx={{
                      m: 0,
                      bgcolor: "#FF6262", // Change bgcolor to #FF6262
                      width: 100,
                      height: 100,
                      cursor: "pointer",
                    }}
                    src={profilePic && `${URL.createObjectURL(profilePic)}`}
                  >
                    <CameraAltIcon sx={{ fontSize: 60 }} />
                  </Avatar>
                </RippleButton>
              </label>
              <Box
                component="form"
                noValidate
                onSubmit={validateDetails}
                sx={{ mt: 1 }}
              >
                <InputText
                  type="text"
                  label="Username"
                  required={true}
                  setValue={setUsername}
                  value={username}
                  maxLength={100}
                  placeholder="Your username"
                  hasError={getHasError("username", errors)}
                  errMessage={getErrMessage("username", errors)}
                />
                <InputText
                  type={showPassword === true ? "text" : "password"}
                  label="Password"
                  required={true}
                  setValue={setPassword}
                  value={password}
                  maxLength={100}
                  placeholder="Your password"
                  hasError={getHasError("password", errors)}
                  errMessage={getErrMessage("password", errors)}
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
                  hasError={getHasError("confirmPassword", errors)}
                  errMessage={getErrMessage("confirmPassword", errors)}
                  visibility={showConfirmPassword}
                  setVisibility={handleConfirmPasswordVisibility}
                  iconOn={<VisibilityIcon className="muiVisibilityIcon" />}
                  iconOff={<VisibilityOffIcon className="muiVisibilityIcon" />}
                />
                <InputText
                  type="text"
                  label="Email Address"
                  required={true}
                  setValue={setEmail}
                  value={email}
                  maxLength={100}
                  placeholder="Your email address"
                  hasError={getHasError("email", errors)}
                  errMessage={getErrMessage("email", errors)}
                />
                {/* <InputText
                  type="text"
                  label="District"
                  setValue={setDistrict}
                  value={district}
                  maxLength={100}
                  placeholder="Your district"
                  hasError={getHasError("district", errors)}
                  errMessage={getErrMessage("district", errors)}
                />
                <InputText
                  type="text"
                  label="City / Province"
                  setValue={setCity}
                  value={city}
                  maxLength={100}
                  placeholder="Your city or province"
                  hasError={getHasError("city", errors)}
                  errMessage={getErrMessage("city", errors)}
                />
                <InputText
                  type="text"
                  label="Region"
                  setValue={setRegion}
                  value={region}
                  maxLength={100}
                  placeholder="Your region"
                  hasError={getHasError("region", errors)}
                  errMessage={getErrMessage("region", errors)}
                /> */}
                <RegionSearch
                  address={address}
                  setAddress={setAddress}
                  setLocation={setLocation}
                  field="address"
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
                    className="button pinkButton bigButton"
                    style={{ textTransform: "none" }}
                    onClick={() => {
                      validateDetails();
                    }}
                  >
                    Submit
                  </Button>
                </Box>
                <div className="loginSpan centerText">
                  <span className="spanText">Already have an account? </span>
                  <Link
                    href="/login"
                    variant="body2"
                    style={{ textDecoration: "underline" }}
                    className="spanText"
                  >
                    Login
                  </Link>
                </div>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
}

export default Register;
