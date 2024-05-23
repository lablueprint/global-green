'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import ProgressBar from './progressBar';
import convertToURL from '@/app/convertToURL';
// course card component: individual course cards
function CourseCard({
  courseKey, progress, color, background,
}) {
  const cardStyle = {
    backgroundImage: `url(${convertToURL(background)})`,
  };
  const router = useRouter();
  const handleClick = () => {
    console.log('Course card clicked!', courseKey);
    switch (courseKey) {
      case 'plasticandrecycling':
        router.push('/roadmap/course/?courseKey=plasticandrecycling');
        break;
      case 'eco-friendlytravel':
        router.push('/roadmap/course/?courseKey=eco-friendlytravel');
        break;
      case 'oceanpollution':
        router.push('/roadmap/course/?courseKey=oceanpollution');
        break;
      case 'conservationandrestoration':
        router.push('/roadmap/course/?courseKey=conservationandrestoration');
        break;
      case 'climatechange':
        router.push('/roadmap/course/?courseKey=climatechange');
        break;
      case 'sustainabilitylab':
        router.push('/roadmap/course/?courseKey=sustainabilitylab');
        break;
    }
  };
  // code for cours name, duration, and progress bar
  return (
    <div className={styles.courseCard}>
      <div className={styles.courseCardImage} style={cardStyle} onClick={handleClick} />
      <div className={styles.bottomBar}>
        <div className={styles.progressBar}>
          <ProgressBar
            value={progress}
            maxValue={7}
            x={progress}
            y={6}
            color={color}
          />
        </div>
      </div>
    </div>
  );
}
export default CourseCard;
