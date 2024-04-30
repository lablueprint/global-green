'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import ProgressBar from './progressBar';
import convertToURL from '@/app/convertToURL';

// course card component: individual course cards

function CourseCard({
  courseKey, progress, color, background,
}) {
  const cardStyle = {
    backgroundImage: `url(${convertToURL(background)})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };
  const router = useRouter();

  const handleClick = () => {
    console.log('Course card clicked!', courseKey);
    switch (courseKey) {
      case 'plasticandrecycling':
        router.push('/roadmap/plastic-and-recycling');
        break;
      case 'eco-friendlytraveling':
        router.push('/roadmap/eco-friendly-travel');
        break;
      case 'oceanpollution':
        router.push('/roadmap/ocean-pollution');
        break;
      case 'ecosystemconservation':
        router.push('/roadmap/conservation-and-restoration');
        break;
      case 'climatechange':
        router.push('/roadmap/climate-change');
        break;
      case 'sustainabilitylab':
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
