'use client';

import React, { useState } from 'react';
import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'; // import from Material UI Library
import Image from 'next/image';
import styles from './page.module.css';
import CourseDisplay from './CourseDisplay';

export function WelcomeText({ imageUrl, name }) {
  return (
    <div className={styles.banner}>
      <div className={styles.welcome}>
        <h1>Welcome,</h1>
        <h1>{name}</h1>
      </div>
      <div className={styles.imageGarden}>
        <Image
          className={styles.image}
          src={imageUrl}
          alt="landing page Image"
          width={661} // default image set up from prev course page
          height={260}
        />
        <div className={styles.garden}>
          <h2>Your Garden</h2>
          <div className={styles.gardenInfo}>Started on June 2024</div>
          <div className={styles.gardenInfo}>1 Plant collected</div>
          <div className={styles.gardenInfo}>3 Hours spent in total</div>
          <div className={styles.enterGarden}>Enter Garden</div>
        </div>
      </div>
    </div>
  );
}

function LandingPage() {
  const [currentModule] = useState({ imageUrl: '/landingpageImage.png', name: 'Chinenye Eneh' });

  return (
    <div className={styles.landingPage}>
      <WelcomeText imageUrl={currentModule.imageUrl} name={currentModule.name} />
      <CourseDisplay />
    </div>
  );
}

export default LandingPage;
