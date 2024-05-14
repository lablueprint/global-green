'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Quiz from '../quiz/page';

function CoursePage({ params, searchParams }) {
  const { courseKey, stage } = searchParams;
  const router = useRouter();

  return (
    <>
      <div>
        {' '}
        Course
        {courseKey}
        {' '}
        Lesson
        {stage}
      </div>
      <button
        onClick={() => router.push(`/quiz/?courseKey=${courseKey}&stage=${stage}`)}
      >
        Take Quiz
      </button>
    </>
  );
}

export default CoursePage;
