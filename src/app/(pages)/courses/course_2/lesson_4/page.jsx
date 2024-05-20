'use client';

import React from 'react';
import TitleHeader from '@/app/components/TitleHeader';
import StickyButton from '@/app/components/StickyButton';
import LessonNumber from '@/app/components/LessonNumber';
import QuoteHighlight from '@/app/components/QuoteHighlight';
import Textbox from '@/app/components/Textbox';

const content1 = [
  ['Let’s take a look at the case study of the Fairmont Sirru Fen Fushi resort in the Maldives.'],
  ['<title>The Fairmont Sirru Fen Fushi Resort</title>'],
  ['Prior to implementing the Sustainability Lab model of plastic recycling, there were no plastic recycling centers in the entirety of the archipelago. Because the Fairmont Sirru Fen Fushi resort is an ecologically conscious business with existing sustainability goals and practices (such as using solar power), they wanted to find more ways to make their business practices sustainable. Because businesses like hotels and resorts often serve as funnels for large quantities of plastic waste, they had the perfect opportunity to implement a Sustainability Lab that would allow them not only to redirect this plastic waste but create and build with it.'],
  ['Collecting and sorting plastic waste away from what is sent to landfills gives the resort a sizable quantity of material to work with. With the Sustainability Lab fully installed and equipped, they also have all the equipment they need to make this a reality. By using these technologies, the Fairmont Sirru Fen Fushi resort is now able to provide for a variety of consumer and community needs. Their sustainability lab is able to manufacture items like:'],
];

const content2 = [
  ['<title> Colaboration Through Sustainability Labs</title>'],
  ['These items will be just as (if not more) durable and reusable as the original plastic materials they were made with, which allows the resort to cut down on their waste while also providing for their own business needs. The resort can also cater to community members’ needs and lend support on local initiatives where this upcycling and building capacity will further strengthen local projects.'],
  ['The best part is that this solution is easily scalable and can be implemented pretty much anywhere. Global Green envisions a world where a Sustainability Lab is easier to find than a piece of plastic in the ocean.'],
];

function Course2Lesson4() {
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
      <LessonNumber lessonText="Lesson 4" />
      <TitleHeader title="The Sustainability Lab in Action at Fairmont Sirru Fen Fushi" type="main" />
      <img src="/lessons/17.jpg" />
      <QuoteHighlight quoteText="Now that we understand how the Sustainability Lab can take plastic waste and transform it, it may help to see how Global Green’s model can benefit organizations and communities." />
      <Textbox content={content1} />
      <TitleHeader title="Furniture such as stools" type="sub" />
      <img src="/lessons/18.jpg" />
      <TitleHeader title="Accessories" type="sub" />
      <img src="/lessons/19.jpg" />
      <img src="/lessons/20.jpg" />
      <TitleHeader title="Building Materials such as tiles and bricks" type="sub" />
      <img src="/lessons/21.jpg" />
      <Textbox content={content2} />
      <StickyButton text="Go to quiz" callback={() => { console.log('Go to quiz 4'); }} />
    </div>
  );
}

export default Course2Lesson4;
