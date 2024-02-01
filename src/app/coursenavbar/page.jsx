"use client";

import React from "react";
import styles from "src/app/coursenavbar/page.module.css";

function VertNavbar({ modules, setCurrentIndex, currentIndex }) {
  return (
    <div className={(styles.navBar, styles.font, styles.rightBorder)}>
      <h3 className={styles.moduleTitle}>{modules[0].moduleName}</h3>
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
              {module.lessonTitle}
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default VertNavbar;
