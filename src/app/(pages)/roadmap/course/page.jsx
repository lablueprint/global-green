import React from 'react';
import Roadmap from '../roadmap';

function CourseRoadmap({ params, searchParams }) {
  const { courseKey } = searchParams;
  return (
    <Roadmap
      courseKey={courseKey}
      title={courseKey}
      currStage={6}
      courseInfo={`This is the course information for ${courseKey}`}
    />
  );
}
export default CourseRoadmap;
