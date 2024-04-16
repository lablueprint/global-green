'use client';

import React, { useState } from 'react';
import CourseCard from './CourseCard';
import styles from './page.module.css';
import courseData from './courseData';

// course display: seeing all courses, incomplete, complete courses
function CourseDisplay() {
  const [filter, setFilter] = useState('all');

  const filteredData = courseData.filter((course) => {
    if (filter === 'completed') {
      return course.progress === 5;
    } if (filter === 'incomplete') {
      return course.progress < 5;
    }
    return true;
  });

  return (
    <div className={styles.courseContainer}>
      <div className={styles.courseToggle}>
        <div
          className={filter === 'all' ? styles.active : ''}
          onClick={() => setFilter('all')}
        >
          All Courses
        </div>
        <div
          className={filter === 'incomplete' ? styles.active : ''}
          onClick={() => setFilter('incomplete')}
        >
          Incomplete
        </div>
        <div
          className={filter === 'completed' ? styles.active : ''}
          onClick={() => setFilter('completed')}
        >
          Complete
        </div>
      </div>
      {/* displaying all of the courses */}
      <div className={styles.courseLayout}>
        {filteredData.map((course) => (
          <CourseCard
            key={`${course.name}-${course.duration}`}
            name={course.name}
            duration={course.duration}
            progress={course.progress}
            color={course.color}
            background={course.background}
          />
        ))}
      </div>
    </div>
  );
}

export default CourseDisplay;
