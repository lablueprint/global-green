'use client';

import React from 'react';
import LinearWithValueLabel from './progressbar';
import styles from './page.module.css';
import RoadmapSVG from './roadmapSVG';

function Roadmap({
  courseKey, title, currStage, courseInfo = "Plastic is all around us. It's in our kitchens, shoes, entertainment systems, vehicles, and even our clothing. Lorem ipsum...",
}) {
  const totalProgress = (currStage / 6) * 100;

  return (
    <div className={styles.o}>
      <div className={styles.headerContainer}>
        <div className={styles.titleContainer}>
          <p>
            Courses &gt;
            {title}
          </p>
        </div>
        <div className={styles.title}>
          <h1>{title}</h1>
        </div>
        <LinearWithValueLabel
          value={totalProgress}
          x={currStage}
          y={6}
          style={{ width: '50%' }}
        />
        <div className={styles.courseInformation}>
          {courseInfo}
        </div>
      </div>
      <div className={styles.roadmapContainer}>
        {RoadmapSVG
        && (
        <RoadmapSVG
          courseKey={courseKey}
          currStage={currStage}
        />
        )}
      </div>
    </div>
  );
}

export default Roadmap;
