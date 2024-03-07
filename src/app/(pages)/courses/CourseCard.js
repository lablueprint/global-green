'use client';

import React from 'react';
import styles from './page.module.css';
import ProgressBar from './progressBar';

function CourseCard({ name, duration, progress }) {
  return (
    <div className={styles.courseCard}>
      <div className={styles.courseName}>
        {name}
      </div>
      <div className={styles.bottomBar}>
        <div className={styles.courseDuration}>
          {duration}
        </div>
        <div className={styles.progressBar}>
          <ProgressBar value={progress} x={progress} y={5} />
        </div>
      </div>
    </div>
  );
}

export default CourseCard;
