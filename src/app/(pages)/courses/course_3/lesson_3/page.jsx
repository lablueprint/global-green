'use client';

import React from 'react';
import TitleHeader from '@/app/components/TitleHeader';
import StickyButton from '@/app/components/StickyButton';
import LessonNumber from '@/app/components/LessonNumber';
import QuoteHighlight from '@/app/components/QuoteHighlight';
import Textbox from '@/app/components/Textbox';

const content1 = [
  ['Let’s go to the deep south of the Louisiana wetlands, a vital ecosystem that historically has hosted a vast range of plant and animal species.'],
  ['<title>Louisiana Wetlands</title>'],
];

const content2 = [
  ['The Louisiana wetlands were formed over thousands of years by the flowing of the Mississippi River down to the Gulf of Mexico. Over time, this has created a network of bayous and marshes full of soft, water-saturated soil. The terrain is far from ideal for human development and inhabitation, but it is an oasis for migratory birds, a native habitat for alligators, and historically was permeated with forests of cypress trees and other native species. Despite this, large swathes of the Louisiana wetlands have been lost over the last 200 years.'],
  ['According to the United States Geological Survey, the wetlands of Louisiana make up about 40% of the wetlands in the continental U.S., but they account for about 80% of habitat loss in this category. Some of the primary causes of this habitat loss are dredging for canals, draining or filling for agriculture, and development of infrastructure. These activities have set the Louisiana wetlands on a course for total destruction; it is estimated that, at the current rate, they will be gone in the next 200 years.'],
  ['<title>Conservation & Restoration of the Louisiana Wetlands</title>'],
  ['Thankfully, the total loss of wetlands is not an inevitability. Both local and government groups in the area are taking action to <green>conserve</green> what is left of the wetlands while working to <green>restore</green> them to their former state. One of the key first steps is to prevent further loss due to human development. This means ceasing to dredge, fill, and modify these natural habitats to suit human needs. At this point, however, merely seeking to reduce the destruction of habitat is not enough to help the ecosystems bounce back fully. To accomplish this, more proactive measures are needed.'],
  ['That’s where coastal restoration groups come in. Organizations like these seek to help fill in the holes left behind in the ecosystem by human activities. For example, planting native species like cypress trees helps to prevent soil loss through erosion and subsidence, and new oyster reefs can be seeded by dumping bushels of oyster shells into dwindling populations, which encourages the growth and resurgence of oyster populations that have been reduced by overconsumption. This in turn provides new habitat for other coastal marine species like crabs and shrimp.'],
];

function Course3Lesson3() {
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
      <LessonNumber lessonText="Lesson 3" />
      <TitleHeader title="A Case Study in the Louisiana Wetlands" type="main" />
      <QuoteHighlight quoteText="Let’s take a closer look at an example of an endangered ecosystem and what is being done to conserve and restore it." />
      <Textbox content={content1} />
      <img src="/lessons/28.jpg" />
      <Textbox content={content2} />
      <StickyButton text="Go to quiz" callback={() => { console.log('Go to quiz 3'); }} />
    </div>
  );
}

export default Course3Lesson3;
