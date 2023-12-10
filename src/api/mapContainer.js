import React, { useEffect } from 'react';

function MapContainer() {
  useEffect(() => {
    // Initialize and display the Google Map
    const map = new window.google.maps.Map(document.querySelector('.map-container'), {
      center: { lat: 37.7749, lng: -122.4194 }, // Replace with your desired map center
      zoom: 12, // Set the desired zoom level
    });
  }, []);

  return (
    <div className="map-container">
      {/* Map content will go here */}
    </div>
  );
}

export default MapContainer;
