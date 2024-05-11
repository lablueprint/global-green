import React from 'react';

import TitleHeader from '@/app/components/TitleHeader';
import StickyButton from '@/app/components/StickyButton';
import LessonNumber from '@/app/components/LessonNumber';
import QuoteHighlight from '@/app/components/QuoteHighlight';
import GreyBoxHighlight from '@/app/components/GreyBoxHighlight';

function Course1Lesson3() {
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
      <LessonNumber lessonText="Lesson 3"/>
      <img src="/lessons/1.png"/>
      <TitleHeader title="Plastic Pollution" type="main" />
      <QuoteHighlight quoteText="New plastic is being made all the time."/>
      <div> Content </div>
      <div> Image </div>
      <TitleHeader title="End Destination of Plastics" type="sub" />
      <div> Content </div>
      <TitleHeader title="Landfills" type="sub" />
      <div> Image </div>
      <TitleHeader title="Garbage Patches" type="sub" />
      <div> Content </div>
      <div> Image </div>
      <div> Content </div>



      <StickyButton />
    </div>
  );
}

export default Course1Lesson3;
