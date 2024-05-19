import React, { useState, useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import ConfirmModal from "../modals/ConfirmModal.js";
import LocationSelectorModal from "./LocationSelectorModal.js";
import InputText from "../modals/InputText.js";
import DelayedTooltip from "../ui/DelayedTooltip.js";
import IconButton from "@mui/material/IconButton";
import FmdGoodRoundedIcon from "@mui/icons-material/FmdGoodRounded";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { setLocationType } from "react-geocode";
import "../../styles/openMapModal.css";
import {
  handleSetError,
  getHasError,
  getErrMessage,
} from "../../functions/utils";

const { REACT_APP_GMAPS_API_KEY } = process.env;

function FilterSearch({
  searchTerm,
  setFilteredPalengkeList,
  setOpen,
  options,
  setOptions,
  location,
  setLocation,
  distanceToSearch,
  setDistanceToSearch,
  filterPalengkeList,
  isEmptyObject,
  address,
  setAddress,
  errors,
  setErrors,
  initialErrorData,
  ...sharedProps
}) {
  useEffect(() => {
    const fetchPlaces = async () => {
      // don't fetch if empty
      if (address === "") return;

      try {
        // fetch from server
        const response = await fetch(
          `/search-places?input=${encodeURIComponent(address)}&types=(regions)`
        );
        const data = await response.json();

        // Extract relevant data from the response
        const places = await Promise.all(
          data.predictions.map(async (prediction) => {
            const placeDetailsResponse = await fetch(
              `/placedetails?place_id=${prediction.place_id}`
            );
            const placeDetailsData = await placeDetailsResponse.json();
            const { lat, lng } = placeDetailsData.result.geometry.location;
            const formattedAddress = placeDetailsData.result.formatted_address;
            return {
              label: formattedAddress,
              placeId: prediction.place_id,
              location: {
                lat,
                lng,
              },
            };
          })
        );
        console.log("options", places.slice(0, 5));
        // Update options with fetched places limit to first 5 places
        setOptions(places.slice(0, 5));
      } catch (error) {
        console.error("Error fetching places:", error);
      }
    };

    fetchPlaces();
  }, [address]);

  const validateDetails = () => {
    const tempErrors = initialErrorData;

    if (distanceToSearch === "" || parseInt(distanceToSearch) < 0) {
      tempErrors.find((field) => field.field === "distance").hasError = true;
      tempErrors.find((field) => field.field === "distance").errMessage =
        "Distance must be greater than 0";
    }

    setErrors(tempErrors);

    const hasError = tempErrors.some((field) => field.hasError);
    if (!hasError) {
      filterPalengkeList();
      handleCancelAndClearInput();
    }
  };

  const handleCancelAndClearInput = () => {
    setOptions([]);
    setAddress("");
    setLocation({});
    setOpen(false);
  };

  return (
    <>
      <InputText
        type="text"
        label="Location to search"
        freeSoloInput={true}
        regionSearch={true}
        setValue={setAddress}
        setOtherValue={setLocation}
        value={address}
        maxLength={255}
        placeholder="Search a location"
        options={options}
        setOptions={setOptions}
      />
      {address && (
        <InputText
          type="number"
          label="Distance in meters"
          setValue={setDistanceToSearch}
          value={distanceToSearch}
          maxLength={15}
          placeholder="Distance to search"
          defaultValue={distanceToSearch}
          hasError={getHasError("distance", errors)}
          errMessage={getErrMessage("distance", errors)}
        />
      )}
      <div className="addPalengkeModalButtons">
        <Button
          variant="contained"
          className="button pinkButton mediaButtonMargin"
          style={{ textTransform: "none" }}
          onClick={(e) => {
            e.preventDefault();
            validateDetails();
            // setOpen(false);
          }}
        >
          Set Filter
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
        {/* {defaultValue?.other_names.toString()}
          {defaultValue?.location?.lat.toString()}
          {defaultValue?.location?.lng.toString()} */}
      </div>
    </>
  );
}

export default FilterSearch;
