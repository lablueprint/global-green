'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import ProgressBar from './progressBar';
import convertToURL from '@/app/convertToURL';
import { useRouter } from 'next/navigation'


// course card component: individual course cards

function CourseCard({
  progress, color, background,
}) {
  const cardStyle = {
    backgroundImage: `url(${convertToURL(background)})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };
  const router = useRouter();

  const handleClick = () => {
    console.log('Course card clicked!');
    switch (name) {
      case 'Plastic & Recycling':
        router.push('/roadmap/plastic-and-recycling');
        break;
      case 'Eco-friendly Traveling':
        router.push('/roadmap/eco-friendly-travel');
        break;
      case 'Ocean Pollution':
        router.push('/roadmap/ocean-pollution');
        break;
      case 'Ecosystem Conservation':
        router.push('/roadmap/conservation-and-restoration');
        break;
      case 'Climate Change':
        router.push('/roadmap/climate-change');
        break;
      case 'Sustainability Lab':
        router.push('/roadmap/sustainability-labs');
        break;
    }
  };

  // code for cours name, duration, and progress bar
  return (
    <div className={styles.courseCard} style={cardStyle} onClick={handleClick}>
      <div className={styles.courseName}>
        {/* {name} */}
      </div>
      <div className={styles.bottomBar}>
        <div className={styles.courseDuration} style={{ backgroundColor: color }}>
          2 h
        </div>
        <div className={styles.progressBar}>
          <ProgressBar
            value={progress}
            maxValue={6}
            x={progress}
            y={6}
            color={color}
          />
        </div>
      </div>
    </div>
  );
}

export default CourseCard;
