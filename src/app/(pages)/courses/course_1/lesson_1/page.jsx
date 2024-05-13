import React from 'react';

import TitleHeader from '@/app/components/TitleHeader';
import StickyButton from '@/app/components/StickyButton';
import LessonNumber from '@/app/components/LessonNumber';
import QuoteHighlight from '@/app/components/QuoteHighlight';
import GreyBoxHighlight from '@/app/components/GreyBoxHighlight';

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
      <LessonNumber lessonText="Lesson 1"/>
      <TitleHeader title="Introduction to the Plastics and Recycling Course" type="main" />
      <div> image here </div>
      <QuoteHighlight quoteText="Plastic is all around us. It's in our kitchens, shoes, entertainment systems, vehicles, and even our clothing."/>
      <GreyBoxHighlight />
      <StickyButton />
    </div>
  );
}

export default Course1Lesson1;
