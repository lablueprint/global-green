'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PlasticAndRecycling from '@/app/components/courses/plasticandrecycling/page';
import ClimateChange from '@/app/components/courses/climatechange/page';
import OceanPollution from '@/app/components/courses/oceanpollution/page';
import EcoSystemConservation from '@/app/components/courses/ecosystemconservation/page';
import EcoFriendlyTravelling from '@/app/components/courses/eco-friendlytraveling/page';
import SustainabilityLab from '@/app/components/courses/sustainabilitylab/page';

function CoursePage({ params, searchParams }) {
  const { courseKey, stage } = searchParams;

  const courseToShow = {
    plasticandrecycling: <PlasticAndRecycling stage={stage} />,
    climatechange: <ClimateChange stage={stage} />,
    oceanpollution: <OceanPollution stage={stage} />,
    conservationandrestoration: <EcoSystemConservation stage={stage} />,
    'eco-friendlytravel': <EcoFriendlyTravelling stage={stage} />,
    sustainabilitylabs: <SustainabilityLab stage={stage} />,
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
