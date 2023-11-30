'use client';

import React, { useRef, useEffect } from 'react';
import Head from 'next/head';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import styles from './map.module.css';

mapboxgl.accessToken = 'pk.eyJ1IjoibWFyaW9wZW5nbGVlIiwiYSI6ImNscGh4bWJ5ZDBiNGQycnAzenl3ZGFoMGgifQ.a9h8rGqm200YEYvCS_-szA';

function Map() {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-74.5, 40], // starting position
      zoom: 9, // starting zoom
    });

    map.addControl(new mapboxgl.NavigationControl());

    const marker = new mapboxgl.Marker({ color: 'black' })
      .setLngLat([-74.5, 40])
      .setPopup(new mapboxgl.Popup().setHTML('Location Name'))
      .addTo(map);

    // Clean up on unmount
    return () => map.remove();
  }, []);

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
