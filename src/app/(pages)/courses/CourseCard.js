'use client';

import React from 'react';
import styles from './page.module.css';

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
          <div className={styles.bar} />
          <div>
            {progress}
            /5
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;
