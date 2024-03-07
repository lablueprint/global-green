"use client";
import React, { useState } from "react";
import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'; //import from Material UI Library
import styles from './page.module.css';
import Image from "next/image";

export const WelcomeText = ({ imageUrl, name }) => (
  <div className={styles.WelcomeText}> //divided text into seperate static component
    <h1>Welcome, {name}</h1>
    <div className={styles.lpbuttoncontainer}>
      <Image
        className={styles.landingpageImage}
        src={imageUrl}
        alt="landing page Image"
        width={661} //default image set up from prev course page
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

const CourseCardPlaceholder = ({ courseName }) => ( //placeholder until course card becomes integrated
  <div className={styles.courseCard}>
    <h3>{courseName}</h3>
    <p>This is a placeholder for the {courseName} course.</p>
  </div>
);

const LandingPage = () => {
  const courses = [
    'Plastic & Recycling',
    'Ocean Pollution',
    'Eco-friendly Traveling',
    'Ecosystem Conservation',
    'Climate Change',
  ];

  const [currentModule] = useState({ imageUrl: "/landingpageImage.png", name: "Chinenye Eneh" });

  return (
    <div className={styles.landingPage}>
      {}
      <WelcomeText imageUrl={currentModule.imageUrl} name={currentModule.name} />

      <div className={styles.courseOverview}>
        {courses.map(courseName => (
          <CourseCardPlaceholder key={courseName} courseName={courseName} />
        ))}
      </div>
    </div>
  );
};

export default LandingPage;

