'use client';

import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import styles from './map.module.css';

mapboxgl.accessToken = 'pk.eyJ1IjoibWFyaW9wZW5nbGVlIiwiYSI6ImNscGh4bWJ5ZDBiNGQycnAzenl3ZGFoMGgifQ.a9h8rGqm200YEYvCS_-szA';

function Map() {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    // Array of Markers
    const mapArray = [
      {
        markername: 'marker1',
        longlat: [-74.5, 40],
        description: 'This was the first ever marker in the world!🌎',
        tag: 'cool_marker',
        link: 'https://www.google.com',

      },
      {
        markername: 'marker2',
        longlat: [-74.6, 40],
        description: 'This was the second ever marker in the world!🌎 Way better than the first.🤨',
        tag: 'fun_marker',
        link: 'https://www.google.com',

      },
    ];

    // Display Map
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-74.5, 40], // starting position
      zoom: 9, // starting zoom
    });

    // Navigation Controls
    map.addControl(new mapboxgl.NavigationControl());

    // Display Markers on Map
    const mapmarkers = mapArray.map((marker) => {
      const markerpopup = new mapboxgl.Popup().setHTML(
        `
        <h3>${marker.markername}</h3>
        <p>${marker.description}</p>
        <p>${marker.tag}</p>
        <a href=${marker.link}>Learn More</a>
        `,
      );

      const newMarker = new mapboxgl.Marker({ color: 'black' })
        .setLngLat(marker.longlat)
        .setPopup(markerpopup)
        .addTo(map);

      markerpopup.on('open', () => LogMarkerInfo(newMarker));
    });

    // Log Marker Info in JSON Format
    function LogMarkerInfo(marker) {
      console.log({
        name: marker._popup._content.outerText,
        lat: marker._lngLat.lat,
        lng: marker._lngLat.lng,
      });
    }

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
        <div ref={mapContainerRef} className={styles.mapContainer} />
      </div>
      <br />
    </>
  );
}

export default Map;
