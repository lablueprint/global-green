'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { BsArrowLeft } from 'react-icons/bs';
import Course6Introduction from './lessons/introduction';
import Course6Lesson1 from './lessons/lesson1';
import Course6Lesson2 from './lessons/lesson2';
import Course6Lesson3 from './lessons/lesson3';
import Course6Lesson4 from './lessons/lesson4';
import styles from '../page.module.css';

function OceanPollution({ courseKey, stage }) {
  const router = useRouter();
  const nextLesson = () => { router.push(`/lesson/?courseKey=${courseKey}&stage=${Number(stage) + 1}`); };
  const nextQuiz = () => { router.push(`/quiz/?courseKey=${courseKey}&stage=${Number(stage)}`); };
  const backToRoadmap = () => { router.push(`/roadmap/course?courseKey=${courseKey}`); };

  const lessons = [
    <Course6Introduction handleNext={nextLesson} />,
    <Course6Lesson1 handleNext={nextQuiz} />,
    <Course6Lesson2 handleNext={nextQuiz} />,
    <Course6Lesson3 handleNext={nextQuiz} />,
    <Course6Lesson4 handleNext={nextQuiz} />,
  ];

  return (
    <div>
      <div onClick={backToRoadmap} className={styles['roadmap-button']}>
        <BsArrowLeft size="2%" color="black" />
        <div>Ocean Pollution</div>
      </div>
      {lessons[stage - 1]}
    </div>
  );
}

export default OceanPollution;
