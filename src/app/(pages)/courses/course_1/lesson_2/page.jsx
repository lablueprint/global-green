import React from 'react';

import TitleHeader from '@/app/components/TitleHeader';
import StickyButton from '@/app/components/StickyButton';
import LessonNumber from '@/app/components/LessonNumber';
import QuoteHighlight from '@/app/components/QuoteHighlight';
import GreyBoxHighlight from '@/app/components/GreyBoxHighlight';

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
      <img src="/lessons/1.png"/>
      <TitleHeader title="Resin Identification Codes" type="main" />
      <QuoteHighlight quoteText="Quick! Take a look around you and find the nearest plastic item. What do you notice about it?"/>
      <div> Content </div>
      <TitleHeader title="Plastic Identifcation" type="sub" />
      <div> Content </div>
      <div> Recycling image </div>
      <div> Content </div>
      <GreyBoxHighlight />
      <div> Content </div>
      <div> Chart Component </div>
      <div> Content </div>
      <TitleHeader title="Repurposing of Plastics" type="sub" />
      <div> Content </div>
      <StickyButton />
    </div>
  );
}

export default Course1Lesson2;
