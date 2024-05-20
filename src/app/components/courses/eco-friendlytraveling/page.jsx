'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { BsArrowLeft } from 'react-icons/bs';
import Course5Introduction from './lessons/introduction';
import Course5Lesson1 from './lessons/lesson1';
import Course5Lesson2 from './lessons/lesson2';
import Course5Lesson3 from './lessons/lesson3';
import Course5Lesson4 from './lessons/lesson4';
import styles from '../page.module.css';

function EcoFriendlyTravelling({ courseKey, stage }) {
  const router = useRouter();
  const nextLesson = () => { router.push(`/lesson/?courseKey=${courseKey}&stage=${Number(stage) + 1}`); };
  const nextQuiz = () => { router.push(`/quiz/?courseKey=${courseKey}&stage=${Number(stage)}`); };
  const backToRoadmap = () => { router.push(`/roadmap/course?courseKey=${courseKey}`); };

  const lessons = [
    <Course5Introduction handleNext={nextLesson} />,
    <Course5Lesson1 handleNext={nextQuiz} />,
    <Course5Lesson2 handleNext={nextQuiz} />,
    <Course5Lesson3 handleNext={nextQuiz} />,
    <Course5Lesson4 handleNext={nextQuiz} />,
  ];

  return (
    <div>
      <div onClick={backToRoadmap} className={styles['roadmap-button']}>
        <BsArrowLeft size="2%" color="black" />
        <div>Eco-friendly Traveling</div>
      </div>
      {lessons[stage - 1]}
    </div>
  );
}

export default EcoFriendlyTravelling;
