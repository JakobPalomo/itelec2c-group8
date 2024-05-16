import { useState, useEffect } from "react";

import business_statuses from "../../data/business_statuses.js";
import InputText from "./InputText.js";
import DelayedTooltip from "../ui/DelayedTooltip";
import UploadMedia from "./UploadMedia";
import ConfirmModal from "./ConfirmModal";
import HeaderAndDetail from "./HeaderAndDetail";
import LocationSearch from "../gmaps/LocationSearch";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FmdGoodRoundedIcon from "@mui/icons-material/FmdGoodRounded";
const { REACT_APP_GMAPS_API_KEY } = process.env;

function AddPalengke({
  openMap,
  setOpenMap,
  setOpenMediaModal,
  setIndexToEdit,
  setSelectedFiles,
  selectedFiles,
  setAddPalengkeClicked,
  prevModalHeight,
  palengkeList,
  setPalengkeList,
  mediaList,
  setMediaList,
  currUser,
}) {
  const initialErrorData = [
    { field: "palengkeName", hasError: false, errMessage: "" },
    { field: "address", hasError: false, errMessage: "" },
    { field: "location", hasError: false, errMessage: "" },
    { field: "description", hasError: false, errMessage: "" },
    { field: "media", hasError: false, errMessage: "" },
    { field: "business_status", hasError: false, errMessage: "" },
    { field: "other_names", hasError: false, errMessage: "" },
  ];

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState({});
  const [description, setDescription] = useState("");
  const [media, setMedia] = useState([]);
  const [business_status, setBusinessStatus] = useState(0);
  const [other_names, setOtherNames] = useState([]);

  const [errors, setErrors] = useState(initialErrorData);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);

  // Handling errors
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

  // Validation function
  const validatePalengkeDetails = () => {
    // Trim strings
    const trimmedName = name.trim();
    const trimmedAddress = address.trim();
    const trimmedDescription = description.trim();
    let trimmedOtherNames = other_names;
    if (Array.isArray(other_names)) {
      trimmedOtherNames = other_names
        .map((name) => name.trim())
        .filter((name) => name !== "");
    }
    setName(trimmedName);
    setAddress(trimmedAddress);
    setDescription(trimmedDescription);
    setOtherNames(trimmedOtherNames);
    setBusinessStatus(parseInt(business_status));

    const tempErrors = initialErrorData;

    if (trimmedName === "") {
      tempErrors.find(
        (field) => field.field === "palengkeName"
      ).hasError = true;
      tempErrors.find((field) => field.field === "palengkeName").errMessage =
        "This field is required";
    }

    if (trimmedAddress === "") {
      tempErrors.find((field) => field.field === "address").hasError = true;
      tempErrors.find((field) => field.field === "address").errMessage =
        "This field is required";
    } else if (location.lat === undefined || location.lng === undefined) {
      // setLocation
    }
    setErrors(tempErrors);

    const hasError = tempErrors.some((field) => field.hasError);
    if (!hasError) {
      setOpenConfirmModal(true);
    }
  };

  // Confirm Yes and store object
  const handleAddPalengke = async () => {
    const formData = new FormData();
    try {
      // Append each file to FormData
      formData.append("name", name);
      formData.append("address", address);
      formData.append("location", JSON.stringify(location));
      formData.append("business_status", business_status);
      formData.append("description", description);
      formData.append("other_names", JSON.stringify(other_names));

      let mediaFilenames = [];
      let mediaTypes = [];
      selectedFiles.forEach((file, index) => {
        formData.append("media", file);
        mediaFilenames.push(file.name);
        mediaTypes.push(file.type);
      });
      formData.append("mediaFilenames", JSON.stringify(mediaFilenames));
      formData.append("mediaTypes", JSON.stringify(mediaTypes));
      console.log(formData);

      // Upload the FormData to the server
      const response = fetch(`/palengke/add?userId=${currUser.id}`, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("responseok");
          console.log(data.documentIds);
          setMedia(data.documentIds);
        });
    } catch (error) {
      console.error("Error adding media:", error);
    }
  };

  // Cancel add palengke
  const handleCancelAndClearInput = () => {
    setAddPalengkeClicked(false);
    setName("");
    setAddress("");
    setLocation({});
    setDescription("");
    setMedia([]);
    setSelectedFiles([]);
    setBusinessStatus(0);
    setOtherNames([]);
  };

  // Get Business Status Name
  const getBusinessStatusName = (businessStatus) => {
    const statusObject = business_statuses.find(
      (status) => status.business_status_id === businessStatus
    );
    if (statusObject) {
      return statusObject.name;
    }
    return "";
  };

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  useEffect(() => {
    console.log(
      `name: ${name}; address: ${address}; location: lat:${location.lng}, lng:${location.lng}; description: ${description}; business_status: ${business_status} `
    );
    console.log("media:");
    console.log(media);
    console.log("selected files:");
    console.log(selectedFiles);
    console.log("other names:");
    console.log(other_names);
  }, [
    name,
    address,
    location,
    description,
    media,
    other_names,
    business_status,
    selectedFiles,
  ]);

  useEffect(() => {
    console.log("gmaps api key");
    console.log(REACT_APP_GMAPS_API_KEY);
  }, []);

  return (
    <div>
      {openConfirmModal === true && (
        <ConfirmModal
          title="Confirm Palengke Details"
          open={openConfirmModal}
          setOpen={setOpenConfirmModal}
          setOpenPrevModal={setAddPalengkeClicked}
          confirmYes={handleAddPalengke}
          context="addPalengke"
          noIcon={true}
          parentSize={true}
          prevModalHeight={prevModalHeight}
        >
          <div style={{ height: "20px" }}></div>
          <strong className="confirmModalHeaderMarginTop">
            Are all details entered correct?
          </strong>
          <div className="detailsCont">
            <HeaderAndDetail
              header="Palengke Name"
              headerColor=""
              detail={name}
              margin="6px 0px 20px 0px"
            />
            <HeaderAndDetail
              header="Address"
              detail={address}
              margin="0px 0px 20px 0px"
            />
            {/* only for checking */}
            {location.lat !== undefined && location.lng !== undefined && (
              <HeaderAndDetail
                header="Location"
                detail={`${location.lat}, ${location.lng}`}
                margin="0px 0px 20px 0px"
              />
            )}
            <HeaderAndDetail
              header="Business Status"
              detail={getBusinessStatusName(business_status)}
              margin="0px 0px 20px 0px"
            />
            {description !== "" && (
              <HeaderAndDetail
                header="Description"
                detail={description}
                margin="0px 0px 20px 0px"
              />
            )}

            {Array.isArray(other_names) && other_names.length > 0 && (
              <HeaderAndDetail
                header="Other Names"
                array={other_names}
                margin="0px 0px 20px 0px"
              />
            )}

            {Array.isArray(selectedFiles) && selectedFiles.length > 0 && (
              <HeaderAndDetail
                header="Media"
                mediaArray={selectedFiles}
                margin="0px 0px 10px 0px"
              />
            )}
            {/* {media} */}
          </div>
        </ConfirmModal>
      )}
      <div className="addPalengkeModalBody">
        <div>
          <InputText
            type="text"
            label="Palengke Name"
            required={true}
            setValue={setName}
            value={name}
            maxLength={100}
            placeholder="Name of the palengke"
            hasError={getHasError("palengkeName")}
            errMessage={getErrMessage("palengkeName")}
          />
          <LocationSearch
            address={address}
            setAddress={setAddress}
            location={location}
            setLocation={setLocation}
            getHasError={getHasError}
            getErrMessage={getErrMessage}
            openMap={openMap}
            setOpenMap={setOpenMap}
            prevModalHeight={prevModalHeight}
          />
          <InputText
            type="text"
            label="Business Status"
            required={true}
            setValue={setBusinessStatus}
            value={business_status}
            maxLength={1000}
            selectData={business_statuses}
            defaultValue={0}
            hasError={getHasError("business_status")}
            errMessage={getErrMessage("business_status")}
          />
          <InputText
            type="text"
            label="Description"
            setValue={setDescription}
            value={description}
            maxLength={1000}
            placeholder="Provide a short description"
            hasError={getHasError("description")}
            errMessage={getErrMessage("description")}
          />
          <InputText
            type="text"
            label="Other Names"
            multipleValues={true}
            setValue={setOtherNames}
            arrayValue={other_names}
            maxLength={100}
            placeholder="Other names referred to"
            hasError={getHasError("other_names")}
            errMessage={getErrMessage("other_names")}
          />
          <UploadMedia
            setOpenModal={setOpenMediaModal}
            setSelectedFiles={setSelectedFiles}
            selectedFiles={selectedFiles}
            setIndexToEdit={setIndexToEdit}
            hasError={getHasError("media")}
            errMessage={getErrMessage("media")}
          />
        </div>
        <div className="addPalengkeModalButtons">
          <Button
            variant="contained"
            className="button pinkButton mediaButtonMargin"
            style={{ textTransform: "none" }}
            onClick={(e) => {
              e.preventDefault();
              validatePalengkeDetails();
            }}
          >
            Submit
          </Button>
          <Button
            variant="outlined"
            className="outlinedButton outlinedPinkButton mediaButtonMargin"
            style={{ textTransform: "none" }}
            onClick={() => {
              handleCancelAndClearInput();
            }}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AddPalengke;
