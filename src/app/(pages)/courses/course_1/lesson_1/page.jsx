import React from 'react';

import TitleHeader from '@/app/components/TitleHeader';
import StickyButton from '@/app/components/StickyButton';
import LessonNumber from '@/app/components/LessonNumber';
import QuoteHighlight from '@/app/components/QuoteHighlight';
// import GreyBoxHighlight from '@/app/components/GreyBoxHighlight';

import GreyBoxHighlight from '@/app/components/courses_greybox/course_1/lesson_1/page';



function Course1Lesson1() {
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
      <LessonNumber lessonText="Introduction"/>
      <TitleHeader title="Introduction to the Plastics and Recycling Course" type="main" />
      <div> image here </div>
      <QuoteHighlight quoteText="Plastic is all around us. It's in our kitchens, shoes, entertainment systems, vehicles, and even our clothing."/>
      <GreyBoxHighlight />
      <StickyButton />
    </div>
  );
}

export default Course1Lesson1;
