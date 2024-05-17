import React, { useState, useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import ConfirmModal from "../../components/modals/ConfirmModal";
import LocationSelectorModal from "./LocationSelectorModal.js";
import InputText from "../../components/modals/InputText.js";
import DelayedTooltip from "../../components/ui/DelayedTooltip";
import IconButton from "@mui/material/IconButton";
import FmdGoodRoundedIcon from "@mui/icons-material/FmdGoodRounded";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { setLocationType } from "react-geocode";
import "../../styles/openMapModal.css";

const { REACT_APP_GMAPS_API_KEY } = process.env;

function LocationSearch({
  address,
  setAddress,
  location,
  setLocation,
  getHasError,
  getErrMessage,
  errors,
  openMap,
  setOpenMap,
  prevModalHeight,
}) {
  const [options, setOptions] = useState([]);
  const [openSelectLoc, setOpenSelectLoc] = useState(false);

  useEffect(() => {
    if (openMap === true) {
      setOpenSelectLoc(false);
    }
  }, [openSelectLoc]);

  useEffect(() => {
    const fetchPlaces = async () => {
      // don't fetch if empty
      if (address === "") return;

      try {
        // fetch from server
        const response = await fetch(
          `/search-places?input=${encodeURIComponent(address)}&types=geocode`
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

        // Update options with fetched places limit to first 5 places
        setOptions(places.slice(0, 5));
      } catch (error) {
        console.error("Error fetching places:", error);
      }
    };

    fetchPlaces();
  }, [address]);

  const onSelectLocation = (location, address) => {
    setLocation(location);
    setAddress(address);
    console.log(location);
    console.log(address);
  };

  return (
    <>
      {openMap === true && (
        <LocationSelectorModal
          open={openMap}
          setOpen={setOpenMap}
          onSelectLocation={onSelectLocation}
          prevModalHeight={prevModalHeight}
        />
      )}
      <InputText
        type="text"
        label="Address"
        freeSoloInput={true}
        required={true}
        setValue={setAddress}
        setOtherValue={setLocation}
        value={address}
        maxLength={255}
        placeholder="Select a location"
        hasError={getHasError("address", errors)}
        errMessage={getErrMessage("address", errors)}
        options={options}
        setOptions={setOptions}
        //   inputRef={(ref) => onLoad(ref)}
      >
        <DelayedTooltip
          title="Select Location"
          delay={1000}
          open={openSelectLoc}
          setOpen={setOpenSelectLoc}
        >
          <IconButton
            className="locationIconButton"
            onClick={() => {
              setOpenSelectLoc(false);
              setOpenMap(true);
            }}
          >
            <FmdGoodRoundedIcon className="muiLocationIconPink" />
          </IconButton>
        </DelayedTooltip>
      </InputText>
    </>
  );
}

export default LocationSearch;
