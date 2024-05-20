'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { BsArrowLeft } from 'react-icons/bs';
import Course1Introduction from './lessons/introduction';
import Course1Lesson1 from './lessons/lesson1';
import Course1Lesson2 from './lessons/lesson2';
import Course1Lesson3 from './lessons/lesson3';
import Course1Lesson4 from './lessons/lesson4';
import styles from '../page.module.css';

function PlasticAndRecycling({ courseKey, stage }) {
  const router = useRouter();
  const nextLesson = () => { router.push(`/lesson/?courseKey=${courseKey}&stage=${Number(stage) + 1}`); };
  const nextQuiz = () => { router.push(`/quiz/?courseKey=${courseKey}&stage=${Number(stage)}`); };
  const backToRoadmap = () => { router.push(`/roadmap/course?courseKey=${courseKey}`); };

  const lessons = [
    <Course1Introduction handleNext={nextLesson} />,
    <Course1Lesson1 handleNext={nextQuiz} />,
    <Course1Lesson2 handleNext={nextQuiz} />,
    <Course1Lesson3 handleNext={nextQuiz} />,
    <Course1Lesson4 handleNext={nextQuiz} />,
  ];

  return (
    <div>
      <div onClick={backToRoadmap} className={styles['roadmap-button']}>
        <BsArrowLeft size="2%" color="black" />
        <div>Plastic & Recycling</div>
      </div>
      {lessons[stage - 1]}
    </div>
  );
}

export default PlasticAndRecycling;
