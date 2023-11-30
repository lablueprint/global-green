'use client';

import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import styles from './map.module.css';

mapboxgl.accessToken = 'pk.eyJ1IjoibWFyaW9wZW5nbGVlIiwiYSI6ImNscGh4bWJ5ZDBiNGQycnAzenl3ZGFoMGgifQ.a9h8rGqm200YEYvCS_-szA';

function Map() {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

 // Array of Markers
 const mapArray = [
  {
    markername: 'Fairmont Sirru Fen Fushi',
    longlat: [73.0083407, 6.2910463],
    description: 'Lorem ipsum dolor sit🌎',
    tag: 'Sustainability Lab',
    link: 'https://www.google.com',
    ref: null,

  },
  {
    markername: 'UCLA',
    longlat: [-118.4677947, 34.0699182],
    description: 'Lorem ipsum dolor sit 🌎',
    tag: 'University',
    link: 'https://www.google.com',
    ref: null,
  },
  {
    markername: 'Global Green USA Office',
    longlat: [-74.126121, 41.0646971],
    description: 'Lorem ipsum dolor sit 🌎',
    tag: 'Office',
    link: 'https://www.google.com',
    ref: null,
  },
];

  // Function to handle what happens when a marker or sidebar item is clicked
  function HandleMarkerClick(marker) {
    // Center map on marker
    if (mapRef.current)
    {
      mapRef.current.flyTo({
        center: marker._lngLat,
        zoom: 10,
      });
  
      console.log({
        name: marker._popup._content.outerText,
        lat: marker._lngLat.lat,
        lng: marker._lngLat.lng,
      });
    }
  }

  function CloseAllPopups() {
    mapArray.map((marker) => {
      if (marker.ref.getPopup().isOpen())
      {
        marker.ref.togglePopup();
      }
    });
  }
  

  useEffect(() => {
    

    // Display Map
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-118.4677947, 34.0699182], // starting position
      zoom: 9, // starting zoom
    });

    // Hook up mapRef to the map
    mapRef.current = map;

    // Navigation Controls
    map.addControl(new mapboxgl.NavigationControl());

    // Display Markers on Map
    const mapmarkers = mapArray.map((marker) => {
      const markerpopup = new mapboxgl.Popup().setHTML(
        `
        <div class="marker-popup">
          <h3>${marker.markername}</h3>
          <p>${marker.description}</p>
          <p>${marker.tag}</p>
          <a href=${marker.link}>Learn More</a>
        </div>
        `,
      );

      const newMarker = new mapboxgl.Marker({ color: 'black' })
        .setLngLat(marker.longlat)
        .setPopup(markerpopup)
        .addTo(map);

      markerpopup.on('open', () => 
        HandleMarkerClick(newMarker)
      );

      marker.ref = newMarker;
    });

    // Clean up on unmount
    return () => map.remove();
  }, []);

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
                mapArray.map((marker) => {
                  return (
                    <div className={styles.sideBarItem} key={marker.markername} onClick={() => 
                    {
                      CloseAllPopups();
                      HandleMarkerClick(marker.ref);
                      marker.ref.togglePopup();
                    }
                    }>
                    <h3>{marker.markername}</h3>
                    <p>{marker.tag}</p>
                    </div>
                    );
                  })
              }
            </div>
          </div>
      </div>
      <br />
    </>
  );
}

export default Map;
