import React, { useState, useRef, useEffect } from "react";
import ConfirmModal from "../modals/ConfirmModal";
import FmdGoodRoundedIcon from "@mui/icons-material/FmdGoodRounded";
import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";
import "../../styles/map.css";

const { REACT_APP_GMAPS_API_KEY } = process.env;

const LocationSelectorModal = ({
  open,
  setOpen,
  onSelectLocation,
  prevModalHeight,
  defaultLocation = { lat: 14.599512, lng: 120.984222 },
}) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: REACT_APP_GMAPS_API_KEY,
  });
  const [map, setMap] = React.useState(null);
  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    // map.fitBounds(bounds);
    map.setCenter(bounds.getCenter());
    setMap(map);
  }, []);
  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);
  const handleMapLoad = React.useCallback(
    function handleMapLoad(map) {
      onLoad(map);
      mapRef.current = map;
    },
    [onLoad]
  );
  const containerStyle = {
    width: "100%",
    height: "100%",
    borderRadius: "10px",
    border: "1px solid #ccc",
    overflow: "hidden",
  };

  const isEmptyObject = (obj) => {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  };

  useEffect(() => {
    if (isEmptyObject(defaultLocation) === false) {
      setCenter(defaultLocation);
      setMarkerPosition(defaultLocation);
    }
  }, []);

  const defaultLoc = { lat: 14.599512, lng: 120.984222 };
  const [center, setCenter] = useState(defaultLoc);
  const [tempAddress, setTempAddress] = useState("");
  const [markerPosition, setMarkerPosition] = useState(defaultLoc);
  const [zoom, setZoom] = useState(12);
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

  const handleZoomChanged = () => {
    // Update zoom state when zoom level changes
    if (mapRef.current) {
      setZoom(mapRef.current.getZoom());
    }
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
        {isLoaded && (
          <GoogleMap
            id="map"
            mapContainerStyle={containerStyle}
            center={center}
            zoom={zoom}
            onClick={handleMapClick}
            onCenterChanged={handleCenterChanged}
            onZoomChanged={handleZoomChanged}
            onLoad={handleMapLoad}
            onUnmount={onUnmount}
            options={{
              disableDefaultUI: true,
              zoomControl: true,
            }}
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
        )}
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
