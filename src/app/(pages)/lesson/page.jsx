'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PlasticAndRecycling from '@/app/components/courses/plasticandrecycling/page';

function CoursePage({ params, searchParams }) {
  const { courseKey, stage } = searchParams;

  const courseToShow = {
    plasticandrecycling: <PlasticAndRecycling stage={stage} />,
  };

  const router = useRouter();

  const backToRoadmap = () => {
    router.push(`/roadmap/course?courseKey=${courseKey}`);
  };

  return (
    <div>
      {courseKey}
      {' '}
      {stage}
      {' '}
      <button type="button" onClick={backToRoadmap}>Back to Roadmap</button>
      <div>
        {courseToShow[courseKey]}
      </div>
    </div>
  );
}

export default CoursePage;
