'use client';

import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import styles from './map.module.css';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

function Map() {
  // Initialize state variables
  const [mapArray, setMapArray] = useState([]);
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

  // Function to handle what happens when a marker or sidebar item is clicked
  function HandleMarkerClick(marker) {
    // Center map on marker
    if (mapRef.current) {
      mapRef.current.flyTo({
        center: marker._lngLat,
        zoom: 12,
      });
    }
  }

  function CloseAllPopups() {
    mapArray.map((marker) => {
      if (marker.ref.getPopup().isOpen()) {
        marker.ref.togglePopup();
      }
    });
  }

  async function fetchData() {
    if (localStorage.getItem('mapMarkers')) {
      setMapArray(JSON.parse(localStorage.getItem('mapMarkers')));
    } else {
      const res = await fetch('/api/markers');
      const data = await res.json();
      setMapArray(data);
      localStorage.setItem('mapMarkers', JSON.stringify(data));
    }
  }

  useEffect(() => {
    if (!mapArray.length) {
      // Fetch data from mongoDB if not loaded from local storage
      // If local storage has content, use that instead
      // This might lead to a mismatch between local storage and the database
      // Fix this by clearing local storage when the database is updated.
      // Perhaps by adding an endpoint to the API that manages the version of the database
      // and comparing that to the version in local storage.
      fetchData();
    }

    if (mapArray.length) {
    // Display Map
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: mapArray[0].longlat, // starting position
        zoom: 9, // starting zoom
      });

      // Hook up mapRef to the map
      mapRef.current = map;

      // Navigation Controls
      map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

      // Display Markers on Map
      const mapmarkers = mapArray.map((marker) => {
        const markerpopup = new mapboxgl.Popup().setHTML(
          `
        <div class=${styles.markerModal}>
          <h3>${marker.markername}</h3>
          <p class= ${styles.markerModalTag}>${marker.tag}</p>
          <p>${marker.description}</p>
          <a class=${styles.markerModalLink} href=${marker.link}>Learn More &boxbox;</a>
        </div>
        `,
        );

        const newMarker = new mapboxgl.Marker({ color: 'black' })
          .setLngLat(marker.longlat)
          .setPopup(markerpopup)
          .addTo(map);

        markerpopup.on('open', () => HandleMarkerClick(newMarker));

        marker.ref = newMarker;
      });
      // Clean up on unmount
      return () => map.remove();
    }
  }, [mapArray]);

  // ref = {mapContainerRef} is callback reference for the div that contains the map
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.exampleText}>
          Map!
        </div>
        <div className={styles.mainBox}>
          <div ref={mapContainerRef} className={styles.mapContainer} />
          <div className={styles.sideBar}>
            {
                mapArray.map((marker) => (
                  <div
                    className={styles.sideBarItem}
                    key={marker.markername}
                    onClick={() => {
                      CloseAllPopups();
                      HandleMarkerClick(marker.ref);
                      marker.ref.togglePopup();
                    }}
                  >
                    <h3>{marker.markername}</h3>
                    <p>{marker.tag}</p>
                  </div>
                ))
              }
          </div>
        </div>
      </div>
      <br />
    </>
  );
}

export default Map;
