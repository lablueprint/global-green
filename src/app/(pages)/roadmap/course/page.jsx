'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Roadmap from '../roadmap';
import Loading from '../../loading';
function CourseRoadmap({ params, searchParams }) {
  const { courseKey } = searchParams;
  const { data: session } = useSession();
  const [currStage, setCurrStage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);

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
    // sustainability labs needs 2 or more completed courses to unlock
    if (courseKey === 'sustainabilitylabs') {
      const completedCourses = data.user.courses.filter((course) => course.currStage >= 6);
      console.log('completedCourses', completedCourses);
      if (completedCourses.length >= 2) {
        setHasAccess(true);
      }
    }
    else {
      setHasAccess(true);
    }
    if (userCourseRecord) {
      setCurrStage(userCourseRecord.currStage);
    }
    setLoading(false);
    
  };

  useEffect(() => {
    getUserDetails(session?.user.id);

  }, [session]);

  if (loading) {
    return <Loading />;
  }
  
  if (!hasAccess) {
    return (
      <div>
        <h1>Access Denied</h1>
        <p>Complete 2 or more courses to unlock this course!</p>
      </div>
    );
  }

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
