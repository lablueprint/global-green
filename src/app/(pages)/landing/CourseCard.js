'use client';

import React from 'react';
import styles from './page.module.css';
import ProgressBar from './progressBar';

// course card component: individual course cards

function CourseCard({
  name, duration, progress, color, background,
}) {
  const cardStyle = {
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  // code for cours name, duration, and progress bar
  return (
    <div className={styles.courseCard} style={cardStyle}>
      <div className={styles.courseName}>
        {name}
      </div>
      <div className={styles.bottomBar}>
        <div className={styles.courseDuration} style={{ backgroundColor: color }}>
          {duration}
        </div>
        <div className={styles.progressBar}>
          <ProgressBar value={progress} x={progress} y={5} color={color} />
        </div>
      </div>
    </div>
  );
}

export default CourseCard;