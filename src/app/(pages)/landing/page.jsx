'use client';

import React, { useState } from 'react';
import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'; // import from Material UI Library
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';
import styles from './page.module.css';
import CourseDisplay from './CourseDisplay';

function LandingPage() {
  const [currentModule] = useState({ imageUrl: '/landingpageImage.png', name: 'Chinenye Eneh' });

  const { data: session } = useSession();

  // seeing landing page banner
  return (
    <div className={styles.landingPage}>
      <div className={styles.welcome}>
        <h1>
          Welcome,
        </h1>
        <h1 className={styles.userName}>{session.user.name}</h1>
      </div>
      <div className={styles.banner}>
        <div className={styles.imageGarden}>
          {/* landing page image */}
          <Image
            className={styles.image}
            src={currentModule.imageUrl}
            alt="landing page Image"
            width={600}
            height={300}
            style={{ borderRadius: '10px' }}
          />
          {/* going to garden */}
          <div className={styles.garden}>
            <h2>Your Garden</h2>
            <div className={styles.gardenInfo}>Started on June 2024</div>
            <div className={styles.gardenInfo}>1 Plant collected</div>
            <div className={styles.gardenInfo}>3 Hours spent in total</div>
            <div className={styles.enterGarden}>Enter Garden</div>
          </div>
        </div>
      </div>
      <CourseDisplay />
    </div>
  );
}

export default LandingPage;
