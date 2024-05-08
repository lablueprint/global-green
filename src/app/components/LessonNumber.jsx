'use client';

import { React } from 'react';
import styles from './page.module.css';

export default function LessonNumber({lessonText}) {
  return (
    <div className={styles['lesson-number']}>
      {lessonText}
    </div>
  );
}
