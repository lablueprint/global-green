'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { BsArrowLeft } from 'react-icons/bs';
import Course3Introduction from './lessons/introduction';
import Course3Lesson1 from './lessons/lesson1';
import Course3Lesson2 from './lessons/lesson2';
import Course3Lesson3 from './lessons/lesson3';
import Course3Lesson4 from './lessons/lesson4';
import styles from '../page.module.css';

function EcoSystemConservation({ courseKey, stage }) {
  const router = useRouter();
  const nextLesson = () => { router.push(`/lesson/?courseKey=${courseKey}&stage=${Number(stage) + 1}`); };
  const nextQuiz = () => { router.push(`/quiz/?courseKey=${courseKey}&stage=${Number(stage)}`); };
  const backToRoadmap = () => { router.push(`/roadmap/course?courseKey=${courseKey}`); };

  const lessons = [
    <Course3Introduction handleNext={nextLesson} />,
    <Course3Lesson1 handleNext={nextQuiz} />,
    <Course3Lesson2 handleNext={nextQuiz} />,
    <Course3Lesson3 handleNext={nextQuiz} />,
    <Course3Lesson4 handleNext={nextQuiz} />,
  ];

  return (
    <div>
      <div onClick={backToRoadmap} className={styles['roadmap-button']}>
        <BsArrowLeft size="2%" color="black" />
        <div>Ecosystem Conservation</div>
      </div>
      {lessons[stage - 1]}
    </div>
  );
}

export default EcoSystemConservation;
