'use client';

import { React } from 'react';
import PropTypes from 'prop-types';
import styles from './page.module.css';

export default function LessonNumber({ lessonText }) {
  return (
    <div className={styles['lesson-number']}>
      {lessonText}
    </div>
  );
}

LessonNumber.propTypes = {
  lessonText: PropTypes.string.isRequired,
};
