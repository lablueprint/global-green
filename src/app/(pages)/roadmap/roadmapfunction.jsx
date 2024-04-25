'use client'

import React from 'react';
import LinearWithValueLabel from './progressbar';
import styles from './page.module.css';
import coursesRoadmaps from './roadmap_data/roadmaps';

function Roadmap({ course, title, steps }) {
  const totalSteps = steps.length;
  const completedSteps = steps.filter(step => step.completed === 'done').length;
  const totalProgress = (completedSteps / totalSteps) * 100;

  console.log(completedSteps + 1)
  console.log(course) // outputs course_1 in console.log
  const SvgComponent = coursesRoadmaps[course][completedSteps - 1];

  return (
    <div className={styles.o}>
      <div className={styles.headerContainer}>
        <div className={styles.titleContainer}>
          <p>Courses &gt; {title}</p>
        </div>
        <div className={styles.title}>
          <h1>{title}</h1>
        </div>
        <LinearWithValueLabel
          value={totalProgress}
          x={completedSteps}
          y={totalSteps}
          style={{ width: '50%' }}
        />
        <div className={styles.courseInformation}>
          Plastic is all around us. It's in our kitchens, shoes, entertainment systems, vehicles, and even our clothing. Lorem ipsum...
        </div>
      </div>
      <div className={styles.roadmapContainer}>
        {SvgComponent && <SvgComponent />}
      </div>
    </div>
  );
}

export default Roadmap;
