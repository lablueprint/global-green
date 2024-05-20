'use client';

import React from 'react';
import TitleHeader from '@/app/components/TitleHeader';
import StickyButton from '@/app/components/StickyButton';
import LessonNumber from '@/app/components/LessonNumber';
import QuoteHighlight from '@/app/components/QuoteHighlight';
import Textbox from '@/app/components/Textbox';
import Dropdown from '@/app/components/Dropdown';
import styles from '../../page.module.css';

const content1 = [
  [
    'It is versatile—it can be light yet durable or soft and malleable—and there is virtually no industry in the world that doesn’t have some application for plastic.',
    ' Chances are that you can see multiple pieces of one plastic or another in your immediate surroundings.',
  ],
  [
    'Given its ubiquity, it can be easy to take such an abundance of plastic for granted.',
    'But what exactly is plastic, where does it come from, and how has it managed to so radically transform the world we live in since it was first created in the early 20th century?',
  ],
  [
    'If you find yourself asking questions like these, you’re in the right place! ',
    'Over the span of this <green>Plastics and Recycling course</green>, we’re going to take a deep dive into a variety of topics relating to the history, manufacture, applications, and hazards of plastic in our world today.',
  ],
  [
    'By the end of this course, you’ll have the tools you need to understand the origins, benefits, and hazards of the modern world’s reliance on plastic.',
  ],
];

const content2 = [
  [
    'The goal of this course is to help educate you so that you can make informed, thoughtful choices on a day to day basis while equipping you with the knowledge you need to understand and change the world around you.',
    ' Because, like plastic, laws and regulations are malleable.',
    ' <green>Collectively, we can take direct action to combat the hazardous and toxic effects of plastic production and pollution!</green>',
  ],
];

const parts = [
  {
    title: 'Lesson 1: Where Does Plastic Come From?',
    content: [
      [
        'We’ll follow a plastic water bottle back in time to find out how plastic is made. Most people know that plastic is a synthetic material, meaning that it is man-made rather than naturally occurring in the world.',
        'But do you know what the main ‘ingredient’ in plastics is? You may be surprised to learn that the substance you pump into your car at a gas station is the core component used in plastic production. That’s right:',
        'vast swathes of plastic are made from fossil fuels like crude oil and natural gas. But how does a thick liquid like crude oil or, perhaps more surprisingly, gas become the pliant material we all know? Continue on to Lesson 1 to find out!',
        'Once we understand how plastic is made, we can take a closer look into the various types of plastic and how they are used all around us.',
      ],
    ],
  },
  {
    title: 'Lesson 2: Resin Identification Codes',
    content: [
      ['We will learn about the different types of consumer-grade plastics and their applications by inspecting the familiar but somewhat cryptic numbers imprinted on most consumer plastics. Understanding these Resin Identification Codes is key to making sense of plastic recycling laws and regulations in the U.S., which will be a key topic of Lesson 5: Recycling Responsibly. In this lesson, we’ll get you up to speed on what you need to know to ensure the best outcome when we make the conscious effort to recycle.'],
    ],
  },
  {
    title: 'Lesson 3: Plastic Pollution',
    content: [
      ['But why is recycling so important? Why not just throw plastic in the trash like everything else? How does plastic waste affect ecosystems and natural environments? We’ll delve into the answers for these questions in Lesson 3: Plastic Pollution. In this lesson, we’ll seek to understand how plastic’s famous durability can wreak havoc on the natural environment, the pressing issue of plastic pollution in our oceans, and similar topics. A thorough understanding of the causes and effects of plastic pollution will equip us with the necessary information to make more sustainable, eco-friendly decisions on the individual and societal levels.'],
    ],
  },
  {
    title: 'Lesson 4: Recycling Responsibility',
    content: [
      ['Lastly, in Lesson 4: Recycling Responsibility, we’ll explore alternatives to plastic, how we can reduce our plastic consumption, and innovative solutions to the growing threat of plastic pollution in our natural environment. This will bring us full-circle and help us look towards a cleaner future free of single-use plastics littering our landscapes.'],
    ],
  },
];

function Course1Introduction({ handleNext }) {
  return (
    <div className={styles['lesson-container']}>
      <LessonNumber lessonText="Introduction" />
      <TitleHeader title="Introduction to the Plastics and Recycling Course" type="main" />
      <img src="/lessons/1.png" />
      <QuoteHighlight quoteText="Plastic is all around us. It's in our kitchens, shoes, entertainment systems, vehicles, and even our clothing." />
      <Textbox content={content1} />
      <img src="/lessons/2.png" />
      <Dropdown parts={parts} />
      <Textbox content={content2} />
      <StickyButton text="Next" callback={handleNext} />
    </div>
  );
}

export default Course1Introduction;
