import React from 'react';
import TitleHeader from '@/app/components/TitleHeader';
import StickyButton from '@/app/components/StickyButton';
import LessonNumber from '@/app/components/LessonNumber';
import QuoteHighlight from '@/app/components/QuoteHighlight';
import Textbox from '@/app/components/Textbox';
import Dropdown from '@/app/components/Dropdown';


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

const parts = [
  {
    title: 'Lesson 1: Where Does Plastic Come From?',
    content: [
      [
      "We’ll follow a plastic water bottle back in time to find out how plastic is made. Most people know that plastic is a synthetic material, meaning that it is man-made rather than naturally occurring in the world.", 
      "But do you know what the main ‘ingredient’ in plastics is? You may be surprised to learn that the substance you pump into your car at a gas station is the core component used in plastic production. That’s right:", 
      "vast swathes of plastic are made from fossil fuels like crude oil and natural gas. But how does a thick liquid like crude oil or, perhaps more surprisingly, gas become the pliant material we all know? Continue on to Lesson 1 to find out!",
      "Once we understand how plastic is made, we can take a closer look into the various types of plastic and how they are used all around us."
      ],
    ],
  },
  {
    title: 'Lesson 2: Resin Identification Codes',
    content: [
      ["Content"]
    ],
  },
  {
    title: 'Lesson 3: Plastic Pollution',
    content: [
      ["Content"]
    ],
  },
  {
    title: 'Lesson 4: Recycling Responsibility',
    content: [
      ["<title>Title</title"]
      ["Content"]
    ],
  },
];


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
      <Textbox content={content1} />
      <img src="/lessons/2.png"/>
      <Dropdown parts={parts} />
      <Textbox content={content2} />
      <StickyButton />
    </div>
  );
}

export default Course1Introduction;
