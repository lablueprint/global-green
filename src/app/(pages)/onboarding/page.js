'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

function Onboarding() {
  const router = useRouter();
  const videos = [
    '/RoadmapNavOnboarding.mov',
    '/GardenStoreOnboarding.mov',
    '/ChallengesOnboarding.mov',
  ];
  const topics = [
    'Roadmap and Navigation',
    'Garden and Store',
    'Challenges',
  ];
  const descriptions = [
    'Pick any course to start learning! Use the roadmap feature to get to the lesson content by clicking on the tile. Click the button in the top left to get back to the roadmap from the lesson page.',
    'When you finish a course, you earn points. You can use your points to buy accessories and backgrounds in the Store for your Garden. Let\'s walk through accessing your Garden from the Home page.',
    'Completing certain tasks will earn you points that you can spend in the Store.',
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  function nextSlide() {
    if (currentSlide === videos.length - 1) {
      router.push('/landing');
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  }

  function prevSlide() {
    setCurrentSlide(Math.max(0, currentSlide - 1));
  }

  return (
    <div className={styles['main-container']}>
      <div className={styles.container}>
        <div className={styles.title}>
          Global Green Scholar
        </div>
        <div className={styles.topic}>
          {topics[currentSlide]}
        </div>
        <div className={styles.description}>
          {descriptions[currentSlide]}
        </div>
        <div className={styles['carousel-container']}>
          <video
            className={styles['carousel-slide']}
            autoPlay
            muted
            loop
            controls
            src={videos[currentSlide]}
          />
        </div>
        <div className={styles.buttons}>
          <button type="button" className={styles['carousel-button']} onClick={prevSlide}>
            Previous
          </button>
          <div className={styles.dots}>
            {videos.map((video, index) => (
              <div
                key={index} // Added key prop with unique index
                className={currentSlide !== index ? styles.dot : styles['active-dot']}
                onClick={() => { setCurrentSlide(index); }}
              />
            ))}
          </div>
          <button type="button" className={styles['carousel-button']} onClick={nextSlide}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Onboarding;
