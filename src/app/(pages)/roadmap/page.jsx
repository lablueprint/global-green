//src/app/(pages)/roadmap/page.jsx
'use client'
import React from 'react';
import { useRouter } from 'next/navigation'


const roadmapsList = [
  { path: 'plastic-and-recycling', title: 'Plastic and Recycling' },
  { path: 'course-2', title: 'Course 2' },
  { path: 'course-3', title: 'Course 3' },

];

function RoadmapsIndexPage() {
  const router = useRouter()
  return (
    <div>
      <h1>Roadmaps</h1>
      <ul>
            <button type="button" onClick={() => router.push('/roadmap/introduction')}> Introduction</button>
            <button type="button" onClick={() => router.push('/roadmap/plastic-and-recycling')}> Plastic and Recycling</button>
            <button type="button" onClick={() => router.push('/roadmap/sustainability-labs')}> Sustainability Labs</button>
            <button type="button" onClick={() => router.push('/roadmap/conservation-and-restoration')}> Conservation and Restoration</button>
            <button type="button" onClick={() => router.push('/roadmap/climate-change')}> Climate Change</button>
            <button type="button" onClick={() => router.push('/roadmap/eco-friendly-travel')}> Eco-Friendly Travel</button>
            <button type="button" onClick={() => router.push('/roadmap/ocean-pollution')}> Ocean Pollution</button>

      </ul>
    </div>
  );
}

export default RoadmapsIndexPage;
