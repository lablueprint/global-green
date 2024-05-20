'use client';

import React, { useState } from 'react';
import Button from '@mui/material/Button';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Image from 'next/image';

import styles from './page.module.css';

function Module({
  modules, currentIndex, handlePrevClick, handleNextClick,
}) {
  const currentModule = modules[currentIndex];

  return (
    <div className={(styles.wrapper, styles.font)}>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;700&display=swap"
      />
      <h1>{currentModule.moduleName}</h1>
      <h2>{currentModule.lessonTitle}</h2>
      <p>{currentModule.text}</p>
      <Image
        className={styles.lessonImage}
        src={currentModule.imageUrl}
        alt="Lesson Image"
        width={500}
        height={500}
      />
      <div>
        {currentIndex != 0 && (
          <Button
            className={styles.previousButton}
            variant="outlined"
            onClick={handlePrevClick}
            disabled={currentIndex === 0}
          >
            <KeyboardArrowLeftIcon />
            Previous
          </Button>
        )}

        {currentIndex !== modules.length - 1 && (
          <Button
            className={styles.nextButton}
            variant="outlined"
            onClick={handleNextClick}
            disabled={currentIndex === modules.length - 1}
          >
            Next
            <KeyboardArrowRightIcon />
          </Button>
        )}
      </div>
    </div>
  );
}

export default function OceanPollution() {
  const data = [
    {
      moduleName: 'Ocean Pollution',
      lessonTitle:
        'Lesson 1: Introduction to the Plastics and Recycling Course',
      text: 'Plastic is all around us. It’s in our kitchens, shoes, entertainment systems, vehicles, and even our clothing. It is versatile—it can be light yet durable or soft and malleable—and there is virtually no industry in the world that doesn’t have some application for plastic. Chances are that you can see multiple pieces of one plastic or another in your immediate surroundings. Given its ubiquity, it can be easy to take such an abundance of plastic for granted. But what exactly is plastic, where does it come from, and how has it managed to so radically transform the world we live in since it was first created in the early 20th century? If you find yourself asking questions like these, you’re in the right place! Over the span of this Plastics and Recycling course, we’re going to take a deep dive into a variety of topics relating to the history, manufacture, applications, and hazards of plastic in our world today.',
      imageUrl: '/curiousgeorge.png',
    },
    {
      moduleName: 'Ocean Pollution',
      lessonTitle: 'Lesson 2: Where Does Plastic Come From?',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
      imageUrl: '/tuxedosam.webp',
    },
    {
      moduleName: 'Ocean Pollution',
      lessonTitle: 'Lesson 3: Resin Identification Codes',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
      imageUrl: '/clifford.webp',
    },
  ];

  const [currentIndex, setCurrentIndex] = React.useState(0);

  const handlePrevClick = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNextClick = () => {
    if (currentIndex < data.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className={styles.moduleContainer}>
      <Module
        modules={data}
        currentIndex={currentIndex}
        handlePrevClick={handlePrevClick}
        handleNextClick={handleNextClick}
      />
    </div>
  );
}
