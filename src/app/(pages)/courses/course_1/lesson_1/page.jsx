import React from 'react';

import TitleHeader from '@/app/components/TitleHeader';
import StickyButton from '@/app/components/StickyButton';
import LessonNumber from '@/app/components/LessonNumber';
import QuoteHighlight from '@/app/components/QuoteHighlight';
import GreyBoxHighlight from '@/app/components/GreyBoxHighlight'
import Textbox from '@/app/components/Textbox';
;

const content1 = [
  [
    "Unlike the cellulose in plants or the wood used to make paper, plastic is a wholly synthetic, or man-made, material.", 
    "But that begs the question: just what is plastic, and how is it made?", 
    "You may be surprised to discover <green>that the main resource that goes into synthesizing plastic is fossil fuels.</green>"
  ],
];

const content2 = [
  [
    "Like the fuel we fill up the gas tanks of our cars with? Yes! Despite very different appearances,", 
    "<green>the vast majority of consumer plastics in the world are made from fossil fuels, especially crude oil.</green>",
     "But how does crude oil become a disposable bottle you can drink water from?"
  ],
  [
    "The answer, perhaps unsurprisingly, can get a little technical. That’s why we’re going to follow that plastic water bottle back in time so that we can follow its journey from the Earth’s crust to our homes."
  ],
];

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
      <TitleHeader title="Where does Plastic Come From?" type="main" />
      <img src="/lessons/1.png"/>
      <QuoteHighlight quoteText="You probably already know that plastic isn't produced in nature."/>
      <Textbox content={content1} />
      <TitleHeader title="Hold on-fossil fuels?" type="sub" />
      <Textbox content={content2} />
      <GreyBoxHighlight />
      <StickyButton />
    </div>
  );
}

export default Course1Lesson1;
