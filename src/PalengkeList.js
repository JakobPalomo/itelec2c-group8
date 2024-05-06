import React from 'react';
import './PalengkeList.css';

function PalengkeList() {
  const palengkeData = [
    {
      id: 1,
      image: 'palengke.jpg',
      rating: 4.5,
      name: 'San Andres Market',
      location: 'San Andres, Manila',
    },
    {
      id: 2,
      image: 'palengke.jpg',
      rating: 4.2,
      name: 'Quezon City Palengke',
      location: 'Quezon City, Metro Manila',
    },
    {
      id: 3,
      image: 'palengke.jpg',
      rating: 4.0,
      name: 'Downtown Palengke',
      location: 'Downtown, Cebu City',
    },
    {
        id: 4,
        image: 'palengke.jpg',
        rating: 4.0,
        name: 'Downtown Palengke',
        location: 'Downtown, Cebu City',
      },
      {
        id: 5,
        image: 'palengke.jpg',
        rating: 4.0,
        name: 'Downtown Palengke',
        location: 'Downtown, Cebu City',
      },
      {
        id: 6,
        image: 'palengke.jpg',
        rating: 4.0,
        name: 'Downtown Palengke',
        location: 'Downtown, Cebu City',
      },
      {
        id: 7,
        image: 'palengke.jpg',
        rating: 4.0,
        name: 'Downtown Palengke',
        location: 'Downtown, Cebu City',
      },
  ];

  return (
    <div className="palengke-list-container">
      <div className="palengke-list">
        {palengkeData.map(palengke => (
          <div key={palengke.id} className="palengke-card">
            <img src={palengke.image} alt={palengke.name} className="palengke-image" />
            <div className="palengke-details">
              <h3>{palengke.name}</h3>
              <p>Rating: {palengke.rating}</p>
              <p>Location: {palengke.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PalengkeList;
