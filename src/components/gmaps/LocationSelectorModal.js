import React, { useState, useRef, useEffect } from "react";
import ConfirmModal from "../modals/ConfirmModal";
import FmdGoodRoundedIcon from "@mui/icons-material/FmdGoodRounded";
import { GoogleMap, MarkerF } from "@react-google-maps/api";
import "../../styles/map.css";

const LocationSelectorModal = ({
  open,
  setOpen,
  onSelectLocation,
  prevModalHeight,
}) => {
  const defaultLocation = { lat: 14.599512, lng: 120.984222 };
  const [center, setCenter] = useState(defaultLocation);
  const [tempAddress, setTempAddress] = useState("");
  const [markerPosition, setMarkerPosition] = useState(defaultLocation);
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    console.log("markerRef");
    console.log(markerRef);
  }, [markerRef]);

  useEffect(() => {
    updateAddress();
  }, []);

  const handleMapClick = (event) => {
    // Update the center and marker position when the map is clicked
    const newLocation = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    setCenter(newLocation);
    setMarkerPosition(newLocation);
  };

  const handleCenterChanged = () => {
    // Update the marker position when the map center changes
    if (mapRef.current) {
      setMarkerPosition({
        lat: mapRef.current.getCenter().lat(),
        lng: mapRef.current.getCenter().lng(),
      });
      updateAddress();
      console.log({
        lat: mapRef.current.getCenter().lat(),
        lng: mapRef.current.getCenter().lng(),
      });
    }
  };

  const handleSelectOnMap = async () => {
    onSelectLocation(markerPosition, tempAddress);
    setOpen(false);
  };

  const updateAddress = async () => {
    // Fetch address or perform other actions based on the selected location
    const response = await fetch(
      `/location-to-address?lat=${markerPosition.lat}&lng=${markerPosition.lng}`
    );
    const data = await response.json();
    const address = data?.address;
    setTempAddress(address);
    // console.log(address);
  };

  return (
    <ConfirmModal
      title="Choose Location"
      open={open}
      setOpen={setOpen}
      confirmYes={handleSelectOnMap}
      yesText="Select"
      noText="Cancel"
      context="selectLocation"
      noIcon={true}
      parentSize={true}
      prevModalHeight={prevModalHeight}
    >
      <div style={{ width: "100%", height: "590px" }}>
        <GoogleMap
          id="map"
          mapContainerStyle={{ width: "100%", height: "100%" }}
          center={center}
          zoom={12}
          onClick={handleMapClick}
          onLoad={(map) => (mapRef.current = map)}
          onCenterChanged={handleCenterChanged}
        >
          <MarkerF
            position={markerPosition}
            draggable={true}
            onLoad={(marker) => (markerRef.current = marker)}
            icon={{
              url: "/assets/marker.png",
              scaledSize: new window.google.maps.Size(35, 35), // Adjust size as needed
            }}
          />
        </GoogleMap>
      </div>
      <div className="addressCont">
        <div>
          <FmdGoodRoundedIcon className="muiLocationIconDarkGrey addressSpanIconMargin" />
        </div>
        <div className="tempAddress">{tempAddress}</div>
      </div>
    </ConfirmModal>
  );
};

export default LocationSelectorModal;
