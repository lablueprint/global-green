import React from 'react';
import CourseCard from './CourseCard';
import styles from './page.module.css';

const data = [{
  name: 'Plastic & Recycling',
  duration: '2 hrs',
  progress: 1,
  status: 'incomplete',
}, {
  name: 'Economy',
  duration: '1 hr',
  progress: 2,
  status: 'complete',
}];

function Courses() {
  return (
    <>
      <h1>Courses</h1>
      <div className={styles.courseContainer}>
        <div className={styles.courseToggle}>
          <div>All Courses</div>
          <div>Completed</div>
          <div>Incomplete</div>
        </div>
        <div className={styles.courseLayout}>
          {data.map((course) => (
            <CourseCard name={course.name} duration={course.duration} progress={course.progress} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Courses;
