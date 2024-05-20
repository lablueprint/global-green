'use client';

import React from 'react';
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
  const nextLesson = () => { router.push(`/lesson/?courseKey=${courseKey}&stage=${Number(stage) + 1}`); };
  const nextQuiz = () => { router.push(`/quiz/?courseKey=${courseKey}&stage=${Number(stage)}`); };
  const backToRoadmap = () => { router.push(`/roadmap/course?courseKey=${courseKey}`); };

  const lessons = [
    <Course4Introduction handleNext={nextLesson} />,
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
