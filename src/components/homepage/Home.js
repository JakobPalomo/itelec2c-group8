import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Search from "./Search";
import Modal from "../modals/MyModal";
import AddPalengke from "../modals/AddPalengke";
import EditMedia from "../modals/EditMedia";
import SelectOnMap from "../modals/SelectOnMap";
import FilterSearch from "../gmaps/FilterSearch";
import PalengkeList from "./PalengkeList";
import PalengkeItem from "./PalengkeItem";
import HomeHeader from "./HomeHeader";
import { getDistance } from "geolib";

function Home({ ...sharedProps }) {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [indexToEdit, setIndexToEdit] = useState();
  const [addPalengkeClicked, setAddPalengkeClicked] = useState(false);
  const [openMap, setOpenMap] = useState(false);
  const [openMediaModal, setOpenMediaModal] = useState(false);
  const [prevModalHeight, setPrevModalHeight] = useState("unset");
  const [searchTerm, setSearchTerm] = useState("");
  const [numOfPalengkeToShow, setNumOfPalengkeToShow] = useState(10);
  const [filteredPalengkeList, setFilteredPalengkeList] = useState([]);
  const [filterSearchModal, setFilterSearchModal] = useState(false);
  const initialErrorData = [
    { field: "distance", hasError: false, errMessage: "" },
  ];
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState(initialErrorData);

  useEffect(() => {
    console.log(
      `isLoggedIn: ${sharedProps.isLoggedIn}; currUserid: ${sharedProps.currUser?.user_id}`
    );
    console.log("currUser: ");
    console.log(sharedProps.currUser);
    console.log(sharedProps);

    function updateHeight() {
      const modalElement = document.querySelector(".addPalengkeModal");
      if (modalElement) {
        const height = modalElement.offsetHeight + "px";
        setPrevModalHeight(height);
      }
    }
    updateHeight();

    window.addEventListener("resize", updateHeight);
    return () => {
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  useEffect(() => {
    console.log(selectedFiles);
  }, [selectedFiles]);

  // Filter the palengke list based on the search term
  // const filteredPalengkeList = sharedProps.palengkeList.filter((palengke) => {
  //   const searchText = Object.values(palengke)
  //     .map((value) => value.toString().toLowerCase())
  //     .join(" "); // Concatenate all field values into a single string

  //   return searchText.includes(searchTerm.toLowerCase());
  // });

  const getAverageRating = (palengke) => {
    let totalRating = 0;
    if (palengke.reviews.length > 0) {
      palengke.reviews.forEach((review) => {
        totalRating += parseInt(review?.rating);
      });
      const averageRating = totalRating / palengke.reviews.length;
      return averageRating.toFixed(1);
    } else {
      return 0;
    }
  };

  const getAverageRatingInt = () => {
    return Math.round(parseFloat(getAverageRating()));
  };

  useEffect(() => {
    setFilteredPalengkeList(sharedProps.palengkeList);
  }, []);

  const [options, setOptions] = useState([]);
  const [location, setLocation] = useState({});
  const [distanceToSearch, setDistanceToSearch] = useState(5000);

  const isEmptyObject = (obj) => {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  };

  const filterPalengkeList = () => {
    const searchText = searchTerm.toLowerCase();
    let combinedFiltered = [];

    // Filter based on search term in all fields
    let searchFiltered = [];
    if (searchTerm !== "") {
      searchFiltered = sharedProps.palengkeList.filter((palengke) => {
        const combinedText = Object.values(palengke)
          .map((value) => value.toString().toLowerCase())
          .join(" ");
        return combinedText.includes(searchText);
      });
    }

    // Filter based on location proximity if address is provided
    let locationFiltered = [];
    if (location) {
      locationFiltered = location
        ? sharedProps.palengkeList.filter((palengke) => {
            return (
              isEmptyObject(palengke.location) === false &&
              options.some((option) => {
                const distance = getDistance(
                  {
                    latitude: palengke.location.lat,
                    longitude: palengke.location.lng,
                  },
                  {
                    latitude: option.location.lat,
                    longitude: option.location.lng,
                  }
                );
                return distance < parseInt(distanceToSearch); // Consider within 5km as a match
              })
            );
          })
        : [];
    }

    // Combine both filters
    combinedFiltered = [...new Set([...searchFiltered, ...locationFiltered])];

    console.log("combinedFiltered", combinedFiltered);
    setFilteredPalengkeList(combinedFiltered);
  };

  useEffect(() => {
    console.log("searchTerm", searchTerm, "location", location);
    filterPalengkeList();
  }, [searchTerm, distanceToSearch]);

  useEffect(() => {
    console.log("location", location);
    if (isEmptyObject(location) === false) {
      filterPalengkeList();
    }
  }, [location]);

  return (
    <>
      {addPalengkeClicked === true && (
        <Modal
          title="Add New Palengke"
          open={addPalengkeClicked}
          setOpen={setAddPalengkeClicked}
          className="addPalengkeModal"
        >
          <AddPalengke
            openMap={openMap}
            setOpenMap={setOpenMap}
            setOpenMediaModal={setOpenMediaModal}
            setIndexToEdit={setIndexToEdit}
            setSelectedFiles={setSelectedFiles}
            selectedFiles={selectedFiles}
            setAddPalengkeClicked={setAddPalengkeClicked}
            prevModalHeight={prevModalHeight}
            palengkelist={sharedProps.palengkeList}
            setPalengkeList={sharedProps.setPalengkeList}
            mediaList={sharedProps.mediaList}
            setMediaList={sharedProps.setMediaList}
            currUser={sharedProps.currUser}
          />
        </Modal>
      )}
      {/* {openMap === true && (
        <Modal title="Select On Map" open={openMap} setOpen={setOpenMap}>
          <SelectOnMap setOpenMap={setOpenMap} />
        </Modal>
      )} */}
      {openMediaModal === true && (
        <Modal
          title={selectedFiles[indexToEdit].name}
          open={openMediaModal}
          setOpen={setOpenMediaModal}
        >
          <EditMedia
            setOpenMediaModal={setOpenMediaModal}
            media={selectedFiles}
            setSelectedFiles={setSelectedFiles}
            indexToEdit={indexToEdit}
          />
        </Modal>
      )}
      {filterSearchModal && (
        <Modal
          title="Filter Search Location"
          open={filterSearchModal}
          setOpen={setFilterSearchModal}
        >
          <FilterSearch
            searchTerm={searchTerm}
            setFilteredPalengkeList={setFilteredPalengkeList}
            setOpen={setFilterSearchModal}
            options={options}
            setOptions={setOptions}
            location={location}
            setLocation={setLocation}
            distanceToSearch={distanceToSearch}
            setDistanceToSearch={setDistanceToSearch}
            filterPalengkeList={filterPalengkeList}
            isEmptyObject={isEmptyObject}
            address={address}
            setAddress={setAddress}
            errors={errors}
            setErrors={setErrors}
            initialErrorData={initialErrorData}
            {...sharedProps}
          />
        </Modal>
      )}
      <div className="dark">
        <Search
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setFilterSearchModal={setFilterSearchModal}
          filterPalengkeList={filterPalengkeList}
        />
      </div>

      <PalengkeList>
        {sharedProps.isLoggedIn ? (
          <HomeHeader
            setAddPalengkeClicked={setAddPalengkeClicked}
            Btn={true}
          />
        ) : (
          <HomeHeader setAddPalengkeClicked={setAddPalengkeClicked} />
        )}

        <div className="palengkeItemsContainer">
          {filteredPalengkeList.length !== 0
            ? filteredPalengkeList
                .slice(0, numOfPalengkeToShow)
                .map((palengke) => (
                  <Link
                    to={`/palengke/${palengke.id}`}
                    key={palengke.id}
                    style={{
                      textDecoration: "none",
                      color: "black",
                      pointerEvents: "auto",
                    }}
                  >
                    <PalengkeItem
                      palengke={palengke}
                      mediaList={sharedProps.mediaList}
                      {...sharedProps}
                    />
                  </Link>
                ))
            : sharedProps.palengkeList
                .slice(0, numOfPalengkeToShow)
                .map((palengke) => (
                  <Link
                    to={`/palengke/${palengke.id}`}
                    key={palengke.id}
                    style={{
                      textDecoration: "none",
                      color: "black",
                      pointerEvents: "auto",
                    }}
                  >
                    <PalengkeItem
                      palengke={palengke}
                      mediaList={sharedProps.mediaList}
                      {...sharedProps}
                    />
                  </Link>
                ))}
        </div>
        {filteredPalengkeList.length > numOfPalengkeToShow &&
          filteredPalengkeList.length !== 0 && (
            <div style={{ textAlign: "center" }}>
              <div className="homePalengkeMore">
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => setNumOfPalengkeToShow((prev) => (prev += 10))}
                >
                  Show More ...
                </span>
              </div>
            </div>
          )}
      </PalengkeList>
    </>
  );
}

export default Home;
