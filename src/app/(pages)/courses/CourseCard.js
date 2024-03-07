'use client';

import React from 'react';
import styles from './page.module.css';

function CourseCard() {
  return (
    <div className={styles.courseCard}>
      <div className={styles.courseName}> Plastic & Recycling </div>
      <div className={styles.time}> 2 hrs </div>
      <div className={styles.progressBar}> progress bar </div>
    </div>
  );
}

export default CourseCard;
