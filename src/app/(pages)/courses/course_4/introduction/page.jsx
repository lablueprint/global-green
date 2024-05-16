'use client';

import React from 'react';
import TitleHeader from '@/app/components/TitleHeader';
import StickyButton from '@/app/components/StickyButton';
import LessonNumber from '@/app/components/LessonNumber';
import QuoteHighlight from '@/app/components/QuoteHighlight';
import Textbox from '@/app/components/Textbox';

const content1 = [
  ['Because global climate patterns are formed by a complex system of local and regional forces that are interconnected in countless ways, a change in the climate of one region can have intense effects all over the globe.'],
  ['<title>Global Warming & the Greenhouse Effect</title>'],
  ['The primary force driving global climate change is <greenn>global warming</green>, which is fueled by the greenhouse effect. The <green>greenhouse effect</green> refers to how Earth’s atmosphere traps gasses such as carbon dioxide, which in turns causes the atmosphere to retain more heat. Over time, this retention of heat gradually warms the planet.'],
  ['To understand climate change, then, we’ll have to take a look at the causes of global warming. While it is true that the global climate has always varied over the course of centuries, the present situation we find ourselves in is undeniably driven by human activities in the post-industrial era. There is a strong correlation between the rising use of fossil fuels and the warming of the Earth’s climate. This is because burning fossil fuels emits greenhouse gasses (GHGs), which are much more effective at trapping heat.'],
];

const content2 = [
  ['Burning fossil fuels isn’t the only practice driving climate change. <green>Deforestation</green> also plays a major role in warming the Earth, because forests serve the vital function of converting its energy source, carbon dioxide, into oxygen. When we cut down forests to develop the land for human habitation or to use as a natural resource, we damage the Earth’s ability to convert carbon dioxide into oxygen.'],
  ['<title>Consequences of Excess Greenhouse Gasses</title>'],
  ['As the atmosphere warms, far-reaching changes around the world can be observed: rising temperatures, melting ice caps, and extreme weather events are among the most prominent consequences of the warming climate. These effects have drastically increased in pace since fossil fuels began to be used in industry and transportation.'],
  ['In this course, we will take a closer look at the causes and effects of global warming and climate change so that we can better equip ourselves to understand and address these complex issues in our everyday lives.'],
];

function Course4Introduction() {
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
      <TitleHeader title="Introduction to Climate Change" type="main" />
      <QuoteHighlight quoteText="Earth’s global climate is cyclical. Within this cycle are natural phenomena like ocean and air currents, patterns of precipitation, and natural variations in temperature." />
      <Textbox content={content1} />
      <img src="/lessons/28.jpg" />
      <Textbox content={content2} />
      <StickyButton text="Next" callback={() => { console.log('Go to lesson 1'); }} />
    </div>
  );
}

export default Course4Introduction;
