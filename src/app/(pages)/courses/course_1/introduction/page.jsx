import React from 'react';

import TitleHeader from '@/app/components/TitleHeader';
import StickyButton from '@/app/components/StickyButton';
import LessonNumber from '@/app/components/LessonNumber';
import QuoteHighlight from '@/app/components/QuoteHighlight';

function Course1Introduction() {
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
      <img src="/lessons/1.png"/>
      <QuoteHighlight quoteText="Plastic is all around us. It's in our kitchens, shoes, entertainment systems, vehicles, and even our clothing."/>
      <div> Content </div>
      <img src="/lessons/2.png"/>
      <div> drop-down menu </div>
      <div> Content </div>
      <StickyButton />
    </div>
  );
} 

export default Course1Introduction;
