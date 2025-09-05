'use client';

import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import styles from './map.module.css';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

function MapComponent() {
  // Initialize state variables
  const [mapArray, setMapArray] = useState([]);
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const [selectedMarker, setSelectedMarker] = useState(null);

  // Function to handle what happens when a marker or sidebar item is clicked
  function HandleMarkerClick(marker) {
    if (mapRef.current) {
      mapRef.current.flyTo({
        center: marker._lngLat,
        zoom: 8,
        duration: 2000,
        essential: true,
      });
    }
    setSelectedMarker(marker);
  }

  function CloseAllPopups() {
    mapArray.map((marker) => {
      if (marker.ref.getPopup().isOpen()) {
        marker.ref.togglePopup();
      }
    });
  }

  async function fetchData() {
    // if (localStorage.getItem('mapMarkers')) {
    //   setMapArray(JSON.parse(localStorage.getItem('mapMarkers')));
    // } else {
    const res = await fetch('/api/markers');
    const data = await res.json();
    setMapArray(data);
    // localStorage.setItem('mapMarkers', JSON.stringify(data));
    // }
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
      console.log('HERES THE STARTING', mapArray);
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-90, 40], // starting position
        zoom: 2, // starting zoom
      });

      // Hook up mapRef to the map
      mapRef.current = map;

      // Navigation Controls
      map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

      // Display Markers on Map
      const mapmarkers = mapArray.map((marker) => {
        const markerpopup = new mapboxgl.Popup({
          maxWidth: '200px', // Fix popup width
        }).setHTML(
          `
            <div class=${styles.markerModal}>
              <h3>${marker.markername}</h3>
              <p class=${
                marker.tag === 'Sustainability Lab'
                  ? styles.markerModalTagSustainabilityLab
                  : styles.markerModalTagResort
              }>${marker.tag}</p>
              <p>${marker.description}</p>
              <a class=${styles.markerModalLink} href=${marker.link}>
                Learn More
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5" class="bi bi-box-arrow-up-right" viewBox="0 0 16 16" style="vertical-align: middle; margin-left: 5px; position: relative; top: 0.5px;">
                  <path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5"/>
                  <path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z"/>
                </svg>
              </a>
            </div>
          `
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

  const [resortIsActive, setResortIsActive] = useState(false);
  const [labIsActive, setLabIsActive] = useState(false);

  // function labToggleButton() {
  //   setLabIsActive(!labIsActive);
  // }

  // function resortToggleButton() {
  //   setResortIsActive(!resortIsActive);
  // }

  // ref = {mapContainerRef} is callback reference for the div that contains the map
  return (
    <div className={styles.mainBox}>
      <div ref={mapContainerRef} className={styles.mapContainer} />
      <div className={styles.sideBar}>
        {mapArray.map((marker) => {
          if (
            (!resortIsActive && !labIsActive) ||
            (resortIsActive && marker.tag === 'Resort') ||
            (labIsActive && marker.tag === 'Sustainability Lab') ||
            (labIsActive &&
              resortIsActive &&
              (marker.tag === 'Sustainability Lab' || marker.tag === 'Resort'))
          ) {
            return (
              <div
                className={`${styles.sideBarItem} ${
                  selectedMarker === marker.ref
                    ? styles.sideBarItemSelected
                    : ''
                }`}
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
            );
          }
          return null; // Skip rendering if the tag doesn't match
        })}
      </div>
    </div>
  );
}

export default MapComponent;
