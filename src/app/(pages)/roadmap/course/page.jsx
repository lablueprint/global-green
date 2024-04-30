import React from 'react';
import Roadmap from '../roadmap';

function CourseRoadmap({ params, searchParams }) {
  const { courseKey, currStage } = searchParams;
  return (
    <Roadmap
      courseKey={courseKey}
      title={courseKey}
      currStage={currStage}
      courseInfo={`This is the course information for ${courseKey}`}
    />
  );
}
export default CourseRoadmap;
