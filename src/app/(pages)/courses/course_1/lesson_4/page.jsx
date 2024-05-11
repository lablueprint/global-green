import React from 'react';

import TitleHeader from '@/app/components/TitleHeader';
import StickyButton from '@/app/components/StickyButton';
import LessonNumber from '@/app/components/LessonNumber';
import QuoteHighlight from '@/app/components/QuoteHighlight';
import GreyBoxHighlight from '@/app/components/GreyBoxHighlight';

function Course1Lesson4() {
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
      <LessonNumber lessonText="Lesson 4"/>
      <img src="/lessons/1.png"/>
      <TitleHeader title="Recycling Responsibly" type="main" />
      <QuoteHighlight quoteText="Now that we understand the severity of plastic pollution’s effects on 
      our environment, we can discuss one of the best ways that we as individuals can help to mitigate 
      these issues: recycling!"/>
      <StickyButton />
    </div>
  );
}

export default Course1Lesson4;
