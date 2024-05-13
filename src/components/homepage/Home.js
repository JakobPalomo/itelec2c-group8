import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Search from "./Search";
import Modal from "../modals/MyModal";
import AddPalengke from "../modals/AddPalengke";
import EditMedia from "../modals/EditMedia";
import SelectOnMap from "../modals/SelectOnMap";
import PalengkeList from "./PalengkeList";
import PalengkeItem from "./PalengkeItem";
import palengkeData from "../../data/palengkeData";
import HomeHeader from "./HomeHeader";

function Home({ ...sharedProps }) {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [indexToEdit, setIndexToEdit] = useState();
  const [addPalengkeClicked, setAddPalengkeClicked] = useState(false);
  const [openMap, setOpenMap] = useState(false);
  const [openMediaModal, setOpenMediaModal] = useState(false);

  //accessing sharedProps
  console.log({ ...sharedProps });
  console.log(sharedProps.palengkeList);
  const palengkeList = sharedProps.palengkeList;
  const setPalengkeList = sharedProps.setPalengkeList;

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
            mediaList={sharedProps.me}
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
      <PalengkeList>
        <HomeHeader setAddPalengkeClicked={setAddPalengkeClicked} />
        <div className="palengkeItemsContainer">
          {/* sharedProps.palengkeList */}
          {sharedProps.palengkeList.map((palengke) => (
            <Link
              to={`/palengke/${palengke.palengke_id}`}
              key={palengke.palengke_id}
              style={{
                textDecoration: "none",
                color: "black",
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
