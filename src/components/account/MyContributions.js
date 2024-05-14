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
    <div className="myContributions">
      <h1>My Contributions</h1>
      <div className="contributionsList">
        {contributions.map((palengke) => (
          <div key={palengke.id} className="contributionItem">
            <h2>{palengke.name}</h2>
            <p>{palengke.address}</p>
            <button onClick={() => openEditModal(palengke)}>Edit</button>
          </div>
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
