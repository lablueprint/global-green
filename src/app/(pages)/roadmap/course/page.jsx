'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Roadmap from '../roadmap';

function CourseRoadmap({ params, searchParams }) {
  const { courseKey } = searchParams;
  const { data: session } = useSession();
  const [currStage, setCurrStage] = useState(1);

  const getUserDetails = async (id) => {
    if (!id) return;
    const response = await fetch('/api/users/me', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });

    const data = await response.json();
    const userCourseRecord = data.user.courses.find((course) => course.key === courseKey);
    if (userCourseRecord) {
      setCurrStage(userCourseRecord.currStage);
    }
    
  };

  useEffect(() => {
    getUserDetails(session?.user.id);

  }, [session]);
  

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
