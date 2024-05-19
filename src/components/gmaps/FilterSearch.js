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

function FilterSearch({
  searchTerm,
  setFilteredPalengkeList,
  setOpen,
  ...sharedProps
}) {
  const [options, setOptions] = useState([]);
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState({});

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

  //   const filterPalengkeList = () => {
  //     const searchText = searchTerm.toLowerCase();

  //     // Filter based on search term in all fields
  //     const searchFiltered = sharedProps.palengkeList.filter((palengke) => {
  //       const combinedText = Object.values(palengke)
  //         .map((value) => value.toString().toLowerCase())
  //         .join(" ");
  //       return combinedText.includes(searchText);
  //     });

  //     // Filter based on location proximity if address is provided
  //     const locationFiltered = location
  //       ? sharedProps.palengkeList.filter((palengke) => {
  //           return options.some((option) => {
  //             const distance = getDistance(
  //               {
  //                 latitude: palengke.location.lat,
  //                 longitude: palengke.location.lng,
  //               },
  //               { latitude: option.location.lat, longitude: option.location.lng }
  //             );
  //             return distance < 5000; // Consider within 5km as a match
  //           });
  //         })
  //       : [];

  //     // Combine both filters
  //     const combinedFiltered = [
  //       ...new Set([...searchFiltered, ...locationFiltered]),
  //     ];

  //     setFilteredPalengkeList(combinedFiltered);
  //   };

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
      <div className="addPalengkeModalButtons">
        <Button
          variant="contained"
          className="button pinkButton mediaButtonMargin"
          style={{ textTransform: "none" }}
          onClick={(e) => {
            e.preventDefault();
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
