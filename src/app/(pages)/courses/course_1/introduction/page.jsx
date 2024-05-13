import React from 'react';
import TitleHeader from '@/app/components/TitleHeader';
import StickyButton from '@/app/components/StickyButton';
import LessonNumber from '@/app/components/LessonNumber';
import QuoteHighlight from '@/app/components/QuoteHighlight';
import Textbox from '@/app/components/Textbox';
// import DropDown from '@/app/components/coursepart1/DropDown';


const content1 = [
  [
    "It is versatile—it can be light yet durable or soft and malleable—and there is virtually no industry in the world that doesn’t have some application for plastic.",
    " Chances are that you can see multiple pieces of one plastic or another in your immediate surroundings."
  ],
  [
    "Given its ubiquity, it can be easy to take such an abundance of plastic for granted.",
    "But what exactly is plastic, where does it come from, and how has it managed to so radically transform the world we live in since it was first created in the early 20th century?"
  ],
  [
    "If you find yourself asking questions like these, you’re in the right place!",
    "Over the span of this <green>Plastics and Recycling course</green>, we’re going to take a deep dive into a variety of topics relating to the history, manufacture, applications, and hazards of plastic in our world today."
  ],
  [
    "By the end of this course, you’ll have the tools you need to understand the origins, benefits, and hazards of the modern world’s reliance on plastic."
  ]
];

const content2 = [
  [
    "The goal of this course is to help educate you so that you can make informed, thoughtful choices on a day to day basis while equipping you with the knowledge you need to understand and change the world around you.",
    " Because, like plastic, laws and regulations are malleable.",
    " <green>Collectively, we can take direct action to combat the hazardous and toxic effects of plastic production and pollution!</green>"
  ]
];

function Course1Introduction() {
  return (
    <div
      style={{
        display: 'flex',
        gap: '30px', // Added 'px' for correct spacing
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
      <Textbox content={content1} />
      <img src="/lessons/2.png"/>
      <div> Drop Down Menu</div>
      {/* <DropDown /> Included the DropDown component */}
      <Textbox content={content2} />
      <StickyButton />
    </div>
  );
}

export default Course1Introduction;
