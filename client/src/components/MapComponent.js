// MapComponent.js

import React, { useState } from 'react';
import axios from 'axios';

function MapComponent() {
  const [places, setPlaces] = useState([]);
  const [query, setQuery] = useState('');

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/api/places?query=${query}`);
      setPlaces(response.data.results);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {places.map((place) => (
          <li key={place.id}>
            <strong>{place.name}</strong>
            <p>{place.formatted_address}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MapComponent;
