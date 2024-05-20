'use client';

import React from 'react';
import TitleHeader from '@/app/components/TitleHeader';
import StickyButton from '@/app/components/StickyButton';
import LessonNumber from '@/app/components/LessonNumber';
import QuoteHighlight from '@/app/components/QuoteHighlight';
import Textbox from '@/app/components/Textbox';
import styles from '../../page.module.css';

const content1 = [
  ['Typically, this brings to mind practices like always carrying reusable bags when shopping and avoiding single-use plastics as much as possible. However, with a little thought and planning, there are infinite ways that we can reuse plastic materials.'],
  ['There are many ways that individuals can reuse plastic within the home, ranging from turning plastic bottles into hanging planters to using plastic in arts and crafts projects. For each of these examples, reusing plastic requires little more than simple tools like scissors and the desire to find a new use for that plastic bottle or milk jug. And while these are fantastic ways to reduce the amount of consumer plastic that enters landfills and ecosystems after it has fulfilled its purpose, they aren’t the only ways to reuse plastic. What would be possible with a little more knowledge and specialized machines for repurposing plastic?'],
  ['<title>That’s where the Sustainability Lab comes in!</title>'],
];

const content2 = [
  ['You might recall from <green>Course 1</green> that successfully recycled plastic is typically collected, sorted, and sent to facilities to be broken back down into small, workable pellets. Recycling facilities have machinery that can process huge volumes of recycled plastic into a large amount of pellets, but the mechanical process of breaking down plastic is not actually that complicated. What if we could make these mechanical processes reproducible by individuals, businesses, and organizations within their own workshops?'],
  ['<title>Precious Plastic & Global Green Partnership</title>'],
  ['Thanks to innovators in the field like Precious Plastic and Global Green, this has become a reality. By partnering with Precious Plastic, which has the necessary expertise to build and install machines like shredders, extruders, and injectors, Global Green’s Sustainability Lab model enables the knowledgeable plasticsmith to break down plastic and mold it into a variety of new forms.'],
  ['The possibilities for how to use these machines and repurpose plastic are vast, and there is a growing community of plasticsmiths experimenting and sharing their expertise. In the next lesson, we’ll look more closely at how this works, but in the meantime why not check out <green>some of the exciting ways</green> that others have already begun leveraging these technologies for some inspiration?'],
];

function Course2Lesson1({ handleNext }) {
  return (
    <div className={styles['lesson-container']}>
      <LessonNumber lessonText="Lesson 1" />
      <TitleHeader title="Bringing Recycle to the People" type="main" />
      <QuoteHighlight quoteText="Most people know that reusing plastic is one of the key ways that we as individuals can reduce our ‘plastic footprint.’" />
      <Textbox content={content1} />
      <img src="/lessons/13.jpg" />
      <Textbox content={content2} />
      <StickyButton text="Go to quiz" callback={handleNext} />
    </div>
  );
}

export default Course2Lesson1;
