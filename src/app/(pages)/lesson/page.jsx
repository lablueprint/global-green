'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import PlasticAndRecycling from '@/app/components/courses/plasticandrecycling/page';
import ClimateChange from '@/app/components/courses/climatechange/page';
import OceanPollution from '@/app/components/courses/oceanpollution/page';
import EcoSystemConservation from '@/app/components/courses/ecosystemconservation/page';
import EcoFriendlyTravelling from '@/app/components/courses/eco-friendlytraveling/page';
import SustainabilityLab from '@/app/components/courses/sustainabilitylab/page';
import Loading from '../loading';

function CoursePage({ params, searchParams }) {
  const { courseKey, stage } = searchParams;
  const { data: session } = useSession();
  const [hasAccess, setHasAccess] = useState(false);
  const [loading, setLoading] = useState(true);

  const courseToShow = {
    plasticandrecycling: <PlasticAndRecycling courseKey={courseKey} stage={stage} />,
    climatechange: <ClimateChange courseKey={courseKey} stage={stage} />,
    oceanpollution: <OceanPollution courseKey={courseKey} stage={stage} />,
    conservationandrestoration: <EcoSystemConservation courseKey={courseKey} stage={stage} />,
    'eco-friendlytravel': <EcoFriendlyTravelling courseKey={courseKey} stage={stage} />,
    sustainabilitylab: <SustainabilityLab courseKey={courseKey} stage={stage} />,
  };

  const checkUserHasAccess = async (id) => {
    if (!id) return;
    const response = await fetch('/api/users/me', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });
    const data = await response.json();
    console.log('checking user access', data.user.courses);
    const userCourseRecord = data.user.courses.find((course) => course.key === courseKey);
    // if user doesnt have the course, they can only access stage 1
    console.log('userCourseRecord', userCourseRecord);
    if (!userCourseRecord) {
      console.log('user doesnt have course');
      console.log('stage', stage);
      if (Number(stage) === 1) {
        setHasAccess(true);
      }
    } else if (Number(stage) <= Number(userCourseRecord.currStage)) {
      setHasAccess(true);
    }

    setLoading(false);
  };

  const router = useRouter();

  const backToRoadmap = () => {
    router.push(`/roadmap/course?courseKey=${courseKey}`);
  };

  // const goToQuiz = () => {
  //   router.push(`quiz?courseKey=${courseKey}&stage=${stage}`);
  // };

  useEffect(
    () => {
      if (session) checkUserHasAccess(session.user.id);
    },
    [session],
  );

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      {hasAccess ? courseToShow[courseKey] : 'You do not have access to this course yet'}
    </div>
  );
}

export default CoursePage;
