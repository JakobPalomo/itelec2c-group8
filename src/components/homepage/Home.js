import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Search from "./Search";
import Modal from "../modals/MyModal";
import AddPalengke from "../modals/AddPalengke";
import EditMedia from "../modals/EditMedia";
import SelectOnMap from "../modals/SelectOnMap";
import PalengkeList from "./PalengkeList";
import PalengkeItem from "./PalengkeItem";
import HomeHeader from "./HomeHeader";

function Home({ isLoggedIn, ...sharedProps }) {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [indexToEdit, setIndexToEdit] = useState();
  const [addPalengkeClicked, setAddPalengkeClicked] = useState(false);
  const [openMap, setOpenMap] = useState(false);
  const [openMediaModal, setOpenMediaModal] = useState(false);
  const [prevModalHeight, setPrevModalHeight] = useState("unset");

  useEffect(() => {
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

  return (
    <>
      {!isLoggedIn && (
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
      <Search />
      {isLoggedIn && addPalengkeClicked && (
        <h1
          style={{
            textAlign: "center",
            color: "white",
            backgroundColor: "#ff6262",
            padding: "12px",
          }}
        >
          Please login to add a Palengke.
        </h1>
      )}
      <PalengkeList>
        {isLoggedIn ? (
          <HomeHeader setAddPalengkeClicked={setAddPalengkeClicked} />
        ) : (
          <HomeHeader
            setAddPalengkeClicked={setAddPalengkeClicked}
            Btn={true}
          />
        )}

        <div className="palengkeItemsContainer">
          {sharedProps.palengkeList.map((palengke) => (
            <Link
              to={!isLoggedIn ? `/palengke/${palengke.palengke_id}` : "#"}
              key={palengke.palengke_id}
              style={{
                textDecoration: "none",
                color: "black",
                pointerEvents: !isLoggedIn ? "auto" : "none",
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
