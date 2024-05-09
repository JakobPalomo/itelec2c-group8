import { useState, useEffect } from "react";
import business_statuses from "../../data/business_statuses.js";
import InputText from "./InputText.js";
import DelayedTooltip from "../ui/DelayedTooltip";
import UploadMedia from "./UploadMedia";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import FmdGoodRoundedIcon from "@mui/icons-material/FmdGoodRounded";

function AddPalengke({
  setOpenMap,
  setOpenMediaModal,
  setIndexToEdit,
  setSelectedFiles,
  selectedFiles,
  setAddPalengkeClicked,
}) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [media, setMedia] = useState([]);
  const [business_status, setBusinessStatus] = useState(0);
  const [other_names, setOtherNames] = useState([]);

  const handleSubmit = () => {};

  const handleCancelAndClearInput = () => {
    setAddPalengkeClicked(false);
    setName("");
    setAddress("");
    setLocation("");
    setDescription("");
    setMedia([]);
    setSelectedFiles([]);
    setBusinessStatus(0);
    setOtherNames([]);
  };

  useEffect(() => {
    console.log(
      `name: ${name}; address: ${address}; location: ${location}; description: ${description}; business_status: ${business_status} `
    );
    console.log("media:");
    console.log(media);
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
  ]);

  return (
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
        />
        <InputText
          type="text"
          label="Address"
          required={true}
          disabled={true}
          setValue={setAddress}
          value={address}
          maxLength={255}
          placeholder="Select a location in the map"
        >
          <DelayedTooltip title="Select Location" delay={1000}>
            <IconButton
              className="locationIconButton"
              onClick={() => setOpenMap(true)}
            >
              <FmdGoodRoundedIcon className="muiLocationIconPink" />
            </IconButton>
          </DelayedTooltip>
        </InputText>
        <InputText
          type="text"
          label="Business Status"
          required={true}
          setValue={setBusinessStatus}
          value={business_status}
          maxLength={1000}
          selectData={business_statuses}
          defaultValue={0}
        />
        <InputText
          type="text"
          label="Description"
          setValue={setDescription}
          value={description}
          maxLength={1000}
          placeholder="Provide a short description"
        />
        <InputText
          type="text"
          label="Other Names"
          multipleValues={true}
          setValue={setOtherNames}
          arrayValue={other_names}
          maxLength={100}
          placeholder="Other names referred to"
        />
        <UploadMedia
          setOpenModal={setOpenMediaModal}
          setSelectedFiles={setSelectedFiles}
          selectedFiles={selectedFiles}
          setIndexToEdit={setIndexToEdit}
        />
      </div>
      <div className="addPalengkeModalButtons">
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
          onClick={() => {
            handleCancelAndClearInput();
          }}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}

export default AddPalengke;
