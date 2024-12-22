'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { BsArrowLeft } from 'react-icons/bs';
import { LinearWithValueLabel } from './progressbar';
import styles from './page.module.css';
import RoadmapSVG from './roadmapSVG';

function Roadmap({
  courseKey,
  title,
  currStage,
  courseInfo = "Plastic is all around us. It's in our kitchens, shoes, entertainment systems, vehicles, and even our clothing. Lorem ipsum...",
}) {
  const router = useRouter();
  const totalProgress = ((currStage - 1) / 6) * 100;

  const courseKeyToTitle = {
    introduction: 'Introduction',
    plasticandrecycling: 'Plastic and Recycling',
    sustainabilitylabs: 'Sustainability Labs',
    conservationandrestoration: 'Conservation and Restoration',
    climatechange: 'Climate Change',
    'eco-friendlytravel': 'Eco-Friendly Travel',
    oceanpollution: 'Ocean Pollution',
  };

  const backToRoadmap = () => {
    router.push('/landing');
  };

  return (
    <div className={styles.o}>
      <div className={styles.headerContainer}>
        <div className={styles.titleContainer}>
          <div onClick={backToRoadmap} className={styles.roadmapBtn}>
            <BsArrowLeft style={{ color: 'rgba(13, 13, 13, 0.8)' }} />
            <div>Home</div>
          </div>
        </div>
        <div className={styles.title}>
          <h1>{courseKeyToTitle[courseKey]}</h1>
        </div>
        <LinearWithValueLabel value={totalProgress} x={currStage} y={6} />
        <div className={styles.courseInformation}>{courseInfo}</div>
      </div>
      <div className={styles.roadmapContainer}>
        {RoadmapSVG && (
          <RoadmapSVG courseKey={courseKey} currStage={currStage} />
        )}
      </div>
    </div>
  );
}
export default Roadmap;
