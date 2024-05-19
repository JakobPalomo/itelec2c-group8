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

const { REACT_APP_GMAPS_API_KEY } = process.env;

function RegionSearch({ address, setAddress, setLocation, field }) {
  const [options, setOptions] = useState([]);

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

  function toSentenceCase(str) {
    return str.toLowerCase().replace(/(^\w|\s\w)/g, (m) => m.toUpperCase());
  }

  function getPlaceholder(field) {
    return `Your ${field}`;
  }

  return (
    <>
      <InputText
        type="text"
        label={toSentenceCase(field)}
        freeSoloInput={true}
        regionSearch={true}
        setValue={setAddress}
        setOtherValue={setLocation}
        value={address}
        maxLength={255}
        placeholder={getPlaceholder(field)}
        options={options}
        setOptions={setOptions}
      />
    </>
  );
}

export default RegionSearch;
