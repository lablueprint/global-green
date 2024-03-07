'use client';

import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'; // import from Material UI Library
import Image from 'next/image';
import styles from './page.module.css';

function GardenModal() {
  const [flowers, setFlowers] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
  });

  function toggleFlower(index) {
    setFlowers((prevFlowers) => ({
      ...prevFlowers,
      [index]: !prevFlowers[index],
    }));
  }
  return (
    <div className={styles.gardenModalOverlay}>
      <div className={styles.gardenModal}>
        <h2 className={styles.gardenModalText}>Your Garden</h2>
        <p className={styles.gardenModalText}>
          View your garden below.
        </p>
        <p className={styles.gardenModalSubtext}>
          Your garden is where you can see the progress of your learning journey.
        </p>
        <div className={styles.gardenModalImageContainer}>
          <div className={`${styles.gardenImage} ${styles.gardenBackground}`} />
          <div className={`${styles.gardenImage} ${styles.gardenEarth}`} />
          {flowers[1] && <div className={`${styles.gardenImage} ${styles.gardenFlower1}`} />}
          {flowers[2] && <div className={`${styles.gardenImage} ${styles.gardenFlower2}`} />}
          {flowers[3] && <div className={`${styles.gardenImage} ${styles.gardenFlower3}`} />}
          {flowers[4] && <div className={`${styles.gardenImage} ${styles.gardenFlower4}`} />}
          {flowers[5] && <div className={`${styles.gardenImage} ${styles.gardenFlower5}`} />}
          {flowers[6] && <div className={`${styles.gardenImage} ${styles.gardenFlower6}`} />}
          {flowers[7] && <div className={`${styles.gardenImage} ${styles.gardenFlower7}`} />}

        </div>
        <div className={styles.gardenModalCheckboxes}>
          {Object.keys(flowers).map((index) => (
            <div key={index} className={styles.gardenModalCheckboxContainer}>
              <input
                type="checkbox"
                checked={flowers[index]}
                onChange={() => toggleFlower(index)}
              />
              <label htmlFor={index}>
                Flower
                {index}
              </label>
            </div>
          ))}
        </div>

        <div className={styles.gardenModalButtonContainer}>
          <Button
            variant="contained"
            color="primary"
            sx={{
              backgroundColor: 'gray',
              borderRadius: '50px',
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            sx={{
              backgroundColor: 'green',
              borderRadius: '50px',
            }}
          >
            Customize
          </Button>

        </div>
      </div>
    </div>
  );
}
export function WelcomeText({
  imageUrl, name, setIsGardenModalOpen,
}) {
  // garden related stuff

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
          onClick={() => setIsGardenModalOpen(true)}
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

  const [isGardenModalOpen, setIsGardenModalOpen] = useState(false);

  const [currentModule] = useState({ imageUrl: '/landingpageImage.png', name: 'Chinenye Eneh' });

  return (
    <div className={styles.landingPage}>
      {isGardenModalOpen && <GardenModal />}
      <WelcomeText
        imageUrl={currentModule.imageUrl}
        name={currentModule.name}
        setIsGardenModalOpen={setIsGardenModalOpen}
      />

      <div className={styles.courseOverview}>
        {courses.map((courseName) => (
          <CourseCardPlaceholder key={courseName} courseName={courseName} />
        ))}
      </div>
    </div>
  );
}

export default LandingPage;
