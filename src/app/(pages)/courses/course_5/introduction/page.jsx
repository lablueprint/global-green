'use client';

import React from 'react';
import TitleHeader from '@/app/components/TitleHeader';
import StickyButton from '@/app/components/StickyButton';
import LessonNumber from '@/app/components/LessonNumber';
import QuoteHighlight from '@/app/components/QuoteHighlight';
import Textbox from '@/app/components/Textbox';

const content1 = [
  ['The excitement of new experiences, seeing new cultures, or simply visiting friends and family—all of these are great reasons to hop on a plane or take a road trip. But with all the joys of traveling comes some things to stay mindful of, namely the impact of traveling on the environment.'],
  ['Transportation accounts for around 14% of global greenhouse gas emissions. This includes fossil fuels burned for road, rail, air, and marine transportation, which is nearly entirely reliant on fossil fuels (though this number has been decreasing slowly in recent years). Because we are now living in a truly global world, people and goods are constantly in motion from one side of the planet to the other. So what are some ways that we can continue to enjoy this unprecedented freedom and exploration without compromising the health of our planet and ecosystems?'],
  ['That’s where eco-friendly travel comes in! Over the span of this course, we will take a look at the practices that nations and individuals alike can put in place to mitigate the environmental harms of travel. In lesson two, we’ll analyze various modes and transit and compare their pros and cons so that we can understand why flying is more energy-intensive than taking a train. Then, in lesson 3, we’ll study ways that we can be courteous guests when away from home by honoring and respecting local sustainability practices and economies. In Lesson 4, we’ll uncover the nuances of the phenomenon known as eco-tourism, or the ideal of traveling to natural areas without causing them harm. Finally, in lesson 5, we’ll share some of our favorite tips for traveling sustainably at home and abroad.'],
  ['Remember, there’s a lot to see in this beautiful world of ours, and it’s only through the protection of our ecosystems that we can guarantee that future generations will enjoy the same luxuries we do today.'],
];

function Course5Introduction() {
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
      <LessonNumber lessonText="Introduction" />
      <TitleHeader title="Introduction to Sustainable Travel" type="main" />
      <QuoteHighlight quoteText="Whether it’s by plane, train, or automobile, traveling can be a source of immense joy for many people." />
      <Textbox content={content1} />
      <StickyButton text="Next" callback={() => { console.log('Go to lesson 1'); }} />
    </div>
  );
}

export default Course5Introduction;
