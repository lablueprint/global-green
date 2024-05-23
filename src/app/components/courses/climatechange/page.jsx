'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { BsArrowLeft } from 'react-icons/bs';
import Course4Introduction from './lessons/introduction';
import Course4Lesson1 from './lessons/lesson1';
import Course4Lesson2 from './lessons/lesson2';
import Course4Lesson3 from './lessons/lesson3';
import Course4Lesson4 from './lessons/lesson4';
import styles from '../page.module.css';

function ClimateChange({ courseKey, stage }) {
  const router = useRouter();
  const { data: session } = useSession();

  const changeProgress = async (userId, currStage, complete) => {
    try {
      const response = await fetch('/api/users/me/change-progress', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          courseKey,
          currStage,
          complete,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error updating course progress:', errorData.error);
      } else {
        const responseData = await response.json();
        console.log('Course progress updated successfully:', responseData);
      }
    } catch (error) {
      console.error('Error updating course progress:', error);
    }
  };
  const handleIntro = async () => {
    if (session) {
      await changeProgress(session.user.id, 2, false);
      router.push(`/roadmap/course?courseKey=${courseKey}`);
    }
  };
  const nextQuiz = () => { router.push(`/quiz/?courseKey=${courseKey}&stage=${Number(stage)}`); };
  const backToRoadmap = () => { router.push(`/roadmap/course?courseKey=${courseKey}`); };

  const lessons = [
    <Course4Introduction handleNext={handleIntro} />,
    <Course4Lesson1 handleNext={nextQuiz} />,
    <Course4Lesson2 handleNext={nextQuiz} />,
    <Course4Lesson3 handleNext={nextQuiz} />,
    <Course4Lesson4 handleNext={nextQuiz} />,
  ];

  return (
    <div>
      <div onClick={backToRoadmap} className={styles['roadmap-button']}>
        <BsArrowLeft size="2%" color="black" />
        <div>Climate Change</div>
      </div>
      {lessons[stage - 1]}
    </div>
  );
}

export default ClimateChange;
