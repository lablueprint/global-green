'use client';

import React, { useState } from 'react';
import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'; // import from Material UI Library
import Image from 'next/image';
import styles from './page.module.css';

export function WelcomeText({ imageUrl, name }) {
  return (
    <div className={styles.WelcomeText}>
      {' '}
      <h1>
        Welcome,
        {name}
      </h1>
      <div className={styles.lpbuttoncontainer}>
        <Image
          className={styles.landingpageImage}
          src={imageUrl}
          alt="landing page Image"
          width={661} // default image set up from prev course page
          height={260}
        />
        <p className={styles.enterGardenText}>Enter Garden</p>
        <Button
          variant="contained"
          color="primary"
          className={styles.lpbutton}
          endIcon={<ArrowForwardIcon />}
        >
          Enter Garden
        </Button>
      </div>
    </div>
  );
}

function CourseCardPlaceholder({ courseName }) {
  return (
    <div className={styles.courseCard}>
      <h3>{courseName}</h3>
      <p>
        This is a placeholder for the
        {courseName}
        {' '}
        course.
      </p>
    </div>
  );
}

function LandingPage() {
  const courses = [
    'Plastic & Recycling',
    'Ocean Pollution',
    'Eco-friendly Traveling',
    'Ecosystem Conservation',
    'Climate Change',
  ];

  const [currentModule] = useState({ imageUrl: '/landingpageImage.png', name: 'Chinenye Eneh' });

  return (
    <div className={styles.landingPage}>
      {}
      <WelcomeText imageUrl={currentModule.imageUrl} name={currentModule.name} />

      <div className={styles.courseOverview}>
        {courses.map((courseName) => (
          <CourseCardPlaceholder key={courseName} courseName={courseName} />
        ))}
      </div>
    </div>
  );
}

export default LandingPage;
