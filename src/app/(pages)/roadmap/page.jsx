// pages/roadmap/roadmaps.jsx
import React from 'react';
import Link from 'next/link';

const roadmapsList = [
  { path: 'plastic-and-recycling', title: 'Plastic and Recycling' },
  { path: 'course-2', title: 'Course 2' },
  { path: 'course-3', title: 'Course 3' },

];

function RoadmapsIndexPage() {
  return (
    <div>
      <h1>Roadmaps</h1>
      <ul>
        {roadmapsList.map((roadmap, index) => (
          <li key={index}>
            <Link href={`/roadmap/${roadmap.path}`}>{roadmap.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RoadmapsIndexPage;
