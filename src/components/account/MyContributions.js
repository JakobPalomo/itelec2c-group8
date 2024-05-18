import React, { useState } from 'react';
import EditPalengke from '../modals/EditPalengke';
import '../../styles/MyContributions.css';

function MyContributions({ contributions }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedPalengke, setSelectedPalengke] = useState(null);

  const openEditModal = (palengke) => {
    setSelectedPalengke(palengke);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedPalengke(null);
    setIsEditModalOpen(false);
  };

  // Add a null check for contributions
  if (!contributions) {
    return <div>Loading...</div>;
  }

  return (
    <div className="contributions">
      <h1 sx={{ margin: "10px" }}>My Contributions</h1>
      <div>
        {sharedProps.userContributions.map((palengke) => (
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
              showIcons={true}
              type={"45%"}
              min={"900px"}
              marg={"0"}
              mediaList={sharedProps.mediaList}
              {...sharedProps}
            />
          </Link>
        ))}
      </div>

      {isEditModalOpen && selectedPalengke && (
        <EditPalengke
          palengke={selectedPalengke}
          openMap={false}
          setOpenMap={() => {}}
          setOpenMediaModal={() => {}}
          setIndexToEdit={() => {}}
          setSelectedFiles={() => {}}
          selectedFiles={[]}
          setEditPalengkeClicked={setIsEditModalOpen}
          prevModalHeight={0}
          palengkeList={contributions}
          setPalengkeList={() => {}}
          mediaList={[]}
          setMediaList={() => {}}
        />
      )}
    </div>
  );
}

export default MyContributions;
