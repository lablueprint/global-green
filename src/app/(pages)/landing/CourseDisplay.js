'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import CourseCard from './CourseCard';
import styles from './page.module.css';

// course display: seeing all courses, incomplete, complete courses
function CourseDisplay() {
  const [courseData, setCourseData] = useState([]);
  const [courseProgress, setCourseProgress] = useState([]);
  const [filter, setFilter] = useState('all');
  const { data: session } = useSession();

  const [filteredData, setFilteredData] = useState([]);
  async function fetchCoursesData() {
    const response = await fetch('/api/courses');
    const data = await response.json();
    console.log('api courses', data);
    setCourseData(data.res);
  }

  const filterData = (filterX) => {
    console.log('filterX', filterX);
    console.log('courseData', courseData);
    if (!courseData) {
      return;
    }
    const tempFilteredData = courseData.map((course) => {
      const progress = courseProgress.find((c) => c.key === course.key);
      if (progress) {
        return {
          ...course,
          progress: progress.currStage,
        };
      }
      return {
        ...course,
        progress: 0,
      };
    }).filter((course) => {
      if (filterX === 'completed') {
        return course.progress >= 6;
      } if (filterX === 'incomplete') {
        return course.progress < 6;
      }
      return true;
    });
    setFilteredData(tempFilteredData);
  };

  const getUserDetails = async (id) => {
    console.log('id', id);
    if (!id) return;
    const response = await fetch('/api/users/me', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });

    const data = await response.json();
    setCourseProgress(data.user.courses);
    filterData('all');
    console.log('filteredData', filteredData);
  };

  useEffect(
    () => {
      console.log('session', session);
      if (session) getUserDetails(session.user.id);
      if (courseData.length === 0) fetchCoursesData();
    },
    [session, courseData],
  );

  return (
    <div className={styles.courseContainer}>
      <div className={styles.courseToggle}>
        <div
          className={filter === 'all' ? styles.active : ''}
          onClick={() => {
            setFilter('all');
            filterData('all');
          }}
        >
          All Courses
        </div>
        <div
          className={filter === 'incomplete' ? styles.active : ''}
          onClick={() => {
            setFilter('incomplete');
            filterData('incomplete');
          }}
        >
          Incomplete
        </div>
        <div
          className={filter === 'completed' ? styles.active : ''}
          onClick={() => {
            setFilter('completed');
            filterData('completed');
          }}
        >
          Complete
        </div>
      </div>
      {/* displaying all of the courses */}
      <div className={styles.courseLayout}>
        {filteredData.map((course) => (
          <CourseCard
            courseKey={`${course.key}`}
            duration={course.stages.length}
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
