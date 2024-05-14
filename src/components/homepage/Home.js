import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Search from "./Search";
import Modal from "../modals/MyModal";
import AddPalengke from "../modals/AddPalengke";
import EditMedia from "../modals/EditMedia";
import SelectOnMap from "../modals/SelectOnMap";
import PalengkeList from "./PalengkeList";
import PalengkeItem from "./PalengkeItem";
import HomeHeader from "./HomeHeader";

function Home({ ...sharedProps }) {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [indexToEdit, setIndexToEdit] = useState();
  const [addPalengkeClicked, setAddPalengkeClicked] = useState(false);
  const [openMap, setOpenMap] = useState(false);
  const [openMediaModal, setOpenMediaModal] = useState(false);
  const [prevModalHeight, setPrevModalHeight] = useState("unset");
  const [searchTerm, setSearchTerm] = useState("");

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
  const filteredPalengkeList = sharedProps.palengkeList.filter((palengke) =>
    palengke.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          />
        </Modal>
      )}
      {openMap === true && (
        <Modal title="Select On Map" open={openMap} setOpen={setOpenMap}>
          <SelectOnMap setOpenMap={setOpenMap} />
        </Modal>
      )}
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
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
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
          {filteredPalengkeList.map((palengke) => (
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
              />
            </Link>
          ))}
        </div>
      </PalengkeList>
    </>
  );
}

export default Home;
