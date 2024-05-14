import { useState, useEffect } from "react";
import "../../styles/Modal.css";
import business_statuses from "../../data/business_statuses.js";
import InputText from "./InputText";
import ConfirmModal from "./ConfirmModal";
import HeaderAndDetail from "./HeaderAndDetail";
import LocationSearch from "../gmaps/LocationSearch";
import Button from "@mui/material/Button";
import UploadMedia from "./UploadMedia";

function EditPalengke({
  palengke,
  openMap,
  setOpenMap,
  setOpenMediaModal,
  setIndexToEdit,
  setSelectedFiles,
  selectedFiles,
  setEditPalengkeClicked,
  prevModalHeight,
  palengkeList,
  setPalengkeList,
  mediaList,
  setMediaList,
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

  const [name, setName] = useState(palengke ? palengke.name : "");
  const [address, setAddress] = useState(palengke ? palengke.address : "");
  const [location, setLocation] = useState(palengke ? palengke.location : {});
  const [description, setDescription] = useState(palengke ? palengke.description : "");
  const [media, setMedia] = useState(palengke ? palengke.media : []);
  const [business_status, setBusinessStatus] = useState(palengke ? palengke.business_status : 0);
  const [other_names, setOtherNames] = useState(palengke ? palengke.other_names : []);

  const [errors, setErrors] = useState(initialErrorData);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);

  const handleSetError = (variable, message) => {
    const index = errors.findIndex((field) => field.field === variable.toString());
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
    const index = errors.findIndex((field) => field.field === variable.toString());
    if (index !== -1) {
      return errors[index].hasError;
    }
  };
  
  const getErrMessage = (variable) => {
    const index = errors.findIndex((field) => field.field === variable.toString());
    if (index !== -1) {
      return errors[index].errMessage;
    }
  };

  const validatePalengkeDetails = () => {
    const trimmedName = name.trim();
    const trimmedAddress = address.trim();
    const trimmedDescription = description.trim();
    let trimmedOtherNames = other_names;
    if (Array.isArray(other_names)) {
      trimmedOtherNames = other_names.map((name) => name.trim()).filter((name) => name !== "");
    }
    setName(trimmedName);
    setAddress(trimmedAddress);
    setDescription(trimmedDescription);
    setOtherNames(trimmedOtherNames);
    setBusinessStatus(parseInt(business_status));

    const tempErrors = initialErrorData;

    if (trimmedName === "") {
      tempErrors.find((field) => field.field === "palengkeName").hasError = true;
      tempErrors.find((field) => field.field === "palengkeName").errMessage = "This field is required";
    }

    if (trimmedAddress === "") {
      tempErrors.find((field) => field.field === "address").hasError = true;
      tempErrors.find((field) => field.field === "address").errMessage = "This field is required";
    } else if (location.lat === undefined || location.lng === undefined) {
      handleSetError("location", "Location is required");
    }

    setErrors(tempErrors);

    const hasError = tempErrors.some((field) => field.hasError);
    if (!hasError) {
      setOpenConfirmModal(true);
    }
  };

  const handleEditPalengke = async () => {
    const formData = new FormData();
    try {
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

      // Perform a mock fetch here since we're not using a real backend
      // Simulate successful edit by updating state directly
      setMedia(mediaFilenames);

      // Reset form values
      setName("");
      setAddress("");
      setLocation({});
      setDescription("");
      setBusinessStatus(0);
      setOtherNames([]);

      setOpenConfirmModal(false);

    } catch (error) {
      console.error("Error editing media:", error);
    }
  };

  const handleCancelAndClearInput = () => {
    // Reset form values to their original state
    setName(palengke.name);
    setAddress(palengke.address);
    setLocation(palengke.location);
    setDescription(palengke.description);
    setMedia(palengke.media);
    setBusinessStatus(palengke.business_status);
    setOtherNames(palengke.other_names);

    // Reset file input
    setSelectedFiles([]);

    // Close the modal
    setEditPalengkeClicked(false);
  };

  const getBusinessStatusName = (businessStatus) => {
    const statusObject = business_statuses.find(
      (status) => status.business_status_id === businessStatus
    );
    return statusObject ? statusObject.name : "";
  };

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  useEffect(() => {
    console.log(`name: ${name}; address: ${address}; location: lat:${location.lng}, lng:${location.lng}; description: ${description}; business_status: ${business_status} `);
  }, [name, address, location, description, business_status, other_names, media]);

  return (
    <div className="editPalengkeModal">
      <div className="editPalengkeModalContent">
      <h1>Edit Palengke</h1>
        <form>
        {/* Palengke Name */}
        <InputText
            label="Palengke Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={getHasError("palengkeName")}
            errorMessage={getErrMessage("palengkeName")}
        />
        
        {/* Address */}
        <InputText
            label="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            error={getHasError("address")}
            errorMessage={getErrMessage("address")}
        />

        {/* Location Search */}
        <LocationSearch
            location={location}
            setLocation={setLocation}
            openMap={openMap}
            setOpenMap={setOpenMap}
            error={getHasError("location")}
            errorMessage={getErrMessage("location")}
        />

        {/* Description */}
        <InputText
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            error={getHasError("description")}
            errorMessage={getErrMessage("description")}
        />

        {/* Business Status */}
        <HeaderAndDetail
            header="Business Status"
            details={getBusinessStatusName(business_status)}
            error={getHasError("business_status")}
            errorMessage={getErrMessage("business_status")}
        />

        {/* Other Names */}
        <InputText
            label="Other Names"
            value={other_names.join(", ")}
            onChange={(e) => setOtherNames(e.target.value.split(", "))}
            error={getHasError("other_names")}
            errorMessage={getErrMessage("other_names")}
        />

        {/* Media Upload */}
        <UploadMedia
            selectedFiles={selectedFiles}
            setSelectedFiles={setSelectedFiles}
            media={media}
            setMedia={setMedia}
        />

        {/* Confirm Button */}
        <div className="button-container">
            <Button variant="contained" color="primary" onClick={validatePalengkeDetails}>
            Save
            </Button>
            <Button variant="contained" color="secondary" onClick={handleCancelAndClearInput}>
            Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={handleEditPalengke}>
            Confirm
            </Button>
        </div>
        </form>
    </div>
    </div>
  );
}

export default EditPalengke;