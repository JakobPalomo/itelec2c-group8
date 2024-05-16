import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  getAuth,
  signInWithEmailAndPassword,
  reauthenticateWithCredential,
  updatePassword,
  EmailAuthProvider,
} from "firebase/auth";
import { auth } from "../../firebase";
import InputText from "../modals/InputText.js";
import Profile from "./Profile";
import ConfirmModal from "../modals/ConfirmModal";
import HeaderAndDetail from "../modals/HeaderAndDetail";
import { TextField, Grid, Avatar, Button } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { MuiOtpInput } from "mui-one-time-password-input";
import emailjs from "@emailjs/browser";
import "../../styles/EditProfile.css";

import {
  stringAvatar,
  stringToColor,
  handleSetError,
  getHasError,
  getErrMessage,
} from "../../functions/utils.js";

function EditProfile({
  isEditProfileOpen,
  setIsEditProfileOpen,
  profile,
  setProfile,
  setIsLoggedIn,
  ...sharedProps
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const initialEditProfileErrorData = [
    { field: "username", hasError: false, errMessage: "" },
    { field: "district", hasError: false, errMessage: "" },
    { field: "region", hasError: false, errMessage: "" },
    { field: "city", hasError: false, errMessage: "" },
    { field: "profilePic", hasError: false, errMessage: "" },
    { field: "all", hasError: false, errMessage: "" },
  ];
  const initialChangePassErrorData = [
    { field: "oldPassword", hasError: false, errMessage: "" },
    { field: "password", hasError: false, errMessage: "" },
    { field: "confirmPassword", hasError: false, errMessage: "" },
    { field: "all", hasError: false, errMessage: "" },
  ];
  const initialDeleteAccountErrorData = [
    { field: "emailDelete", hasError: false, errMessage: "" },
    { field: "passwordDelete", hasError: false, errMessage: "" },
    { field: "all", hasError: false, errMessage: "" },
  ];
  const initialOTPErrorData = [
    { field: "otp", hasError: false, errMessage: "" },
  ];

  const [username, setUsername] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [coverPhoto, setCoverPhoto] = useState(); // State for cover photo

  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [emailDelete, setEmailDelete] = useState("");
  const [passwordDelete, setPasswordDelete] = useState("");

  const [generatedOTP, setGeneratedOTP] = useState(0);
  const [isOTPGenerated, setIsOTPGenerated] = useState(false);
  const [otp, setOtp] = useState("");
  const [recendClicked, setResendClicked] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [timerRunning, setTimerRunning] = useState(false);

  // Errors
  const [editProfileErrors, setEditProfileErrors] = useState(
    initialEditProfileErrorData
  );
  const [changePassErrors, setChangePassErrors] = useState(
    initialChangePassErrorData
  );
  const [deleteAccountErrors, setDeleteAccountErrors] = useState(
    initialDeleteAccountErrorData
  );
  const [OTPError, setOTPError] = useState(initialOTPErrorData);

  // Confirm Modals
  const [openEditProfileConfirmModal, setOpenEditProfileConfirmModal] =
    useState(false);
  const [openEditPassConfirmModal, setOpenEditPassConfirmModal] =
    useState(false);
  const [openOTPModal, setOpenOTPModal] = useState(false);
  const [openDeleteAccountConfirmModal, setOpenDeleteAccountConfirmModal] =
    useState(false);

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const getProfileSrc = () => {
    if (profile) {
      return `${URL.createObjectURL(profile)}`;
    } else if (sharedProps.userProfilePic.path) {
      return sharedProps.userProfilePic.path;
    } else {
      return "";
    }
  };

  useEffect(() => {
    handleEditProfileReset();
  }, []);

  const handleEditProfileReset = () => {
    setUsername(sharedProps.currUser.username);
    setDistrict(sharedProps.currUser.district);
    setRegion(sharedProps.currUser.region);
    setCity(sharedProps.currUser.city);
    setProfile("");
  };

  // EDIT USER DETAILS
  const validateEditProfileDetails = () => {
    // Trim strings
    const trimmedUsername = username.trim();
    const trimmedDistrict = district.trim();
    const trimmedRegion = region.trim();
    const trimmedCity = city.trim();
    setUsername(trimmedUsername);
    setDistrict(trimmedDistrict);
    setRegion(trimmedRegion);
    setCity(trimmedCity);

    const tempErrors = initialEditProfileErrorData;

    if (trimmedUsername === "") {
      tempErrors.find((field) => field.field === "username").hasError = true;
      tempErrors.find((field) => field.field === "username").errMessage =
        "This field is required";
    }

    if (
      trimmedUsername === sharedProps.currUser.username &&
      trimmedDistrict === sharedProps.currUser.district &&
      trimmedRegion === sharedProps.currUser.region &&
      trimmedCity === sharedProps.currUser.city
    ) {
      if (profile) {
        // there is file upload
      } else {
        tempErrors.find((field) => field.field === "all").hasError = true;
        tempErrors.find((field) => field.field === "all").errMessage =
          "Nothing has changed";
      }
    }

    setEditProfileErrors(tempErrors);

    const hasError = tempErrors.some((field) => field.hasError);
    if (!hasError) {
      setOpenEditProfileConfirmModal(true);
    }
  };

  const handleEditProfile = async () => {
    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("district", district);
      formData.append("city", city);
      formData.append("region", region);

      if (profile) {
        // Check if a file is provided
        formData.append("media", profile);
        formData.append("mediaFilename", profile.name);
        formData.append("mediaType", profile.type);
      }

      console.log(formData);

      const response = await fetch(
        `/user/edit-profile/${sharedProps.currUser.id}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to edit user profile");
      }

      const data = await response.json();

      try {
        // Fetch user data
        const response = await fetch(`/user/${sharedProps.currUser.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const userData = await response.json();
        sharedProps.setCurrUser(userData);
        console.log(sharedProps.currUser);
        console.log(sharedProps.userList);
      } catch (error) {
        console.log("Fetch user data failed", error);
      }

      console.log("Profile updated successfully");
      setOpenEditProfileConfirmModal(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error;
    }
  };

  // EDIT PASSWORD
  const validateEditPassDetails = async () => {
    const tempErrors = initialChangePassErrorData;

    // Validation checks
    if (oldPassword === "") {
      tempErrors.find((field) => field.field === "oldPassword").hasError = true;
      tempErrors.find((field) => field.field === "oldPassword").errMessage =
        "This field is required";
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

    const auth = getAuth();
    const inithasError = tempErrors.some((field) => field.hasError);
    console.log("Initial errors:", inithasError); // Log initial errors status

    if (!inithasError) {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          sharedProps.currUser.email,
          oldPassword
        );
        // If sign-in is successful, the password is correct
        console.log("Re-authentication successful");
      } catch (error) {
        console.log("Error code:", error.code);
        // If sign-in fails, the password is incorrect
        if (error.code === "auth/invalid-credential") {
          console.log("Inside wrong password block");
          tempErrors.find(
            (field) => field.field === "oldPassword"
          ).hasError = true;
          tempErrors.find((field) => field.field === "oldPassword").errMessage =
            "Wrong password";
        } else {
          tempErrors.find((field) => field.field === "all").hasError = true;
          tempErrors.find((field) => field.field === "all").errMessage =
            "An error occurred, please try again later";
        }
        setChangePassErrors(tempErrors);
        return; // Exit if there's an error with old password
      }

      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          sharedProps.currUser.email,
          password
        );
        tempErrors.find((field) => field.field === "password").hasError = true;
        tempErrors.find((field) => field.field === "password").errMessage =
          "Cannot be the same password";
        setChangePassErrors(tempErrors);
        console.log("Password cannot be the same"); // Log same password issue
        return; // Exit if new password is the same as the old one
      } catch (error) {
        // If sign-in fails, it means new password is different from old one, which is good
        console.log("New password is valid");
      }
    }

    setChangePassErrors(tempErrors);

    const hasError = tempErrors.some((field) => field.hasError);
    if (!hasError) {
      setOpenEditPassConfirmModal(true);
      console.log("No errors, ready to change password"); // Log success case
    }
  };

  const handleChangePassword = async () => {
    const user = auth.currentUser;

    if (!user) {
      console.error("No user is currently signed in");
      handleSetError(
        "all",
        "An error occured, please try again later.",
        changePassErrors,
        setChangePassErrors
      );
      setOpenEditPassConfirmModal(false);
      return;
    }

    // Create a credential for re-authentication
    const credential = EmailAuthProvider.credential(user.email, oldPassword);

    try {
      // Re-authenticate the user
      await reauthenticateWithCredential(user, credential);
      console.log("User re-authenticated");

      // Update the password
      await updatePassword(user, password);
      console.log("Password updated successfully");
      setOpenEditPassConfirmModal(false);
      setIsEditProfileOpen(false);
      navigate("/login");
    } catch (error) {
      console.error("Error updating password:", error);
      handleSetError(
        "all",
        "An error occured, please try again later.",
        changePassErrors,
        setChangePassErrors
      );
      setOpenEditPassConfirmModal(false);
    }
  };

  //DELETE ACCOUNT
  const validateDeleteAccount = async () => {
    const tempErrors = initialDeleteAccountErrorData;

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailDelete === "") {
      tempErrors.find((field) => field.field === "emailDelete").hasError = true;
      tempErrors.find((field) => field.field === "emailDelete").errMessage =
        "This field is required";
    } else if (!emailPattern.test(emailDelete)) {
      tempErrors.find((field) => field.field === "emailDelete").hasError = true;
      tempErrors.find((field) => field.field === "emailDelete").errMessage =
        "Not a valid email address";
    }

    if (passwordDelete === "") {
      tempErrors.find(
        (field) => field.field === "passwordDelete"
      ).hasError = true;
      tempErrors.find((field) => field.field === "passwordDelete").errMessage =
        "This field is required";
    }
    console.log(`pass is empty: ${password === ""}`);
    console.log(password);

    setDeleteAccountErrors(tempErrors);

    const hasError = tempErrors.some((field) => field.hasError);
    if (!hasError) {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          emailDelete,
          passwordDelete
        );
        setOpenOTPModal(true);
      } catch (error) {
        console.error("Error signing in:", error);
        console.log(error.code);
        if (error.code === "auth/invalid-credentials") {
          handleSetError(
            "all",
            "Invalid username or password",
            deleteAccountErrors,
            setDeleteAccountErrors
          );
        } else {
          handleSetError(
            "all",
            "An error occured, please try again later.",
            deleteAccountErrors,
            setDeleteAccountErrors
          );
        }
      }
    }
  };

  useEffect(() => {
    console.log(getHasError("all", deleteAccountErrors));
    console.log(getErrMessage("all", deleteAccountErrors));
    console.log(deleteAccountErrors);
  }, [deleteAccountErrors]);

  const handleDeleteAccount = async () => {
    // Delete the user from Firebase Authentication
    try {
      const response = await fetch(`/user/delete/${sharedProps.currUser.id}`, {
        method: "PUT",
      });

      if (!response.ok) {
        throw new Error(response.status);
      }

      const data = await response.text();
      console.log(data);

      setIsLoggedIn(false);
      localStorage.removeItem("currUser");
      sharedProps.setCurrUser({});
      setIsEditProfileOpen(false);
      navigate("/login");
      console.log(`Successfully deleted user: ${sharedProps.currUser.id}`);
    } catch (error) {
      console.error("Error deleting user:", error.message);
      handleSetError(
        "all",
        "An error occured, please try again later.",
        deleteAccountErrors,
        setDeleteAccountErrors
      );
    }
  };

  //OTP VERIFICATION
  const serviceId = "service_2rae78o";
  const templateId = "template_i5girgd";
  const publicKey = "WhMuOqSUglpspgNFJ";

  const sendEmail = () => {
    emailjs
      .send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        console.log("Email sent successfully!", response);
      })
      .catch((error) => {
        console.error("Error sending email:", error);
      });
  };

  const templateParams = {
    from_email: "irarayzel.ji.cics@ust.edu.ph",
    to_email: emailDelete,
    otp: generatedOTP,
  };

  useEffect(() => {
    if (openOTPModal === true) {
      generateOTP();
      startTimer();
      setTimerRunning(true);
    } else {
      setTimerRunning(false);
      setOtp("");
      setOTPError(initialOTPErrorData);
    }
  }, [openOTPModal]);

  useEffect(() => {
    let timerInterval;
    // Start the timer when timerRunning becomes true
    if (timerRunning === true) {
      const timerInterval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 0) {
            clearInterval(timerInterval);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      // Clear interval on component unmount
      return () => {
        clearInterval(timerInterval);
        setTimerRunning(false);
      };
    } else {
      setTimeLeft(0);
    }
  }, [timerRunning]);

  useEffect(() => {
    if (timeLeft === 0) {
      setTimerRunning(false);
    }
  }, [timeLeft]);

  const generateOTP = () => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    setGeneratedOTP(otp);
    console.log(otp);
  };

  // Function to start the timer
  const startTimer = () => {
    setTimeLeft(300);
    setTimerRunning(true);
  };

  // Function to format time in mm:ss format
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? "0" + minutes : minutes}:${
      seconds < 10 ? "0" + seconds : seconds
    }`;
  };

  const handleOtpChange = (value) => {
    setOtp(value);
  };

  const validateChar = (value, index) => {
    return matchIsNumeric(value);
  };
  const matchIsString = (value) => {
    return typeof value === "string";
  };
  const matchIsNumeric = (text) => {
    const isNumber = typeof text === "number";
    const isString = matchIsString(text);
    return (isNumber || (isString && text !== "")) && !isNaN(Number(text));
  };

  const handleResend = () => {
    // generate otp before start timer
    generateOTP();
    setIsOTPGenerated(true);
    startTimer();
    setOtp("");
    setOTPError(initialOTPErrorData);
  };

  useEffect(() => {
    if (generatedOTP !== 0 && generatedOTP !== "0") {
      sendEmail();
      console.log("sent email with", generatedOTP);
    }
  }, [generatedOTP]);

  const handleOTPVerify = (option) => {
    if (option === true) {
      const tempErrors = initialOTPErrorData;

      if (parseInt(otp) !== generatedOTP) {
        tempErrors.find((field) => field.field === "otp").hasError = true;
        tempErrors.find((field) => field.field === "otp").errMessage =
          "Incorrect OTP";
      }

      setOTPError(tempErrors);

      if (
        tempErrors.find((field) => field.field === "otp").hasError === false
      ) {
        setIsOTPGenerated(false);
        setOtp("");
        setGeneratedOTP(0);
        setOpenOTPModal(false);
        setOpenDeleteAccountConfirmModal(true);
      }
    } else {
      setOpenOTPModal(false);
    }
  };

  return (
    <>
      {openEditProfileConfirmModal === true && (
        <ConfirmModal
          title="Confirm User Details"
          open={openEditProfileConfirmModal}
          setOpen={setOpenEditProfileConfirmModal}
          confirmYes={handleEditProfile}
          context="editProfile"
          noIcon={true}
        >
          <strong className="confirmModalHeaderMarginTop">
            Are all details entered correct?
          </strong>
          <div className="detailsCont">
            {getProfileSrc() && (
              <div className="centerAvatar">
                <Avatar
                  {...(sharedProps.currUser.username &&
                    stringAvatar(sharedProps.currUser.username))}
                  sx={{ bgcolor: "#B92F37" }}
                  className="avatarConfirm"
                  alt="Aliah"
                  src={getProfileSrc()} ///assets/pfp.jpg
                />
              </div>
            )}
            <HeaderAndDetail
              header="Username"
              detail={username}
              margin="6px 0px 20px 0px"
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
          </div>
        </ConfirmModal>
      )}
      {openEditPassConfirmModal === true && (
        <ConfirmModal
          title="Confirm Change"
          open={openEditPassConfirmModal}
          setOpen={setOpenEditPassConfirmModal}
          confirmYes={handleChangePassword}
          context="changePassword"
        >
          <div>
            Are you sure you want to change your password? You will be signed
            out.
          </div>
        </ConfirmModal>
      )}
      {openDeleteAccountConfirmModal === true && (
        <ConfirmModal
          title="Confirm Delete"
          open={openDeleteAccountConfirmModal}
          setOpen={setOpenDeleteAccountConfirmModal}
          confirmYes={handleDeleteAccount}
          context="deleteAccount"
        >
          <div>
            Are you sure you want to delete this account? You won't be able to
            login again into this account.
          </div>
        </ConfirmModal>
      )}
      {openOTPModal === true && (
        <ConfirmModal
          title="OTP Verification"
          open={openOTPModal}
          setOpen={setOpenOTPModal}
          confirmYes={handleOTPVerify}
          context="verifyOTP"
          noIcon={true}
          yesText="Verify"
          noText="Cancel"
        >
          <p className="subtextLogin">
            Enter the OTP code sent to{" "}
            <span className="emailSpan">{emailDelete}</span>
          </p>
          <div className="otpFieldModalMargin">
            <MuiOtpInput
              value={otp}
              onChange={handleOtpChange}
              length={6}
              autoFocus
              validateChar={validateChar}
              gap={2}
            />
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              className="errorSpanNoLabel"
            >
              {getHasError("otp", OTPError) === true && (
                <span>{getErrMessage("otp", OTPError)}</span>
              )}
            </Typography>
          </div>
          <p className="subtextLogin">Didn’t receive the OTP code?</p>
          {timeLeft != 0 ? (
            <p className="subtextLogin">
              Resend Code in{" "}
              <span className="emailSpan">{formatTime(timeLeft)}</span>
            </p>
          ) : (
            <p className="subtextLogin">
              <span
                className="resendSpan"
                onClick={() => {
                  handleResend();
                }}
              >
                Resend Code
              </span>
            </p>
          )}
        </ConfirmModal>
      )}
      <Profile
        isEditProfileOpen={isEditProfileOpen}
        setIsEditProfileOpen={setIsEditProfileOpen}
        profile={profile}
        setProfile={setProfile}
        {...sharedProps}
      />
      <div className="editprofile">
        <div className="editfields">
          <div className="fields">
            <h1>Edit User Details</h1>
            <InputText
              type="text"
              label="Username"
              required={true}
              setValue={setUsername}
              value={username}
              maxLength={100}
              placeholder="Your username"
              sx={{ width: "100px" }}
              hasError={getHasError("username", editProfileErrors)}
              errMessage={getErrMessage("username", editProfileErrors)}
            />
            <InputText
              type="text"
              label="District"
              setValue={setDistrict}
              value={district}
              maxLength={100}
              placeholder="Your district"
              hasError={getHasError("district", editProfileErrors)}
              errMessage={getErrMessage("district", editProfileErrors)}
            />
            <InputText
              type="text"
              label="Region"
              setValue={setRegion}
              value={region}
              maxLength={100}
              placeholder="Your region"
              hasError={getHasError("region", editProfileErrors)}
              errMessage={getErrMessage("region", editProfileErrors)}
            />
            <InputText
              type="text"
              label="City / Province"
              setValue={setCity}
              value={city}
              maxLength={100}
              placeholder="Your city or province"
              hasError={getHasError("city", editProfileErrors)}
              errMessage={getErrMessage("city", editProfileErrors)}
            />
            {getHasError("all", editProfileErrors) && (
              <span className="centerText errorSpanProfile">
                {getErrMessage("all", editProfileErrors)}
              </span>
            )}
            <div className="editButtons">
              <Box>
                <Button
                  type="button"
                  variant="contained"
                  className="button pinkButton bigButton otpButtonWidth"
                  style={{ textTransform: "none" }}
                  onClick={validateEditProfileDetails}
                >
                  Save
                </Button>
                <Link href="/account">
                  <Button
                    type="button"
                    variant="outlined"
                    className="outlinedButton outlinedPinkButton bigButton otpButtonWidth"
                    style={{
                      textTransform: "none",
                      backgroundColor: "rgba(0,0,0,0.5) !important",
                      color: "",
                    }}
                    onClick={handleEditProfileReset}
                  >
                    Reset
                  </Button>
                </Link>
              </Box>
            </div>
            <br />
            <h1>Edit Password</h1>
            <InputText
              type={showPassword === true ? "text" : "password"}
              label="Old Password"
              required={true}
              setValue={setOldPassword}
              value={oldPassword}
              maxLength={100}
              placeholder="Your old password"
              hasError={getHasError("oldPassword", changePassErrors)}
              errMessage={getErrMessage("oldPassword", changePassErrors)}
              visibility={showPassword}
              setVisibility={handlePasswordVisibility}
              iconOn={<VisibilityIcon className="muiVisibilityIcon" />}
              iconOff={<VisibilityOffIcon className="muiVisibilityIcon" />}
            />
            <InputText
              type={showPassword === true ? "text" : "password"}
              label="New Password"
              required={true}
              setValue={setPassword}
              value={password}
              maxLength={100}
              placeholder="Your new password"
              hasError={getHasError("password", changePassErrors)}
              errMessage={getErrMessage("password", changePassErrors)}
              visibility={showPassword}
              setVisibility={handlePasswordVisibility}
              iconOn={<VisibilityIcon className="muiVisibilityIcon" />}
              iconOff={<VisibilityOffIcon className="muiVisibilityIcon" />}
            />
            <InputText
              type={showConfirmPassword === true ? "text" : "password"}
              label="Confirm New Password"
              required={true}
              setValue={setConfirmPassword}
              value={confirmPassword}
              maxLength={100}
              placeholder="Confirm your new password"
              hasError={getHasError("confirmPassword", changePassErrors)}
              errMessage={getErrMessage("confirmPassword", changePassErrors)}
              visibility={showConfirmPassword}
              setVisibility={handleConfirmPasswordVisibility}
              iconOn={<VisibilityIcon className="muiVisibilityIcon" />}
              iconOff={<VisibilityOffIcon className="muiVisibilityIcon" />}
            />
            {getHasError("all", changePassErrors) && (
              <span className="centerText errorSpanProfile">
                {getErrMessage("all", changePassErrors)}
              </span>
            )}
            <div className="editButtons">
              <Box>
                <Button
                  type="button"
                  variant="contained"
                  className="button pinkButton bigButton otpButtonWidth"
                  style={{ textTransform: "none", width: "fit-content" }}
                  onClick={validateEditPassDetails}
                >
                  Change Password
                </Button>
              </Box>
            </div>
            <br />
            <h1>Delete Account</h1>
            <InputText
              type="text"
              label="Email Address"
              required={true}
              setValue={setEmailDelete}
              value={emailDelete}
              maxLength={100}
              placeholder="Your email address"
              sx={{ width: "100px" }}
              hasError={getHasError("emailDelete", deleteAccountErrors)}
              errMessage={getErrMessage("emailDelete", deleteAccountErrors)}
            />
            <InputText
              type={showPassword === true ? "text" : "password"}
              label="Password"
              required={true}
              setValue={setPasswordDelete}
              value={passwordDelete}
              maxLength={100}
              placeholder="Your password"
              hasError={getHasError("passwordDelete", deleteAccountErrors)}
              errMessage={getErrMessage("passwordDelete", deleteAccountErrors)}
              visibility={showPassword}
              setVisibility={handlePasswordVisibility}
              iconOn={<VisibilityIcon className="muiVisibilityIcon" />}
              iconOff={<VisibilityOffIcon className="muiVisibilityIcon" />}
            />
            {getHasError("all", deleteAccountErrors) && (
              <span className="centerText errorSpanProfile">
                {getErrMessage("all", deleteAccountErrors)}
              </span>
            )}
            <div className="editButtons">
              <Button
                type="button"
                variant="contained"
                className="button redButton bigButton otpButtonWidth"
                style={{
                  textTransform: "none",
                  backgroundColor: "rgba(0,0,0,0.5) !important",
                  color: "",
                  width: "fit-Content",
                }}
                onClick={validateDeleteAccount}
              >
                Delete Account
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditProfile;
