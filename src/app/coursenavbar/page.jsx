"use client";

import React from "react";
import styles from "src/app/coursenavbar/page.module.css";

function VertNavbar({ modules, setCurrentIndex, currentIndex }) {
  return (
    <div>
      <div className={styles.navBar}>
        <h3>Course Name</h3>
        <hr className={styles.horizonalBar} />
        <ul className={styles.bulletPoint}>
          {modules.map((module, index) => (
            <div className={styles.navbarEntries}>
              <li
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={index == currentIndex ? styles.activeNavItem : ""}
              >
                Lesson #{index + 1}: {module.lessonTitle}
              </li>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default VertNavbar;
