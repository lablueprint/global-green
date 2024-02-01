'use client';

import React from 'react';
import styles from 'src/app/coursenavbar/page.module.css';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';

function VertNavbar({ modules, setCurrentIndex, currentIndex }) {
  return (
    <div className={(styles.navBar, styles.font, styles.rightBorder)}>
      <h3>Course Name</h3>
      <hr className={styles.horizonalBar} />
      <ul className={styles.bulletPoint}>
        {modules.map((module, index) => (
          <div className={styles.padding}>
            <li
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={
                index == currentIndex
                  ? styles.activeNavItem
                  : styles.navbarEntries
              }
            >
              Lesson #
              {index + 1}
              :
              {' '}
              {module.lessonTitle}
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default VertNavbar;
