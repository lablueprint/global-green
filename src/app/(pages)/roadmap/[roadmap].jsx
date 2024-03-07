// pages/roadmap/[roadmap].jsx
import React from 'react';
import { useRouter } from 'next/router';
import Roadmap from './roadmapfunction';

const roadmapsData = {
  'plastic-and-recycling': {
    title: 'Plastic and Recycling',
    steps: [
      { id: 1, title: 'Introduction', completed: true },
      { id: 2, title: 'Topic 1', completed: false },
      { id: 3, title: 'Topic 2', completed: false },
    ],
  },
  'course-2': {
    title: 'Course 2',
    steps: [
      { id: 1, title: 'Module 1', completed: true },
      { id: 2, title: 'Module 2', completed: false },
      { id: 3, title: 'Module 3', completed: false },
    ],
  },
};

function RoadmapPage() {
  const router = useRouter();
  const { roadmap } = router.query;

  const roadmapData = roadmapsData[roadmap];
  if (!roadmapData) {
    return <p>Roadmap not found.</p>;
  }

  return <Roadmap title={roadmapData.title} steps={roadmapData.steps} />;
}

export default RoadmapPage;
