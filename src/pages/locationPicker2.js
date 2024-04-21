import React, { useState } from 'react';
import LocationPicker from 'react-location-picker';

/* Default position */
const defaultPosition = {
  lat: 27.9878,
  lng: 86.9250
};

const LocationPickerExample = ({ handleLocationChange }) => {
  const [address, setAddress] = useState("Kala Pattar Ascent Trail, Khumjung 56000, Nepal");
  const [position, setPosition] = useState({ lat: 0, lng: 0 });

  const onLocationChange = ({ position, address, places }) => {
    // Set new location
    setPosition(position);
    setAddress(address);
    // Call parent handler if provided
    if (handleLocationChange) {
      handleLocationChange({ position, address, places });
    }
  };

  return (
    <div>
      <h1>{address}</h1>
      <div>
        <LocationPicker
          containerElement={ <div style={ {height: '100%'} } /> }
          mapElement={ <div style={ {height: '400px'} } /> }
          defaultPosition={defaultPosition}
          onChange={onLocationChange}
        />
      </div>
    </div>
  );
};

export default LocationPickerExample;
