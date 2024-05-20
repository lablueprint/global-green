// src/app/(pages)/roadmap/page.jsx

'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

function RoadmapsIndexPage() {
  const router = useRouter();
  return (
    <div>
      <h1>Roadmaps</h1>
      <ul>
        <button
          type="button"
          onClick={() => router.push('/roadmap/course/?courseKey=introduction')}
        >
          {' '}
          Introduction
        </button>
        <button
          type="button"
          onClick={() => router.push('/roadmap/course/?courseKey=plastic-and-recycling')}
        >
          {' '}
          Plastic and Recycling
        </button>
        <button
          type="button"
          onClick={() => router.push('/roadmap/course/?courseKey=sustainability-labs')}
        >
          {' '}
          Sustainability Labs
        </button>
        <button
          type="button"
          onClick={() => router.push(
            '/roadmap/course/?courseKey=conservation-and-restoration',
          )}
        >
          {' '}
          Conservation and Restoration
        </button>
        <button
          type="button"
          onClick={() => router.push('/roadmap/course/?courseKey=climate-change')}
        >
          {' '}
          Climate Change
        </button>
        <button
          type="button"
          onClick={() => router.push('/roadmap/course/?courseKey=eco-friendly-travel')}
        >
          {' '}
          Eco-Friendly Travel
        </button>
        <button
          type="button"
          onClick={() => router.push('/roadmap/course/?courseKey=ocean-pollution')}
        >
          {' '}
          Ocean Pollution
        </button>
      </ul>
    </div>
  );
}

export default RoadmapsIndexPage;
