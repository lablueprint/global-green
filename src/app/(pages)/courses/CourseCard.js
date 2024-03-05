'use client';

import React from 'react';
import styles from './page.module.css';

function CourseCard({ name, duration, progress }) {
  return (
    <div className={styles.courseCard}>
      <div className={styles.courseName}>
        {name}
      </div>
      <div className={styles.time}>
        {duration}
      </div>
      <div className={styles.progressBar}>
        {progress}
      </div>
    </div>
  );
}

export default CourseCard;
