import React from 'react';

import TitleHeader from '@/app/components/TitleHeader';
import StickyButton from '@/app/components/StickyButton';
import LessonNumber from '@/app/components/LessonNumber';
import QuoteHighlight from '@/app/components/QuoteHighlight';
// import GreyBoxHighlight from '@/app/components/GreyBoxHighlight';

import GreyBoxHighlight from '@/app/components/courses_greybox/course_1/lesson_2/page';



function Course1Lesson2() {
  return (
    <div
      style={{
        display: 'flex',
        gap: 30,
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '15%',
        paddingTop: '8%',
      }}
    >
      <LessonNumber lessonText="Lesson 2"/>
      <TitleHeader title="Where Does Plastic Come From?" type="main" />
      <div> image here </div>
      <QuoteHighlight quoteText="You probably already know that plastic isn't produced in nature."/>
      <GreyBoxHighlight />
      <StickyButton />
    </div>
  );
}

export default Course1Lesson2;
