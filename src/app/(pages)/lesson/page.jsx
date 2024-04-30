'use client';

import React, { useEffect } from 'react';

function CoursePage({ params, searchParams }) {
  const { courseKey, stage } = searchParams;
  return (
    <div>
      {' '}
      Course
      {courseKey}
      {' '}
      Lesson
      {stage}
    </div>
  );
}

export default CoursePage;
