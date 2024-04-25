'use client';

import React from 'react';
import styles from './page.module.css';
import ProgressBar from './progressBar';
import convertToURL from '@/app/convertToURL';

// course card component: individual course cards

function CourseCard({
  progress, color, background,
}) {
  const cardStyle = {
    backgroundImage: `url(${convertToURL(background)})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  // code for cours name, duration, and progress bar
  return (
    <div className={styles.courseCard} style={cardStyle}>
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
